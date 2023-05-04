import React, { useState, useEffect } from "react";
import ErrorMessage from "../ErrorMessage";

const Movie = () => {
    const [movie, setMovie] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getMovies();
    }, []);
    
    const getMovies = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch("/api/movies", requestOptions);
        if (!response.ok) {
             setErrorMessage("อ๊ะ!! มีบางอย่างผิดพลาด ไม่สามารถโหลดตารางได้");
            
        } else {
            const data = await response.json();
            setMovie(data);
            setLoaded(true);
        }
    };

    return (
        <>  
            <ErrorMessage message={errorMessage} />
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>title</th>
                        <th>release_date</th>
                        <th>duration</th>
                        <th>rating</th>
                        <th>description</th>
                        <th>cover_image</th>
                        <th>video_url</th>
                    </tr>
                </thead>
                <tbody>
                    {loaded && movie.map((movie) => (
                        <tr key={movie.movie_id}>
                            <td>{movie.title}</td>
                            <td>{movie.release_date}</td>
                            <td>{movie.duration}</td>
                            <td>{movie.rating}</td>
                            <td>{movie.description}</td>
                            <td><img src={movie.cover_image} alt={movie.title}/></td>
                            <td>{movie.video_url}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Movie;