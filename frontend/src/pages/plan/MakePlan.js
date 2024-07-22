import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from "axios";

import DatePickerCustom from "../components/makeplan/DatePickerCustom";
import TagPicker from "../components/makeplan/TagPicker";
import SetBudget from "../components/makeplan/SetBudget";

function MakePlan() {
    const navigate = useNavigate();
    
    const [state, setState] = useState(0);
    const [date, setDate] = useState([]);
    const [budget, setBudget] = useState('');
    const [tags, setTags] = useState([]);
    
    const user_name = '도레미';
    const user_id = '9597bcda-482f-11ef-8bed-e3e8e1b0cef5';

    const handleSubmit = async () => {
        // 각각 component에서 입력한 내용 변수 저장
        let formData = {
            date, budget, tags,
            user_login_id : `${user_id}`,
        };

        try {
            // DB에 formData 저장 
            axios.post(`/api/plan/insertPlan`, formData, {
                headers : {
                    "Context-Type" : "multipart/form-data",
                },
            });
            
        } catch (error) {
            console.error("Error fetching plan insert : ",error);
        }

        // 화면 이동
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