import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import Movie from './components/Movie';
import { UserContext } from "./context/UserContext";


const App = () => {
  const [message, setMessage] = useState("");
  const [token] = useContext(UserContext);

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log("something messed up");
    } else {
      setMessage(data.message);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);


  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/register" component={Register} />

        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />

        <Route exact path="/" component={Register} />
        <Route path="/Movie" component={Movie} />
      </Switch>

    </Router>
  );
}

export default App;