import React, { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import moment from "moment";

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
            <body>
                <div className="wrapper">
                    {/* <!-- HEADER --> */}
                    <header>
                    <div className="netflixLogo">
                        <a id="logo" href="#home"><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/logo.PNG?raw=true" alt="Logo Image"/></a>
                    </div>      
                    <nav className="main-nav">                
                        <a href="#home">Home</a>
                        <a href="#tvShows">TV Shows</a>
                        <a href="#movies">Movies</a>
                        <a href="#originals">Originals</a>
                        <a href="#">Recently Added</a>
                        <a target="_blank" href="https://codepen.io/cb2307/full/NzaOrm">Portfolio</a>        
                    </nav>
                    <nav className="sub-nav">
                        <a href="#"><i className="fas fa-search sub-nav-logo"></i></a>
                        <a href="#"><i className="fas fa-bell sub-nav-logo"></i></a>
                        <a href="#">Account</a>        
                    </nav>      
                    </header>
                    {/* <!-- END OF HEADER --> */}

                    {/* <!-- MAIN CONTAINER --> */}
                    <section className="main-container" >
                        <div className="location" id="home">
                            <h1 id="home">Popular on Netflix</h1>
                            <div className="box">
                            {loaded && movie.map((movie) => (
                                <a href="#"><img src={movie.cover_image} alt=""/></a>
                            ))}
                            </div>

                        </div>
                    

                        <h1 id="myList">Trending Now</h1>
                        <div className="box">
                            {loaded && movie.map((movie) => (
                                <a href="#"><img src={movie.cover_image} alt=""/></a>
                            ))}
                            </div>
                    
                        <h1 id="tvShows">TV Shows</h1>
                        <div className="box">
                            {loaded && movie.map((movie) => (
                                <a href="#"><img src={movie.cover_image} alt=""/></a>
                            ))}
                            </div>

                        <div className="box">
                            {loaded && movie.map((movie) => (
                                <a href="#"><img src={movie.cover_image} alt=""/></a>
                            ))}
                        </div>
                    

                        <h1 id="movies">Blockbuster Action & Adventure</h1>
                        <div className="box">
                                {loaded && movie.map((movie) => (
                                    <a href="#"><img src={movie.cover_image} alt=""/></a>
                                ))}
                        </div>

                        <h1 id="originals">Netflix Originals</h1>
                        <div className="box">
                                {loaded && movie.map((movie) => (
                                    <a href="#"><img src={movie.cover_image} alt=""/></a>
                                ))}
                        </div>
                        </section>
                        {/* <!-- END OF MAIN CONTAINER --> */}

                        {/* <!-- LINKS --> */}
                        <section className="link">
                            <div className="logos">
                                <a href="#"><i className="fab fa-facebook-square fa-2x logo"></i></a>
                                <a href="#"><i className="fab fa-instagram fa-2x logo"></i></a>
                                <a href="#"><i className="fab fa-twitter fa-2x logo"></i></a>
                                <a href="#"><i className="fab fa-youtube fa-2x logo"></i></a>
                            </div>
                            <div className="sub-links">
                                <ul>
                                <li><a href="#">Audio and Subtitles</a></li>
                                <li><a href="#">Audio Description</a></li>
                                <li><a href="#">Help Center</a></li>
                                <li><a href="#">Gift Cards</a></li>
                                <li><a href="#">Media Center</a></li>
                                <li><a href="#">Investor Relations</a></li>
                                <li><a href="#">Jobs</a></li>
                                <li><a href="#">Terms of Use</a></li>
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Legal Notices</a></li>
                                <li><a href="#">Corporate Information</a></li>
                                <li><a href="#">Contact Us</a></li>
                                </ul>
                            </div>
                        </section>

                </div>
            </body>
        </>
    );
}

export default Movie;