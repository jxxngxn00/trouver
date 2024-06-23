import React from 'react';

import '../css/customComponent.css'

/* 이미지 import */
import home from '../images/icons/home.png'
import plan from '../images/icons/passport.png'
import prod from '../images/icons/discount.png'
import hotspot from '../images/icons/hot-deal.png'
import mypage from '../images/icons/user.png'

const Menu = () => {
    return (
        <div className='menuBar'>
            <div className='goToHome'>  
                <img className='iconImg' src={home} alt="Home menu"></img><br/>
                홈
            </div>
            <div className='goToPlan'>
                <img className='iconImg' src={plan} alt="Home menu"></img><br/>
                추천여행
            </div>
            <div className='goToProduct'>
                <img className='iconImg' src={prod} alt="Home menu"></img><br/>
                추천상품
            </div>
            <div className='goToHotSpot'>
                <img className='iconImg' src={hotspot} alt="Home menu"></img><br/>
                핫스팟
            </div>
            <div className='goToMyPage'>
                <img className='iconImg' src={mypage} alt="Home menu"></img><br/>
                MY
            </div>
        </div>
    );
};

export default Menu;