import React from 'react';
import { useNavigate } from 'react-router-dom';

// import Menu from '../Menu';
function Plan(props) {
    const navigate = useNavigate();
    return (
        <div className='bgDiv planStart'>
            
            <div className='labelDiv'>
                취향저격 장소가 담긴<br/>
                여행계획 시작해볼까요?
            </div>
            <div className='planStartBtnWrapper'>
                <button className="goToMPlanBtn" onClick={() => navigate('/MakePlan')}>
                        <span className="text">나만의 여행일정 만들기</span>
                </button>
                <button className="goToVPlanBtn" onClick={() => navigate('/ViewPlan')}>
                        <span className="text">다른 사람 일정 구경하기</span>
                </button>
            </div>
        </div>
    );
}

export default Plan;