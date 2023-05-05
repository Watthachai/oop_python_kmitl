import React, { useEffect, useState } from "react";
import moment from "moment";

import ErrorMessage from "./ErrorMessage";
import SeriesModal from "./SeriesModal";
import SeasonsModal from "./SeasonsModal";
import MoviesModal from "./MoviesModal";
import MovieGenreModal from "./MovieGenreModal";


import { UserContext } from "../context/UserContext";
import EpisodesModal from "./EpisodesModal";
import GenreModal from "./GenreModal";

const Table = () => {
    //const [token] = UserContext(UserContext);
    const [series, setSeries] = useState(null);


    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [activeModal, setActiveModal] = useState("");
    const [series_id, setSeriesId] = useState(null);

    const handleCreate = () => {
        
        setSeriesId(null);
        setActiveModal(true);
        
    };

    const handleUpdate = async (series_id) => {
        setSeriesId(series_id);
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
    
    const handleModal = () => {
        setActiveModal(!activeModal);
        getSeries();
    };

    //! SEASON SECTION!!!!
    const [seasons, setSeasons] = useState(null);
    const [season_id, setSeasonId] = useState(null);
    const [loadedSeason, setLoadedSeason] = useState(false);
    const [activeModalSeason, setActiveModalSeason] = useState(false);

    const seasonHandleCreate = () => {
        setSeasonId(null);
        setActiveModalSeason(true);
    };

    const seasonHandleUpdate = async (season_id) => {
        setSeasonId(season_id);
        setActiveModalSeason(true);
    };

    const seasonHandleDelete = async (season_id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(`/api/seasons/${season_id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Failed to delete season");
        }

        getSeasons();
    };

    const getSeasons = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch("/api/seasons", requestOptions);
        if (!response.ok) {
            setErrorMessage("Something went wrong. Couldn't load the seasons");
        } else {
            const data = await response.json();
            setSeasons(data);
            setLoadedSeason(true);
        }
    };

    const handleModalSeason = () => {
        setActiveModalSeason(!activeModalSeason);
        getSeasons();
    };

    
    //? EPISODE SECTION!!!!
    const [episodes, setEpisodes] = useState(null);
    const [episode_id, setEpisodeId] = useState(null);
    const [loadedEpisode, setLoadedEpisode] = useState(false);
    const [activeModalEpisode, setActiveModalEpisode] = useState(false);

    const episodeHandleCreate = () => {
        setEpisodeId(null);
        setActiveModalEpisode(true);
    };

    const episodeHandleUpdate = async (episode_id) => {
        setEpisodeId(episode_id);
        setActiveModalEpisode(true);
    };

    const episodeHandleDelete = async (episode_id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(`/api/episodes/${episode_id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Failed to delete episode");
        }

        getEpisodes();
    };

    const getEpisodes = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch("/api/episodes", requestOptions);
        if (!response.ok) {
            setErrorMessage("Something went wrong. Couldn't load the episodes");
        } else {
            const data = await response.json();
            setEpisodes(data);
            setLoadedEpisode(true);
        }
    };

    const handleEpisodeModal = () => {
        setActiveModalEpisode(!activeModalEpisode);
        getEpisodes();
    };

    
    //* MOVIE SECTION!!!!
    const [movies, setMovies] = useState(null);
    const [movie_id, setMovieId] = useState(null);
    const [loadedMovie, setLoadedMovie] = useState(false);
    const [activeModalMovie, setActiveModalMovie] = useState(false);

    const movieHandleCreate = () => {
        setMovieId(null);
        setActiveModalMovie(true);
    };

    const movieHandleUpdate = async (movie_id) => {
        setMovieId(movie_id);
        setActiveModalMovie(true);
    };

    const movieHandleDelete = async (movie_id) => {
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
            setErrorMessage("Something went wrong. Couldn't load the movies");
        } else {
            const data = await response.json();
            setMovies(data);
            setLoadedMovie(true);
        }
    };

    const handleModalMovie = () => {
        setActiveModalMovie(!activeModalMovie);
        getMovies();
    };



    //!GENRE SECTION!!!!
    const [genres, setGenres] = useState(null);
    const [genre_id, setGenreId] = useState(null);
    const [loadedGenre, setLoadedGenre] = useState(false);
    const [activeModalGenre, setActiveModalGenre] = useState(false);

    const genreHandleCreate = () => {
        setGenreId(null);
        setActiveModalGenre(true);
    };


    const genreHandleUpdate = async (genre_id) => {
        setGenreId(genre_id);
        setActiveModalGenre(true);
    };

    const genreHandleDelete = async (genre_id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(`/api/genres/${genre_id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Failed to delete genre");
        }

        getGenre();
    };

    const getGenre = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch("/api/genres", requestOptions);
        if (!response.ok) {
            setErrorMessage("Something went wrong. Couldn't load the genres");
        } else {
            const data = await response.json();
            setGenres(data);
            setLoadedGenre(true);
        }
    };

    const handleModalGenre = () => {
        setActiveModalGenre(!activeModalGenre);
        getGenre();
    };


    //!MovieGenre SECTION!!!!
    const [movieGenres, setMovieGenres] = useState(null);
    const [movieGenre_id, setMovieGenreId] = useState(null);
    const [loadedMovieGenre, setLoadedMovieGenre] = useState(false);
    const [activeModalMovieGenre, setActiveModalMovieGenre] = useState(false);

    const movieGenreHandleCreate = () => {
        setMovieGenreId(null);
        setActiveModalMovieGenre(true);
    };


    const movieGenreHandleUpdate = async (movieGenre_id) => {
        setMovieGenreId(movieGenre_id);
        setActiveModalMovieGenre(true);

    };

    
    const movieGenreHandleDelete = async (movieGenre_id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        
        const response = await fetch(`/api/moviegenres/${movieGenre_id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Failed to delete movieGenre");
        }
        
        getMovieGenre();
    };

    const getMovieGenre = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch("/api/moviegenres", requestOptions);
        if (!response.ok) {

            setErrorMessage("Something went wrong. Couldn't load the movieGenres");
        } else {
            const data = await response.json();
            setMovieGenres(data);
            setLoadedMovieGenre(true);
        }
    };

    const handleModalMovieGenre = () => {
        setActiveModalMovieGenre(!activeModalMovieGenre);
        getMovieGenre();
    };


    useEffect(() => {
        getSeries();
        getSeasons();
        getEpisodes();
        getMovies();
        getGenre();
        getMovieGenre();

    }, []);



    return (
        <>
            <SeriesModal
                active={activeModal}
                handleModal={handleModal}
                series_id={series_id}
                setErrorMessage={setErrorMessage}
            />

                        
            <SeasonsModal
                active={activeModalSeason}
                handleModal={handleModalSeason}
                season_id={season_id}
                setErrorMessage={setErrorMessage}
            />

            <EpisodesModal
                active={activeModalEpisode}
                handleModal={handleEpisodeModal}
                episode_id={episode_id}
                setErrorMessage={setErrorMessage}
            />

            <MoviesModal
                active={activeModalMovie}
                handleModal={handleModalMovie}
                movie_id={movie_id}
                setErrorMessage={setErrorMessage}
            />

            <GenreModal
                active={activeModalGenre}
                handleModal={handleModalGenre}
                genre_id={genre_id}
                setErrorMessage={setErrorMessage}
            />

            <MovieGenreModal
                active={activeModalMovieGenre}
                handleModal={handleModalMovieGenre}
                movieGenre_id={movieGenre_id}
                setErrorMessage={setErrorMessage}
            />

            <div className="columns is-mobile is-centered">
            <div className="column">
                <p className="bd-notification is-primary">
                    <h1 style={{paddingLeft:20, fontWeight:"bolder", fontSize:40}}>Series Table</h1>
                </p>
            </div>
            </div>
            
            <button 
                className="button is-fullwidth is-success is-focused"
                
                onClick={() => handleCreate()}
            >
                Create Series
            </button>
            <ErrorMessage message={errorMessage} />
            {loaded && series ? (
                <table className="table is-fullwidth is-hoverable">
                    <thead>
                        <tr>
                            <th>Series Number</th>
                            <th>Title</th>
                            <th>Descripton</th>
                            <th>Release Date</th>
                            <th>Image Cover</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {series.map((series) => (
                            <tr key={series.series_id}>
                                <td>{series.series_id}</td>
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

            //! SEASON SECTION!!!!!

            <div className="columns is-mobile is-centered">
            <div className="column">
                <p className="bd-notification is-primary">
                    <h1 style={{paddingLeft:20, fontWeight:"bolder", fontSize:40}}>Season Table</h1>
                </p>
            </div>
            </div>

            <button
                className="button is-fullwidth is-success is-focused"

                onClick={() => seasonHandleCreate()}
            >

                Create Season
            </button>
            <ErrorMessage message={errorMessage} />
            {loadedSeason && seasons ? (
                <table className="table is-fullwidth is-hoverable">
                    <thead>
                        <tr><th>SeasonID</th>
                            <th>Season Name</th>
                            <th>Release Date</th>
                            <th>Series Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seasons.map((seasons) => (
                            <tr key={seasons.season_id}>
                                <td>{seasons.season_id}</td>
                                <td>{seasons.title}</td>
                                <td>{seasons.release_date}</td>
                                <td>{seasons.series_id}</td>
                                <td>
                                    <button
                                        className="button is-primary is-small mr-2"
                                        onClick={() => seasonHandleUpdate(seasons.season_id)}
                                        >
                                        Update
                                    </button>
                                    <button
                                        className="button is-danger is-small"
                                        onClick={() => seasonHandleDelete(seasons.season_id)}
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



            //? EPISODE SECTION!!!!!
            
            <div className="columns is-mobile is-centered">
            <div className="column">
                <p className="bd-notification is-primary">
                    <h1 style={{paddingLeft:20, fontWeight:"bolder", fontSize:40}}>Episode Table</h1>
                </p>
            </div>
            </div>

            <button
                className="button is-fullwidth is-success is-focused"

                onClick={() => episodeHandleCreate()}
            >

                Create Episode
            </button>
            <ErrorMessage message={errorMessage} />
            {loadedEpisode && episodes ? (
                <table className="table is-fullwidth is-hoverable">
                    <thead>
                        <tr><th>EpisodeID</th>
                            <th>Episode Name</th>
                            <th>Description</th>
                            <th>Release Date</th>
                            <th>Thumnail URL</th>
                            <th>Season Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {episodes.map((episodes) => (
                            <tr key={episodes.episode_id}>
                                <td>{episodes.episode_id}</td>
                                <td>{episodes.title}</td>
                                <td>{episodes.description}</td>
                                <td>{episodes.release_date}</td>
                                <td>{episodes.thumbnail_url}</td>

                                <td>{episodes.season_id}</td>
                                <td>
                                    <button
                                        className="button is-primary is-small mr-2"
                                        onClick={() => episodeHandleUpdate(episodes.episode_id)}
                                        >
                                        Update
                                    </button>
                                    <button
                                        className="button is-danger is-small"
                                        onClick={() => episodeHandleDelete(episodes.episode_id)}
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

        //!* MOVIES SECTION!!!!!
        
        <div className="columns is-mobile is-centered">
            <div className="column">
                <p className="bd-notification is-primary">
                    <h1 style={{paddingLeft:20, fontWeight:"bolder", fontSize:40}}>Movie Table</h1>
                </p>
            </div>
            </div>

            <button
                className="button is-fullwidth is-success is-focused"
                
                onClick={() => movieHandleCreate()}
            >
                Create Movie
            </button>
            <ErrorMessage message={errorMessage} />
            {loadedMovie && movies ? (
                <table className="table is-fullwidth is-hoverable">
                    <thead>
                        <tr><th>MovieID</th>
                            <th>Movie Name</th>
                            <th>Duration</th>
                            <th>Plote</th>
                            <th>Date Release</th>
                            <th>Rating</th>
                            <th>Thumbnils</th>
                            <th>Video URL</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movies) => (
                            <tr key={movies.movie_id}>
                                <td>{movies.movie_id}</td>
                                <td>{movies.title}</td>
                                <td>{movies.duration}</td>
                                <td>{movies.description}</td>
                                <td>({moment(movies.release_date).format("ll")})</td>
                                <td>{movies.rating}</td>
                                <td><img src={movies.cover_image}/></td>
                                <td>{movies.video_url}</td>
                            <td>
                                <button
                                    className="button is-primary is-small mr-2"
                                    onClick={() => movieHandleUpdate(movies.movie_id)}
                                >
                                    Update
                                </button>
                                <button
                                    className="button is-danger is-small"
                                    onClick={() => movieHandleDelete(movies.movie_id)}
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

        //!! GENRE SECTION
        
        <div className="columns is-mobile is-centered">
            <div className="column">
                <p className="bd-notification is-primary">
                    <h1 style={{paddingLeft:20, fontWeight:"bolder", fontSize:40}}>Genre Table</h1>
                </p>
            </div>
            </div>

            <button
                className="button is-fullwidth is-success is-focused"
                onClick={() => genreHandleCreate()}
            >
                Create Genre
            </button>
            <ErrorMessage message={errorMessage} />
            {loadedGenre && genres ? (
                <table className="table is-fullwidth is-hoverable">
                    <thead>
                        <tr><th>GenreID</th>
                            <th>Genre Name</th>
                            <th>Action</th>
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
                                        onClick={() => genreHandleUpdate(genres.genre_id)}
                                        >
                                        Update
                                    </button>
                                    <button
                                        className="button is-danger is-small"
                                        onClick={() => genreHandleDelete(genres.genre_id)}
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

            //? MOVIE GENRE SECTION!!!!!

            <div className="columns is-mobile is-centered">
            <div className="column">
                <p className="bd-notification is-primary">
                    <h1 style={{paddingLeft:20, fontWeight:"bolder", fontSize:40}}>Movie Genre Table</h1>
                </p>
            </div>
            </div>

            <button
                className="button is-fullwidth is-success is-focused"
                onClick={() => movieGenreHandleCreate()}
            >
                Create Movie Genre
            </button>
            <ErrorMessage message={errorMessage} />
            {loadedMovieGenre && movieGenres ? (
                <table className="table is-fullwidth is-hoverable">
                    <thead>
                        <tr><th>MovieGenreID</th>
                            <th>Movie ID</th>
                            <th>Genre ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movieGenres.map((movieGenres) => (
                            <tr key={movieGenres.movie_genre_id}>
                                <td>{movieGenres.movie_genre_id}</td>
                                <td>{movieGenres.movie_id}</td>
                                <td>{movieGenres.genre_id}</td>
                                <td>
                                    <button
                                        className="button is-primary is-small mr-2"
                                        onClick={() => movieGenreHandleUpdate(movieGenres.movie_genre_id)}
                                        >
                                        Update
                                    </button>
                                    <button
                                        className="button is-danger is-small"
                                        onClick={() => movieGenreHandleDelete(movieGenres.movie_genre_id)}
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