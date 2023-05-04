import React, { useEffect, useState } from "react";

import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import { UserContext } from "./context/UserContext";
import Table from "./components/Table";
import Movie from "./components/Movie";

const App = () => {
  const [message, setMessage] = useState("");
  const [token] = React.useContext(UserContext);

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    if(!response.ok) {
      console.log("มีบางอย่างผิดพลาด ชัวรๆ์")
    } else {
      setMessage(data.message);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  return (
    <>
      <Login />
    </>
  );
};

export default App;
