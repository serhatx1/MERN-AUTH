import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UserContextProvider } from './context/userContext.jsx';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider> {/* Wrap your app with UserContextProvider */}
    <Router>
      <App />
    </Router>
  </UserContextProvider>
);
