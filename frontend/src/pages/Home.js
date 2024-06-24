import React, { useState } from 'react';

// import axios from 'axios';
// import logo from '../images/trouver_logo.png'

import logo_big from '../images/logo_big.png'
import '../css/Home.css'
import Menu from './components/Menu';
import Plan from './components/home/Plan';

function Home(props) {
    const userName = '테스트유저';
    const [menu, setMenu] = useState("Home");
    
    switch(menu){
        case "Plan" : // Plan 메뉴 버튼 클릭시
            return (
                <div className='homeBgDiv'>
                    <Menu menu={menu} setMenu={menu}/>
                    <Plan />
                </div>
            );
        default : // default : home
            return (
                <div className='homeBgDiv'>
                    <Menu menu={menu} setMenu={menu}/>
                    {/* <img className='logoImg' src={logo} alt="Trouver logo"/> */}
                    <div className='welcomeDiv div-100'>
                        <div className='div-50 textDiv'>
                            <p>어서오세요</p>
                            <p className='userNameP'>{userName}님!</p>
                            <p>여행을 떠나볼까요?</p>
                        </div>
                        <div className='div-50 imgDiv'>
                            <img className='logoImg' src={logo_big} alt="Trouver logo"></img>
                        </div>
                    </div>
        
                    <div className='planDiv div-100'> </div>
        
                    <div className='testDiv div-100'> </div>
        
                    <div className='savedDiv div-100'>
                        <div className='savedPlaceDiv div-50'> </div>
                        <div className='savedPlanDiv div-50'> </div>
                    </div>
                    <div className='feedDiv div-100'> </div>
                    <div className='feedDiv div-100'> </div>
                    <div className='feedDiv div-100'> </div>
                    <div className='feedDiv div-100'> </div>
                    <div className='feedDiv div-100'> </div>
                </div>
            );
    };
}

export default Home;