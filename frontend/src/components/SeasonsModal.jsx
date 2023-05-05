import React, { useEffect, useState } from "react";

const SeasonsModal = ({ active, handleModal, handleSeasonModal, season_id, setErrorMessage }) => {
    const [title, setTitle] = useState("");
    const [release_date, setRelease_date] = useState("");
    const [series_id, setSeriesId] = useState("");

    useEffect(() => {
        const getSeason = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(`/api/seasons/${season_id}`, requestOptions);

            if (!response.ok) {
                setErrorMessage("Could not get the season");
            } else {
                const data = await response.json();
                setTitle(data.title);
                setRelease_date(data.release_date);
                setSeriesId(data.series_id);
            }
        };

        if (season_id) {
            getSeason();
        }
    }, [season_id]);

    const cleanFormData = () => {
        setTitle("");
        setSeriesId("");
    };

    const handleCreateSeason = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                series_id: series_id,
            }),
        };
        const response = await fetch("/api/seasons", requestOptions);
        if (!response.ok) {
            setErrorMessage("Could not create the season");
        } else {
            cleanFormData();
            handleModal();
        }
    };

    const handleUpdateSeason = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                release_date: release_date,
                series_id: series_id,
            }),
        };
        const response = await fetch(`/api/seasons/${season_id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Could not update the season");
        } else {
            const data = await response.json();
            setTitle(data.title);
            setRelease_date(data.release_date);
            setSeriesId(data.series_id);
            handleModal();
        }
    }


    return (
        <div className={`modal ${active ? "is-active" : ""}`}>
            <div className="modal-background" onClick={handleSeasonModal}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Season</p>
                    <button className="delete" aria-label="close" onClick={handleModal}></button>
                </header>
                <section className="modal-card-body">
                    <form>
                        <div className="field">
                            <label className="label">Title</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Series Number</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="SeriesID"
                                    value={series_id}
                                    onChange={(e) => setSeriesId(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot has-background-primary-light">
                    {season_id ? (
                        <button className="button is-info" onClick={handleUpdateSeason}>
                        Update
                        </button>
                    ) : (
                        <button className="button is-primary" onClick={handleCreateSeason}>
                        Create
                        </button>
                    )}
                    <button className="button" onClick={() => { cleanFormData(); handleModal(); }}>
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default SeasonsModal;
