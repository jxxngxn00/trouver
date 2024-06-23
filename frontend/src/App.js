import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './pages/start';
import Itinerary from './pages/Itinerary';
// import index from './pages/index';
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

  // 모바일 화면 크기 최적화 함수
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/itinerary" element={<Itinerary />} />
            {/* <Route path="/index" element={<index />} /> */}
          </Routes>
      </div>
    </Router>
  );
}

export default App;
