import React, { useEffect, useState} from "react";

const EpisodesModal = ({ active, handleModal, handleEpisodeModal, episode_id, setErrorMessage }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video_url, setVideoUrl] = useState("");
    const [thumbnail_url, setThumbnailUrl] = useState("");
    const [release_date, setReleaseDate] = useState("");
    const [season_id, setSeasonId] = useState("");

    useEffect(() => {
        const getEpisodes = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(`/api/episodes/${episode_id}`, requestOptions);

            if (!response.ok) {
                setErrorMessage("Could not get the episodes");
            } else {
                const data = await response.json();
                setTitle(data.title);
                setDescription(data.description);
                setVideoUrl(data.video_url);
                setThumbnailUrl(data.thumbnail_url);
                setReleaseDate(data.release_date);
                setSeasonId(data.season_id);
            }
        }
    
        if (episode_id) {
            getEpisodes();
        }
    }, [episode_id]);

    const cleanFormData = () => {
        setTitle("");
        setDescription("");
        setVideoUrl("");
        setThumbnailUrl("");
        setReleaseDate("");
        setSeasonId("");
    }

    const handleCreateEpisodes = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: description,
                video_url: video_url,
                thumbnail_url: thumbnail_url,
                season_id: season_id,
            }),
        };
        const response = await fetch("/api/episodes", requestOptions);
        if (!response.ok) {
            setErrorMessage("Could not create the episodes");
        } else {
            cleanFormData();
            handleModal(e);
        }
    }

    const handleUpdateEpisodes = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: description,
                video_url: video_url,
                thumbnail_url: thumbnail_url,
                release_date: release_date,
                season_id: season_id,
            }),
        };
        const response = await fetch(`/api/episodes/${episode_id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Could not update the episodes");
        } else {
            const data = await response.json();
            setTitle(data.title);
            setDescription(data.description);
            setVideoUrl(data.video_url);
            setThumbnailUrl(data.thumbnail_url);
            setReleaseDate(data.release_date);
            setSeasonId(data.season_id);

            cleanFormData();
            handleModal();
        }
    }

    return (
        <div className={`modal ${active ? "is-active" : ""}`}>
            <div className="modal-background" onClick={handleEpisodeModal}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">
                        <button className="delete" aria-label="close" onClick={handleModal}></button>
                    </p>
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
                            <label className="label">Description</label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Video URL</label>
                            <div className="control">
                                <input

                                    className="input"
                                    type="text"
                                    placeholder="Video URL"
                                    value={video_url}
                                    
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Thumbnail URL</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Thumbnail URL"
                                    value={thumbnail_url}
                                    onChange={(e) => setThumbnailUrl(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Season ID</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    placeholder="Season ID"
                                    value={season_id}
                                    onChange={(e) => setSeasonId(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={handleCreateEpisodes}>
                        Create
                    </button>
                    <button className="button" onClick={() => { cleanFormData(); handleModal(); }}>
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default EpisodesModal;
