import React, { useState, useContext } from "react";

import Register from "./Register";
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
                </div>
                <errorMessage message={errorMessage} />
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

                <button onClick={<Register />}>Sign up now!</button>
            </div>
            <div className="more">
                <p>
                This page is protected by <b>OOP KMITL</b> to ensure you're not a
                bot. <a href="#">Learn more.</a>
                </p>
            </div>
            </div>
            <footer>
            <div className="ftr-content">
                <div className="contact">
                <a href="#">Quesions? Contact us.</a>
                </div>
                <div className="ftr">
                <a href="#">Gift Card Terms</a>
                <a href="#">Terms of Use</a>
                <a href="#">Privacy Statement</a>
                </div>
                <div className="select">
                <select>
                    <option style={{ color: "white" }}>English</option>
                    <option style={{ color: "white" }}>Thai</option>
                    <option style={{ color: "white" }}>Français</option>
                </select>
                </div>
            </div>
            </footer>
        </header>
        </>
  /*<div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Login</h1>
        <div className="field">
          <label className="label">Email Address</label>
          <div className="control">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primary" type="submit">
          Login
        </button>
      </form>
    </div>*/
  );
};

export default Login;
