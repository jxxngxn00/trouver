import React, { useState } from 'react';


import '../css/start.css';
import '../css/default.css'
import '../css/component.css'
import logo from '../images/trouver_logo.png'

/* 외부 JS 호출 함수 */
const loadJS = () => {
    const classieScript = document.createElement("script");
    classieScript.src = "../js/classie.js";
    classieScript.async = true;
    classieScript.type = "application/js"
    document.body.appendChild(classieScript);

    const modernizrScript = document.createElement("script");
    modernizrScript.src = "../js/modernizr.custom.js";
    modernizrScript.async = true;
    modernizrScript.type = "application/js"
    document.body.appendChild(modernizrScript);
};

function StartPage(props) {
    loadJS();

    const [currentComponent, setCurrentComponent] = useState('start');
    
    const renderComponent = () => {
        switch (currentComponent) {
            case 'start' :
                return (<button className="btn btn-4 btn-4a icon-arrow-right continue" 
                    onClick={()=> setCurrentComponent('loginBtn')}>여행 시작하기</button>);
            case 'loginBtn' :
                return <startButton />;
            default :
                return (<button className="btn btn-4 btn-4a icon-arrow-right continue" 
                onClick={()=> setCurrentComponent('loginBtn')}>여행 시작하기</button>);
        }
    }

    return (
        <div className='bgDiv'>

            <img className='logoImg' src={logo} alt="Trouver logo"/>
            {/* <button className="btn btn-4 btn-4a icon-arrow-right continue" 
            onClick={() => navigate('/loginBtn')}>여행 시작하기</button> */}
            {renderComponent()}
        </div>
    );
}

export default StartPage;