import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import TouchDnd from '../components/TouchDnd';
import DndList from '../components/TouchDnd copy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faMapPin, faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons'

import mapPicture from '../../images/map.png'

function PlanUpdate() {

    const placeArray = [{
        id: 0,
        placeName: '제주 국제공항',
        placeCate : '공항',
        placeRate : null
    }, {
        id: 1,
        placeName: '몽상 드 애월',
        placeCate: '카페',
        placeRate: 4.2,
    }];

    const [list, setList] = useState(placeArray);
    const [list2, setList2] = useState([]);
    
    useEffect(()=> {
        const arr = new Array(15).fill().map((x,i) => i);
        setList2(arr);
        setList(placeArray);
    }, []);
    return (
        <div className='homeBgDiv viewDetailWrapper'>
            <div className='planTitle'>
                <PlanTitle type='text' defaultValue='혼자 떠나는 제주여행'></PlanTitle>
            </div>
            <div className='planDate'>
                2022-09-07 ~ 2022-09-16
                <DateBtn className='ç'><FontAwesomeIcon icon={faCalendar}/></DateBtn>
            </div>

            {/* N일차 라디오 버튼 */}
            <div className='dateRadioBtn'>
                <div className='dateRadioBoxWrapper'>
                    <InfoRadioBoxInput
                        type="radio"
                        id='day1'
                        name='day'
                        value='1'
                    />
                    <InfoCheckBoxLabel htmlFor='day1'>
                        1일차
                    </InfoCheckBoxLabel>

                    <InfoRadioBoxInput
                        type="radio"
                        id='day2'
                        name='day'
                        value='2'
                    />
                    <InfoCheckBoxLabel htmlFor='day2'>
                        2일차
                    </InfoCheckBoxLabel>

                    <InfoRadioBoxInput
                        type="radio"
                        id='day3'
                        name='day'
                        value='2'
                    />
                    <InfoCheckBoxLabel htmlFor='day3'>
                        3일차
                    </InfoCheckBoxLabel>

                    <InfoRadioBoxInput
                        type="radio"
                        id='day4'
                        name='day'
                        value='2'
                    />
                    <InfoCheckBoxLabel htmlFor='day4'>
                        4일차
                    </InfoCheckBoxLabel>

                    <InfoRadioBoxInput
                        type="radio"
                        id='day5'
                        name='day'
                        value='2'
                    />
                    <InfoCheckBoxLabel htmlFor='day5'>
                        5일차
                    </InfoCheckBoxLabel>
                    
                    <InfoRadioBoxInput
                        type="radio"
                        id='day6'
                        name='day'
                        value='2'
                    />
                    <InfoCheckBoxLabel htmlFor='day6'>
                        6일차
                    </InfoCheckBoxLabel>

                    <InfoRadioBoxInput
                        type="radio"
                        id='day7'
                        name='day'
                        value='2'
                    />
                    <InfoCheckBoxLabel htmlFor='day7'>
                        7일차
                    </InfoCheckBoxLabel>
                </div>
            </div>

            <div className='mapWrapper'>
                <img src={mapPicture} alt='지도 예시'/>
            </div>


            <div className='routesWrapper'>
                <div className='wrapper1'>
                    <span className='date'>9월 7일 목요일</span>
                </div>

                {/* 여행 장소 경유지 설정 */}
                <div className='wrapper2'>
                    <div className='line'/>
                    <div className='wrapper3'>
                        <TouchDnd List={list} setList={setList} />
                    </div>
                </div>

                
            </div>

            <div className="testtesttesttest">
                <div
                    style={{
                    width: "100%",
                    margin: "50px 0",
                    padding: "0 1rem",
                    boxSizing: "border-box"
                    }}
                >
                    <DndList List={list2} setList={setList2} />
                </div>
            </div>

            
            <VPlanDetailBtnWrapper className='vPlanDetailBtnWrapper'>
                <div className='vPlanDetailBtn'>
                    <FontAwesomeIcon className='icon' size='2xl' icon={faMapPin} style={{color: "#c9c9c9"}} />
                    <span>장소 추가</span>
                </div>
                <div className='vPlanDetailBtn'>
                    <FontAwesomeIcon className='icon' size='2xl' icon={faFloppyDisk} style={{color: "#c9c9c9",}} />
                    <span>일정 저장</span>
                </div>
                <div className='vPlanDetailBtn'>
                    <FontAwesomeIcon className='icon' size='2xl' icon={faTrash} style={{color: "#c9c9c9",}} />
                    <span>일정 삭제</span>
                </div>
            </VPlanDetailBtnWrapper>
            
        </div>
    );
}

// const icon = '<a href="https://www.flaticon.com/free-animated-icons/summer" title="summer animated icons">Summer animated icons created by Freepik - Flaticon</a>'
const InfoRadioBoxInput = styled.input`
    position: relative;
    width: 0px;
    height: 0px;
    padding: 0;
    /* margin: -1; */
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space:nowrap;
    border: 0;
    display: none;
        &:checked+label{
        background-color: #45866B;
        color: white;
        }
`;

const InfoCheckBoxLabel = styled.label` 
    max-height: 1.2vh;
    padding: 0.5rem 1rem 0.5rem;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 2rem;
    background-color: #f2f4f6;
    font-size: 0.8rem;
    color: #383838;
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:2vw;
`;

const VPlanDetailBtnWrapper = styled.div`
    display: flex;
    margin-top: 5vh!important;
`;

const PlanTitle = styled.input`
    /* display: block; */
    font-family: 'KCC-Hanbit';
    font-size: 1.75rem;
    padding: 1.4vh 5vw;
    border-radius: 30px;
    border: none;
    box-shadow: 0px 0px 27px -9px rgba(130,130,130,0.75);
`;

const DateBtn = styled.button`
    width:0.5vw;
    display: flex;
    margin: 0%!important;
    justify-content: center;
    border-radius: 30px;
    border: none;
`;
export default PlanUpdate;