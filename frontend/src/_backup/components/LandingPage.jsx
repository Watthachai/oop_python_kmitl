import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";


const LandingPage = () => {
        return (
            <>
            <header className="showcase">
                <div class="button-container">
                <Link to="/login">
                    <button type="submit">Sign In</button>
                </Link>
                </div>
                <div className="logo">
                <img srcSet="./Style/Fakeflix.png"/>
                </div>
                <div className="showcase-contents">
                <div className="formms">
                    <form>
                    <b style={{ fontSize: 86 }}>
                        Unlimited movies, TV <br />
                        shows, and more
                    </b>
                    <p style={{ color: "white", fontSize: 30 }}>
                        Watch anywhere. Cancel anytime.
                    </p>
                    <p style={{ color: "white", fontSize: 22, marginTop: 15 }}>
                        Ready to watch? Enter your email to create or restart your
                        membership.
                    </p>
                    <div className="info">
                        <input
                        type="email"
                        className="email"
                        placeholder="Email address"
                        />
                        <div className="btn">
                        <Link style={{width: 20, height: 50}} to="/register" className="btn-primary">
                            Get Start &gt;
                        </Link>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </header>
            </>
        );
};

export default LandingPage;
