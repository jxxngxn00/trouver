// src/pages/Itinerary.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/start.css';
import logo from '../images/trouver_logo.png'
import kakao from '../images/kakao_login_medium_narrow.png'
import naver from '../images/btnG_완성형.png'
import google from '../images/web_neutral_sq_SI@4x.png'
import bgVideo from '../images/start_bg.mp4'

const Itinerary = () => {
  const navigate = useNavigate();

  // 비디오 속도 조절
  const videoRef = React.useRef();
  const setPlayBackRate = () => {
    videoRef.current.playbackRate = 0.5;
  };

  return (
    <div className='bgDiv'>
      <video autoPlay muted loop ref={videoRef} onCanPlay={() => setPlayBackRate()}>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <img className='logoImg' src={logo} alt="Trouver logo"/>
      <div className='loginBtnDiv'>
        <div className='descDiv'>
          <p>여행,다시 새롭게!<br/> 로그인하고 성향에 맞는 맞춤 여행을 즐기세요!</p>
        </div>
        <img className='kakao loginBtn' src={kakao} alt="kakao login" onClick={() => navigate('/')}/>
        <img className='naver loginBtn' src={naver} alt="naver login" onClick={() => navigate('/')}/>
        <img className='google loginBtn' src={google} alt="google login" onClick={() => navigate('/')}/>
      </div>
    </div>
  );
};

export default Itinerary;
