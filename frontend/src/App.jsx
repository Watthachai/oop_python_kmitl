import React, { useEffect, useState } from "react";

import Register from "./components/Register";
import Header from "./components/Header";
import { UserContext } from "./context/UserContext";

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
    <Header title={message}/>
    <div className="columns">
      <div className="column"></div>
      <div className="column"></div>
      <div className="column m-5 is-two-thirds">
        {
          !token ? (
            <div className="columns">
              <Register/> <p>Login</p>
            </div>
          ) : (
            <p>Table</p>
          )
        }
      </div>
      <div className="column"></div>
    </div>
    </>
  );
};

export default App;
