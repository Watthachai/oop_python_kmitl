import React, {useEffect, useState} from "react";

const MovieGenreModal = ({active, handleModal, handleGenreMovieModal, movie_genre_id, setErrorMessage}) => {
    const [genre_id , setGenreId] = useState("");
    const [movie_id, setMovieId] = useState("");

    useEffect(() => {
        const getMovieGenres = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(`/api/moviegenres/${movie_genre_id}`, requestOptions);

            if (!response.ok){
                setErrorMessage("Could not get movie genre");
            }
            else {
                const data = await response.json();
                setGenreId(data.genre_id);
                setMovieId(data.movie_id);
            }
        };
        if (movie_genre_id){
            getMovieGenres();
        }
    }, [movie_genre_id]);

    const cleanFormData = () => {
        setGenreId("");
        setMovieId("");
    }

    const handleCreateMovieGenres = async (e) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                genre_id: genre_id,
                movie_id: movie_id,
            }),
        };
        const response = await fetch("/api/moviegenres", requestOptions);
        if (!response.ok){
            setErrorMessage("Could not create the movie genre");
        } else {
            cleanFormData();
            handleModal();
        }
    };

    const handleUpdateMovieGenres = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                genre_id: genre_id,
                movie_id: movie_id,
            }),
        };

        const response = await fetch(`/api/moviegenres/${movie_genre_id}`, requestOptions);
        if (!response.ok){
            setErrorMessage("Could not update the movie genre");
        } else {
            cleanFormData();
            handleModal();
        }
    }

    return (
        <div className={`modal ${active ? "is-active" : ""}`}>
            <div className="modal-background" onClick={handleGenreMovieModal}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Movie Genre</p>
                    <button className="delete" aria-label="close" onClick={handleModal}></button>
                </header>
                <section className="modal-card-body">
                    <form>
                        <div className="field">
                            <label className="label">Genre</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Genre" value={genre_id} onChange={(e) => setGenreId(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Movie</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Movie" value={movie_id} onChange={(e) => setMovieId(e.target.value)} />
                            </div>
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot">
                    {movie_genre_id ? (
                        <button className="button is-info" onClick={handleUpdateMovieGenres}>
                            Update
                        </button>
                    ) : (
                        <button className="button is-info" onClick={handleCreateMovieGenres}>
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

export default MovieGenreModal;