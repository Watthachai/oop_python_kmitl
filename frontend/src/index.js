import React from 'react';
import ReactDOM from 'react-dom/client';
import "bulma/css/bulma.min.css";
//import './components/Style/movie.css';
import App from './App';

import { UserProvider } from './context/UserContext';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
    <UserProvider>
        <App />
    </UserProvider>,
);
