import React, { useState, useEffect, useContext } from "react";
import ErrorMessage from "../_backup/components/ErrorMessage";
import moment from "moment";
import { UserContext } from "../context/UserContext";

const Movie = () => {
    const [token, setToken] = useContext(UserContext);
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

    const handleLogout = () => {
        setToken(null);
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
                        {token && (
                            <button className="button" onClick={handleLogout}>
                            Logout
                            </button>
                        )}        
                    </nav>      
                    </header>
                    {/* <!-- END OF HEADER --> */}

                    {/* <!-- MAIN CONTAINER --> */}
                    <section className="main-container" >
                        <div className="location" id="home">
                            <h1 id="home">Popular on Netflix</h1>
                            <div className="box">
                            {loaded && movie.map((movie) => (
                                <a href="#modal-opened" className="link-1" id="modal-closed"><img src={movie.cover_image} alt=""/></a>
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

                                                {/* MODAL  */}
                        <div className="container" id="modal-opened">
                        <div className="modal">
                            <div className="modal-header">
                            <video autoplay loop poster="https://www.themoviedb.org/t/p/original/fOy6SL5Zs2PFcNXwqEPIDPrLB1q.jpg">
                                <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/1/10/Tears_of_Steel_in_4k_-_Official_Blender_Foundation_release.webm/Tears_of_Steel_in_4k_-_Official_Blender_Foundation_release.webm.2160p.vp9.webm" />
                            </video>
                            <a href="#modal-closed" style={{textDecoration: "none"}}>
                                <button type="button" className="close">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="close" tabindex="0">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z" fill="currentColor"></path>
                                    </svg>
                                </button>
                            </a>

                            <div className="header-content">
                                <div className="header-title">
                                <img src="https://i.ibb.co/VMvmMgP/xconvert-com.png" alt="Tears Of Steel" />

                                <div className="header-buttons">
                                    <button type="button" className="play">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path>
                                    </svg>
                                    Play
                                    </button>

                                    <button type="button" className="add">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 2V11H2V13H11V22H13V13H22V11H13V2H11Z" fill="currentColor"></path>
                                    </svg>
                                    </button>
                                    <button type="button" className="rate">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z" fill="currentColor"></path>
                                    </svg>
                                    </button>
                                    <button type="button" className="volume">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 8.28699 22.525 4.72603 19.8995 2.10052L18.4853 3.51474C20.7357 5.76517 22 8.81742 22 12C22 15.1826 20.7357 18.2349 18.4853 20.4853L19.8995 21.8995C22.525 19.274 24 15.7131 24 12ZM11 4.00001C11 3.59555 10.7564 3.23092 10.3827 3.07613C10.009 2.92135 9.57889 3.00691 9.29289 3.29291L4.58579 8.00001H1C0.447715 8.00001 0 8.44773 0 9.00001V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00001ZM5.70711 9.70712L9 6.41423V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70712ZM16.0001 12C16.0001 10.4087 15.368 8.8826 14.2428 7.75739L12.8285 9.1716C13.5787 9.92174 14.0001 10.9392 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8285L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92896C18.9462 6.80432 19.9998 9.34786 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87829 17.157 7.84346 15.6567 6.34317L17.0709 4.92896Z" fill="currentColor"></path>
                                    </svg>
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>

                            <div className="modal-body">
                            <div className="modal-content-first">
                                <div className="modal-description">
                                <div className="description-match">
                                    <span>54% Match</span>
                                </div>
                                <span>2012</span>
                                <svg viewBox="0 0 100 100">
                                    <path id="Fill-41" fill="#D7262D" d="M92.06 0H7.594A7.592 7.592 0 000 7.592V92.06a7.594 7.594 0 007.594 7.594H92.06c4.199 0 7.594-3.4 7.594-7.594V7.592A7.59 7.59 0 0092.06 0">
                                    </path>
                                    <path id="Shape" fill="#FFFEFD" d="M30.596 27.01h7.828v46.465h-8.929V38.928a14.121 14.121 0 01-2.52 2.085A14.722 14.722 0 0124 42.477v-8.335c1.595-.913 2.947-1.965 4.058-3.16a12.723 12.723 0 002.538-3.972zm35.248 28.73c0-2.36-.162-3.894-.482-4.603-.32-.708-.904-1.062-1.745-1.062-.844 0-1.428.403-1.76 1.208-.333.804-.502 2.29-.502 4.457v6.373c0 2.36.161 3.895.484 4.602.32.708.914 1.062 1.778 1.062.82 0 1.397-.385 1.73-1.158.332-.772.497-2.274.497-4.506V55.74zm9.605-18.475v.483h-9.605v-.483c0-2.36-.162-3.894-.482-4.602-.32-.708-.904-1.063-1.745-1.063-.844 0-1.428.408-1.76 1.223-.333.817-.502 2.296-.502 4.442v9.302c.844-1.073 1.79-1.867 2.843-2.382 1.054-.516 2.266-.773 3.641-.773 2.659 0 4.602.821 5.833 2.462 1.23 1.642 1.843 4.265 1.843 7.871v4.956c0 5.6-.87 9.463-2.608 11.586-1.74 2.125-4.815 3.188-9.223 3.188-4.434 0-7.517-1.057-9.258-3.17-1.74-2.115-2.608-5.983-2.608-11.604V40.71c0-5.6.868-9.452 2.608-11.555C56.167 27.052 59.25 26 63.684 26c4.453 0 7.527.8 9.223 2.397 1.694 1.6 2.542 4.556 2.542 8.868z">
                                    </path>
                                </svg>
                                <span>1h 56m</span>
                                <span className="description-badge">HD</span>
                                <svg viewBox="0 0 58.07 24">
                                    <path fill="currentColor" d="M18.34,10.7v7.62l-4.73,0ZM.5,26.6h8l2.17-3,7.49,0s0,2.08,0,3.06h5.7V2.77H17C16.3,3.79.5,26.6.5,26.6Z" transform="translate(-0.5 -2.62)"></path>
                                    <path fill="currentColor" d="M30.63,8.91c3.6-.13,6.1,1.8,6.48,4.9.5,4.15-2.43,6.85-6.66,6.56V9.19A.26.26,0,0,1,30.63,8.91ZM25,3V26.56c5.78.11,10.22.32,13.49-1.85a12.2,12.2,0,0,0,5.14-11.36A11.52,11.52,0,0,0,33.38,2.72c-2.76-.23-8.25,0-8.25,0A.66.66,0,0,0,25,3Z" transform="translate(-0.5 -2.62)"></path>
                                    <path fill="currentColor" d="M43.72,3.43c1.45-.4,1.88,1.2,2.51,2.31a18.73,18.73,0,0,1-1.42,20.6h-.92a1.86,1.86,0,0,1,.42-1.11,21.39,21.39,0,0,0,2.76-10.16A22.54,22.54,0,0,0,43.72,3.43Z" transform="translate(-0.5 -2.62)"></path>
                                    <path fill="currentColor" d="M48.66,3.43c1.43-.4,1.87,1.2,2.5,2.31a18.83,18.83,0,0,1-1.42,20.6h-.91c-.07-.42.24-.79.41-1.11A21.39,21.39,0,0,0,52,15.07,22.63,22.63,0,0,0,48.66,3.43Z" transform="translate(-0.5 -2.62)"></path>
                                    <path fill="currentColor" d="M53.57,3.43c1.46-.4,1.9,1.2,2.54,2.31a18.58,18.58,0,0,1-1.44,20.6h-.93c-.07-.42.24-.79.42-1.11A21,21,0,0,0,57,15.07,22.26,22.26,0,0,0,53.57,3.43Z" transform="translate(-0.5 -2.62)"></path>
                                </svg>
                                </div>

                                <p>The film&apos;s premise is about a group of warriors and scientists, who gathered at the “Oude Kerk” in
                                Amsterdam to stage a crucial event from the past, in a desperate attempt to rescue the world from
                                destructive robots.</p> 
                            </div>

                            <div className="modal-content-second">
                                <div className="cast">
                                <span className="title">Cast:</span>
                                <span className="sub-title">Vanja Rukavina,</span>
                                <span className="sub-title">Denise Rebergen,</span>
                                <span className="sub-title">Rogier Schippers,</span>
                                <span className="sub-title">Derek de Lint,</span>
                                <span className="sub-title">Sergio Hasselbaink,</span>
                                <span className="sub-title">more.</span>
                                </div>

                                <div className="genres">
                                <span className="title">Genres:</span>
                                <span className="sub-title">Science Fiction.</span>
                                </div>

                                <div className="show">
                                    <span className="title">This show is:</span>
                                    <span className="sub-title">Fictional war,</span>
                                    <span className="sub-title">killer robot,</span>
                                    <span className="sub-title">man vs machine.</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        {/* END OF MODAL */}

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