import React, {useContext, useEffect, useState} from "react";

import ErrorMessage from "./ErrorMessage";
import MoviesModal from "./MoviesModal";
import { UserContext } from "../context/UserContext";
import GenreModal from "./GenreModal";

const MoviesTable = () => {
    const [movies, setMovies] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [activeModal, setActiveModal] = useState("");
    const [movie_id, setMovies_id] = useState(null);

    const handleCreateMovies = () => {
        setMovies_id(null);
        setActiveModal(true);
    };

    const handleUpdateMovies = async (movie_id) => {
        setMovies_id(movie_id);
        setActiveModal(true);
    }

    const handleDeleteMovies = async (movie_id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(`/api/movies/${movie_id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Failed to delete movie");
        }
        getMovies();
    };
    const getMovies = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch("/api/movies", requestOptions);
        if (!response.ok) {
            setErrorMessage("Something went wrong. Couldn't load the movie");
        } else {
            const data = await response.json();
            setMovies(data);
            setLoaded(true);
        }
    };
    useEffect(() => {
        getMovies();
    },[]);

    const handleModal = () => {
        setActiveModal(!activeModal);
        getMovies();
        setMovies_id(null);
    };

    return (
    <>
    <MoviesModal
    active={activeModal}
    handleModal={handleModal}
    movie_id={movie_id}
    setErrorMessage={setErrorMessage}
    />
    <div className="columns is-mobile is-centered">
            <div className="column">
                <p className="bd-notification is-primary">
                    <h1 style={{paddingLeft:20, fontWeight:"bolder", fontSize:40}}>Movie Table</h1>
                </p>
            </div>
            </div>
            
            <button 
                className="button is-fullwidth is-success is-focused"
                
                onClick={() => handleCreateMovies()}
            >
                Create Series
            </button>
            <ErrorMessage message={errorMessage} />
            {loaded && movies ? (
                <table className="table is-fullwidth is-hoverable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Release Date</th>
                            <th>Duration</th>
                            <th>Rating</th>
                            <th>Descripton</th>
                            <th>Image Cover</th>
                            <th>URL</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movies) => (
                            <tr key={movies.movie_id}>
                                <td>{movies.movie_id}</td>
                                <td>{movies.title}</td>
                                <td>{movies.release_date}</td>
                                <td>{movies.duration}</td>
                                <td>{movies.rating}</td>
                                <td>{movies.description}</td>
                                <td>{movies.cover_image}</td>
                                <td>{movies.video_url}</td>
                                <td>
                                    <button
                                        className="button is-primary is-small mr-2"
                                        onClick={() => handleUpdateMovies(movies.movie_id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="button is-danger is-small"
                                        onClick={() => handleDeleteMovies(movies.movie_id)}
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

export default MoviesTable;