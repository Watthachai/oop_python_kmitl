import React from "react";

import { UserContext } from "../context/UserContext";

const Header = ({title}) => {
    const [token, setToken] = React.useContext(UserContext);


    const handleLogout = () => {
        setToken(null);
    };


    return (
        <div className="has-text-centered m-6">
            <h1 className="title">{title}</h1>
            {token && (<button className="button" onClick={handleLogout}>
                ออกจากระบบ
                </button>
                )}
        </div>
    );
};

///export default Header;