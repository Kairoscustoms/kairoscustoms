import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Gallery from './components/Gallery';
import RequestPage from './components/RequestPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/request" element={<RequestPage />} />
      </Routes>
    </Router>
  );
}

export default App;

