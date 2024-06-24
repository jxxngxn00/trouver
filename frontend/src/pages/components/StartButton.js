import React from 'react';
import kakao from '../../images/kakao_login_medium_narrow.png'
import naver from '../../images/btnG_완성형.png'
import google from '../../images/web_neutral_sq_SI@4x.png'

import { useNavigate } from 'react-router-dom';

/* 
    [ TODO ]
    💟 아래에서 위로 올라오는 효과
    💟 로그인 화면 전환
 */
function StartButton() {
    const navigate = useNavigate();
    return (
        <div className='loginBtnDiv'>
            <div className='descDiv'>
                <p>여행,다시 새롭게!<br/> 로그인하고 성향에 맞는 맞춤 여행을 즐기세요!</p>
            </div>
            <img className='kakao loginBtn' src={kakao} alt="kakao login" onClick={() => navigate('/Home') } />
            <img className='naver loginBtn' src={naver} alt="naver login" onClick={() => navigate('/Home') } />
            <img className='google loginBtn' src={google} alt="google login" onClick={() => navigate('/Home') } />
        </div>
    );
};

export default StartButton;