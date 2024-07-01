import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/customComponent.css'

/* 이미지 import */
import home from '../../images/icons/home.png'
import plan from '../../images/icons/passport.png'
import prod from '../../images/icons/discount.png'
import hotspot from '../../images/icons/hot-deal.png'
import mypage from '../../images/icons/user.png'

const Menu = () => {
    const navigate = useNavigate();
    return (
        <nav className='menuBar'>
            <div className='goToHome' onClick={() => navigate('/Home') } >  
                <img className='iconImg' src={home} alt="Home menu"></img><br/>
                홈
            </div>
            <div className='goToPlan' onClick={() => navigate('/plan') } >
                <img className='iconImg' src={plan} alt="Home menu"></img><br/>
                추천여행
            </div>
            <div className='goToProduct' onClick={() => navigate('/product')}>
                <img className='iconImg' src={prod} alt="Home menu"></img><br/>
                코스여행
            </div>
            <div className='goToHotSpot' onClick={() => navigate('/hotspot')}>
                <img className='iconImg' src={hotspot} alt="Home menu"></img><br/>
                핫스팟
            </div>
            <div className='goToMyPage' onClick={() => navigate('/settings')}>
                <img className='iconImg' src={mypage} alt="Home menu"></img><br/>
                MY
            </div>
        </nav>
    );
};

export default Menu;