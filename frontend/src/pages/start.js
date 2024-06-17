// src/pages/Itinerary.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/start.css';
import logo from '../images/trouver_logo.png'
import bgVideo from '../images/start_bg.mp4'

const StartPage = () => {
  const navigate = useNavigate();

  // 비디오 속도 조절
  const videoRef = React.useRef();
  const setPlayBackRate = () => {
    videoRef.current.playbackRate = 0.5;
  };

  return (
    <div className='start'>
      <video autoPlay muted loop ref={videoRef} onCanPlay={() => setPlayBackRate()}>
        <source src={bgVideo} type="video/mp4" />
      </video>

      <img src={logo} alt="Trouver logo"/>
      <button onClick={() => navigate('/itinerary')}>시작하기</button>
    </div>
  );
};

export default StartPage;
