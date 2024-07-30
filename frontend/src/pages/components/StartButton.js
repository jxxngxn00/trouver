import React from 'react';
import kakao from '../../images/kakao_login_medium_narrow.png';
import naver from '../../images/btnG_완성형.png';
import google from '../../images/web_neutral_sq_SI@4x.png';
import { useNavigate } from 'react-router-dom';

const Rest_api_key = process.env.REACT_APP_KAKAO_API_KEY;
console.log(">> Rest_api_key :: ",Rest_api_key);
const redirect_uri = 'http://localhost:3000/auth';

const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
const handleLogin = ()=>{
    window.location.href = kakaoURL;
    const code = new URL(window.location.href).searchParams.get("code");
};

function StartButton() {
    const navigate = useNavigate();
    return (
        <div className='loginBtnDiv'>
            <div className='descDiv'>
                <p>여행,다시 새롭게!<br/> 로그인하고 성향에 맞는 맞춤 여행을 즐기세요!</p>
            </div>
            <img className='kakao loginBtn' src={kakao} alt="kakao login" onClick={() => handleLogin() } />
            <img className='naver loginBtn' src={naver} alt="naver login" onClick={() => navigate('/Home') } />
            <img className='google loginBtn' src={google} alt="google login" onClick={() => navigate('/Home') } />
        </div>
    );
};

export default StartButton;