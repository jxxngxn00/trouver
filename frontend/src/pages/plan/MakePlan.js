import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react';

import DatePickerCustom from "../components/makeplan/DatePickerCustom";
import TagPicker from "../components/makeplan/TagPicker";
import SetBudget from "../components/makeplan/SetBudget";

function MakePlan() {
    const navigate = useNavigate();
    
    const [state, setState] = useState(0);
    const [date, setDate] = useState([]);
    const [budget, setBudget] = useState('');
    const [tags, setTags] = useState([]);
    
    const user_name = '도레미'

    const handleSubmit = () => {
        const formData = {
            date, budget, tags,
        };
        navigate('/planUpdate', { state: formData });
    }

    switch (state) {
        case 1:
            return(
                <div className='bgDiv makePlanDiv'>
                    <DatePickerCustom onDateChange={setDate}/>
                    <div className="btnWrapper">
                        <button className="mPlanBtn stage1" onClick={() => {setState(state-1)}}>
                            <span className="text">이전</span>
                        </button>
                        <button className="mPlanBtn stage1" onClick={() => {setState(state+1)}}>
                            <span className="text">다음</span>
                        </button>
                    </div>
                </div>
            );
        case 2:
            return(
                <div className='bgDiv makePlanDiv'>
                    <TagPicker onTagsChange={setTags}/>
                    <div className="btnWrapper">
                        <button className="mPlanBtn stage2" onClick={() => {setState(state-1)}}>
                                <span className="text">이전</span>
                            </button>
                        <button className="mPlanBtn stage2" onClick={() => {setState(state+1)}}>
                            <span className="text">다음</span>
                        </button>
                    </div>
                </div>
            );
        case 3:
            // console.log(SetBudget);
            return(
                <div className='bgDiv makePlanDiv'>
                    <SetBudget onBudgetChange={setBudget}/>
                    <div className="btnWrapper">
                        <button className="mPlanBtn stage3" onClick={() => {setState(state-1)}}>
                            <span className="text">이전</span>
                        </button>
                        <button className="mPlanBtn stage3" onClick={() => {handleSubmit()}}>
                            <span className="text">일정 만들러 가기</span>
                        </button>
                    </div>
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