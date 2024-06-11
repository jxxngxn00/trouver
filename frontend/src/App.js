import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Itinerary from './pages/Itinerary';
import './App.css';

import { useEffect } from "react";
import axios from "axios";

function App() {
  const getApi = async () => {
    axios.get("/api").then((res)=> console.log(res.data));
  };

  useEffect(() => {
    getApi();  
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
