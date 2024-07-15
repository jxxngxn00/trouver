import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import logo_big from '../images/logo_big.png';
import '../css/Home.css';
import Plan from './components/home/Plan';

const displayBG = (menu) => {
    const userName = '테스트유저';
    switch(menu){
        case 1: // Plan 메뉴 버튼 클릭시
            return <Plan />;
        default: // default : home
            return (
                <>
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
                </>
            );
    }
};

function Home(props) {
    const [menu, setMenu] = useState(() => {
        const savedMenu = localStorage.getItem('activeMenu');
        return savedMenu !== null ? JSON.parse(savedMenu) : 0;
    });
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.menu !== undefined) {
            setMenu(location.state.menu);
        }
    }, [location]);

    return (
        <div className='homeBgDiv'>
            <Menu menu={menu} setMenu={setMenu} />
            { displayBG(menu) }
        </div>
    );
}

export default Home;
