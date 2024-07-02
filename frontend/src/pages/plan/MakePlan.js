import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react';

import DatePickerCustom from "../components/makeplan/DatePickerCustom";
import TagPicker from "../components/makeplan/TagPicker";
import SetBudget from "../components/makeplan/SetBudget";

function MakePlan() {
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const user_name = '도레미'

    switch (state) {
        case 1:
            return(
                <div className='bgDiv makePlanDiv'>
                    <DatePickerCustom/>
                    <button className="mPlanBtn stage1" onClick={() => {setState(state+1)}}>
                        <span className="text">다음</span>
                    </button>
                </div>
            );
        case 2:
            return(
                <div className='bgDiv makePlanDiv'>
                    <TagPicker/>
                    <button className="mPlanBtn stage2" onClick={() => {setState(state+1)}}>
                        <span className="text">다음</span>
                    </button>
                </div>
            );
        case 3:
            // console.log(SetBudget);
            return(
                <div className='bgDiv makePlanDiv'>
                    <SetBudget />
                    <button className="mPlanBtn stage3" onClick={() => {navigate('/viewplandetail')}}>
                        <span className="text">다음</span>
                    </button>
                </div>
            );
            
        default:
            return(
                <div className='bgDiv makePlanDiv'>
                    <div className='labelDiv'>
                        <span>안녕하세요 {user_name}님,<br/></span>
                        <span>지금부터 당신을 위한<br/>여행계획을 도와드릴게요.</span>
                    </div>
                    <button className="mPlanBtn stage0" onClick={() => {setState(state+1);}}>
                        <span className="text">시작하기</span>
                    </button>
                </div>
            );
    };

}

export default MakePlan;