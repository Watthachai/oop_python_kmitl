import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import Table from "./components/Table";
import { UserContext } from "./context/UserContext";
import Movie from "./components/Movie";

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
    <>
    <Table/>
    </>
  );
};

export default App;