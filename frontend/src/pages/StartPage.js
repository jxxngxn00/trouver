import React, { useState } from 'react';


import '../css/start.css';
import logo from '../images/trouver_logo.png'
import StartButton from './components/StartButton'

/* 외부 JS 호출 함수 */

function StartPage(props, ref) {
    const [currentComponent, setCurrentComponent] = useState('start');

    const renderComponent = () => {
        switch (currentComponent) {
            case 'loginBtn' :
                return <StartButton />;
            default :
                // eslint-disable-next-line jsx-a11y/no-redundant-roles
                return (<button className="startButton" role="button"
                onClick={()=> setCurrentComponent('loginBtn')}>
                    <span className="text">여행 시작하기</span></button>);
        }
    };

    return (
        <div className='bgDiv'>
            <img className='logoImg' src={logo} alt="Trouver logo"/>
            {renderComponent()}
        </div>
    );
}

export default StartPage;