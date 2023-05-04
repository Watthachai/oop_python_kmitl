import React, { useState, useContext } from "react";
import ReactDOM from 'react-dom';
import Register from "./Register";
import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);

  const history = useHistory();

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(
        `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };

    const response = await fetch("/api/token", requestOptions);
    const data = await response.json();

    if (!response.ok) {
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
        <header className="showcase">
            <div className="logo">
            <img src="https://i.ibb.co/r5krrdz/logo.png"></img>
            </div>
            <div className="showcase-content">
            <div className="formm" onSubmit={handleSubmit}>
                <form>
                <h1>Sign In</h1>
                <div className="info">
                    <input
                    className="email"
                    type="email"
                    placeholder="Email or phone number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <br />
                    <input
                    className="email"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <ErrorMessage message={errorMessage} />
                </div>
                <div className="btn">
                    <button
                    className="btn-primary"
                    style={{ width: 321 }}
                    type="submit"
                    >
                    Sign In
                    </button>

                </div>
                <div className="help" style={{ marginTop: 20 }}>
                    <div>
                    <input type="checkbox" value={true} />
                    <label>Remember me</label>
                    </div>

                    <a href="https://www.netflix.com/en-US/LoginHelp">
                    Need Help ?
                    </a>
                </div>
                </form>
            </div>
            <div className="signup">
                <p>New to Netflix ?</p>

                <Link to="/register">
                  <button>Sign up now!</button>
                </Link>

            </div>
            <div className="more">
                <p>
                This page is protected by <b>OOP KMITL</b> to ensure you're not a
                bot. <a href="#">Learn more.</a>
                </p>
            </div>
            </div>
            
        </header>
      </>
  );
};

export default Login;
