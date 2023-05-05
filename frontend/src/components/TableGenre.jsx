import React, { useEffect, useState } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";
import GenreModal from "./GenreModal";

const TableGenres = () => {
    const [genres, setGenre] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [activeModal, setActiveModal] = useState("");
    const [genre_id, setGenreId] = useState(null);

    const handleCreateGenres = () => {
        setGenre(null);
        setActiveModal(true);
    };
    const handleUpdateGenres = async (genre_id) => {
        setGenreId(genre_id);
        setActiveModal(true);
    };

    const handleDeleteGenre = async (genre_id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(`/api/genres/${genre_id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Failed to delete the Genre");
        }
        getGenres();
    };

    const getGenres = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch("/api/genres", requestOptions);
        if (!response.ok){
            setErrorMessage("Something went wrong. Couldn't load the genre");
        } else {
            const data = await response.json();
            setGenre(data);
            setLoaded(true);
        }
    };
    useEffect(() => {
        getGenres();
    }, []);

    const handleModal = () => {
        setActiveModal(!activeModal);
        getGenres();
        setGenreId(null);
    };

    return (
        <>
        <GenreModal
        active={activeModal}
        handleModal={handleModal}
        genre_id={genre_id}
        setErrorMessage={setErrorMessage}
        />

<div className="columns is-mobile is-centered">
            <div className="column">
                <p className="bd-notification is-primary">
                    <h1 style={{paddingLeft:20, fontWeight:"bolder", fontSize:40}}>Genre Table</h1>
                </p>
            </div>
            </div>
            
            <button 
                className="button is-fullwidth is-success is-focused"
                
                onClick={() => handleCreateGenres()}
            >
                Create Genres
            </button>
            <ErrorMessage message={errorMessage} />
            {loaded && genres ? (
                <table className="table is-fullwidth is-hoverable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genres.map((genres) => (
                            <tr key={genres.genre_id}>
                                <td>{genres.genre_id}</td>
                                <td>{genres.genre_name}</td>
                                <td>
                                    <button
                                        className="button is-primary is-small mr-2"
                                        onClick={() => handleUpdateGenres(genres.genre_id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="button is-danger is-small"
                                        onClick={() => handleDeleteGenre(genres.genre_id)}
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
export default TableGenres;