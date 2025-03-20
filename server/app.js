import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Gallery from "./components/Gallery";
import Request from "./components/Request";

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Gallery</Link>
                <Link to="/request">Request</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Gallery />} />
                <Route path="/request" element={<Request />} />
            </Routes>
        </Router>
    );
}

export default App;

