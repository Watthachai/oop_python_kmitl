import React, { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitRegistration = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, hashed_password: password }),
    };

    const response = await fetch("/api/users", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmationPassword && password.length > 5) {
      submitRegistration();
    } else {
      setErrorMessage(
        "Ensure that the passwords match and greater than 5 characters"
      );
    }
  };

  return (
    <>
    <header className="showcase">
            <div className="logo">
                <img src="https://i.ibb.co/r5krrdz/logo.png"></img>
            </div>
            <div className="showcase-content">
                <div className="formm">
                    <form>
                        <h1>Sign Up</h1>
                        <div className="info">
                            <input className="email" type="email" placeholder="Email or phone number" /> <br/>
                            <input className="email" type="password" placeholder="Password"/>
                            <input className="email" type="password" placeholder="Comfirm Password"/>
                        </div>
                        <div className="btn">
                            <button className="btn-primary" style={{width:321}} type="submit">Sign In</button>
                        </div>
                        <div className="help" style={{marginTop: 20}}>
                            {/* Have to fix this URL */}
                            <a href="https://www.netflix.com/dz-en/LoginHelp">Need Help ?</a>
                        </div>
                    </form>
                </div>
                <div className="signup">
                    <p>Already Have Account ?</p>
                    {/* Have to fix this URL */}
                    <a href="./Login">Sign in now</a>
                </div>
                <div className="more">
                    <p>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#">Learn more.</a> 
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
                    <div className="select" >
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
/*<div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Register</h1>
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
        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input
              type="password"
              placeholder="Enter password"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primary" type="submit">
          Register
        </button>
      </form>
    </div>
    */
  );
};

export default Register;
