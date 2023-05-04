import React, { useState, useContext } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [, setToken] = useContext(UserContext);

    const submitLogin = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: JSON.stringify(`
                grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
            ),
        };
        
        const response = await fetch("/api/token", requestOptions);
        const data = await response.json();
        
        if(!response.ok) {
            setErrorMessage(data.detail);
        } else {
            setToken(data.access_token);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin();
    };

    return (
        <>
            <header class="showcase">
                    <div class="logo">
                        <img src="https://i.ibb.co/r5krrdz/logo.png"></img>
                    </div>
                    <div class="showcase-content">
                        <div class="formm">
                            <form>
                                <h1>Sign In</h1>
                                <div class="info">
                                    <input className="email" 
                                        type="email" 
                                        placeholder="Email or phone number"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <br/>
                                    <input class="email"
                                            type="password" 
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div class="btn">
                                    <button class="btn-primary" style={{width:321}} type="submit">Sign In</button>
                                </div>
                                <div class="help" style={{marginTop: 20}}>
                                    <div>
                                        <input type="checkbox" value={true}/><label>Remember me</label>
                                    </div>
                                    {/* Have to fix this URL */}
                                    <a href="https://www.netflix.com/dz-en/LoginHelp">Need Help ?</a>
                                </div>
                            </form>
                        </div>
                        <div class="signup">
                            <p>New to Netflix ?</p>
                            {/* Have to fix this URL */}
                            <a href="./Signup">Sign up now</a>
                        </div>
                        <div class="more">
                            <p>
                                This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#">Learn more.</a> 
                            </p>
                        </div>
                    </div>
                    <footer>
                        <div class="ftr-content">
                            <div class="contact">
                                <a href="#">Quesions? Contact us.</a>
                            </div>
                            <div class="ftr">
                                <a href="#">Gift Card Terms</a>
                                <a href="#">Terms of Use</a>
                                <a href="#">Privacy Statement</a>
                            </div>
                            <div class="select" >
                                <select>
                                    <option style={{color: "white"}}>English</option>
                                    <option style={{color: "white"}}>Thai</option>
                                    <option style={{color: "white"}}>Français</option>
                                </select>
                            </div>
                        </div>
                    </footer>
            </header>
        </>
    );
};

export default Login;


