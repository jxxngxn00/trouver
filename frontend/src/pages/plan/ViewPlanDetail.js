import React from 'react';
import DistantCalc from '../components/viewplan/DistantCalc';
import styled from 'styled-components';

function ViewPlanDetail() {
    return (
        <div className='viewDetailWrapper'>
            <div className='planTitle'></div>
            <div className='planDate'></div>
            <div className='dateRadioBtn'>
                <div className='dateRadioBoxWrapper'>
                    <CareerRadioBox key={0}>
                        <InfoRadioBoxInput
                            type="radio"
                            id='day1'
                            name='day1'
                        />
                        <InfoCheckBoxLabel htmlFor='day1'>
                            <InfoCheckBoxSpan>1일차</InfoCheckBoxSpan>
                        </InfoCheckBoxLabel>
                    </CareerRadioBox>
                </div>
            </div>
            <div className='map'>
                <img src='../../images/map.png' alt='지도 예시'/>
            </div>
            <div className='routesWrapper'>
                <span className='date'></span>
                <button className='modalPopUpBtn'></button>
                
                {/* 반복될 부분 */}
                <div className='routeDiv'>
                    <DistantCalc />
                    <div className='route'>
                        <span className='placeName'></span>
                        <span className='distance'></span>
                        <span className='placeCate'></span>
                        <div className='weather'></div>
                    </div>
                </div>

                <div className='trouverRecomm'>
                    <span>👍 트루버의 추천을 받아보세요 </span>
                    <div className='slider'>

                    </div>
                </div>

                <div className='vPlanDetailBtnWrapper'>
                    <div>
                        <span>일정 저장</span>
                    </div>
                    <div>
                        <span>일정 편집</span>
                    </div>
                    <div>
                        <span>일정 공유</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

const InfoRadioBoxInput = styled.input`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip : rect(0,0,0,0);
    white-space: nowrap;
    border:0

    &::checked+label {
        background-color: #45866B;
        color: white;
    }
`;
const InfoCheckBoxLabel = styled.label` 
    padding: 0.5rem 1rem;
    height: 2.25rem;
    cusor: pointer;
    border-radius: 2rem;
    background-color: #f2f4f6;
    font-size: 0.75rem;
    color: #383838;
`;
const CareerRadioBox = styled.div``;
const InfoCheckBoxSpan = styled.span``;

export default ViewPlanDetail;