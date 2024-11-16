import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Journal from "./components/Journal";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );

    return (
        <Router>
            <Routes>
                {!isAuthenticated ? (
                    <Route path="/" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
                ) : (
                    <Route path="/" element={<Journal setIsAuthenticated={setIsAuthenticated} />} />
                )}
            </Routes>
        </Router>
    );
};

export default App;
