import React, { useContex, useEffect, useState } from "react";
import moment from "moment";

import ErrorMessage from "./ErrorMessage";
import SeriesModal from "./SeriesModal";
import { UserContext } from "../context/UserContext";

const Table = () => {
    //const [token] = UserContext(UserContext);
    const [series, setSeries] = useState(null);


    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [activeModal, setActiveModal] = useState("");
    const [series_id, setSereseries_id] = useState(null);

    const handleCreate = () => {
        setSereseries_id(null);
        setActiveModal(true);
    };

    const handleUpdate = async (series_id) => {
        setSereseries_id(series_id);
        setActiveModal(true);
    };

    const handleDelete = async (series_id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(`/api/series/${series_id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Failed to delete series");
        }

        getSeries();
    };

    const getSeries = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch("/api/series", requestOptions);
        if (!response.ok) {
            setErrorMessage("Something went wrong. Couldn't load the series");
        } else {
            const data = await response.json();
            setSeries(data);
            setLoaded(true);
        }
    };

    useEffect(() => {
        getSeries();
    }, []);

    const handleModal = () => {
        setActiveModal(!activeModal);
        getSeries();
        setSereseries_id(null);
    };

    return (
        <>
            <SeriesModal
                active={activeModal}
                handleModal={handleModal}
                series_id={series_id}
                setErrorMessage={setErrorMessage}
            />
            <button
                className="button is-fullwseries_idth mb-5 is-primary"
                
                onClick={() => handleCreate()}
            >
                Create Series
            </button>
            <ErrorMessage message={errorMessage} />
            {loaded && series ? (
                <table className="table is-fullwseries_idth is-hoverable">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Descripton</th>
                            <th>Release Date</th>
                            <th>Image Cover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {series.map((series) => (
                            <tr key={series.series_series_id}>
                                <td>{series.title}</td>
                                <td>{series.description}</td>
                                <td>{series.release_date}</td>
                                <td>{series.cover_image}</td>
                                <td>
                                    <button
                                        className="button is-primary is-small mr-2"
                                        onClick={() => handleUpdate(series.series_id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="button is-danger is-small"
                                        onClick={() => handleDelete(series.series_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default Table;