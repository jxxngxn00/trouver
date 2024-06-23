import React from 'react';
// import logo from '../images/trouver_logo.png'
import '../css/Home.css'
import logo_big from '../images/logo_big.png'
import Menu from '../components/Menu';


function Home(props) {
    const userName = '테스트유저';
    return (
        <div className='homeBgDiv'>
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
            <Menu />
            {/* <Footer/> */}
        </div>
    );
}

export default Home;