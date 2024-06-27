import React, { useState } from 'react';
import DistantCalc from '../components/viewplan/DistantCalc';

import Dropdown from '../components/viewplan/Dropdown';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faThumbsUp, faBookmark, faCalendarDay, faSquareShareNodes } from '@fortawesome/free-solid-svg-icons'

import mapPicture from '../../images/map.png'
import dots from '../../images/dots.png'
import test from '../../images/test.jfif'
import car from '../../images/icons/car.png'
import bus from '../../images/icons/bus.png'
import sun from '../../images/icons/sun.gif'

function ViewPlanDetail() {
    const [view, setView] = useState(false);

    return (
        <div className='homeBgDiv viewDetailWrapper'>
            <div className='planTitle'>
                혼자 떠나는 제주여행
            </div>
            <div className='planDate'>
                2022-09-07(시작일) ~ 2022-09-16 (종료일)
            </div>
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
                    <ul className='dropDownBtn' onClick={() => {setView(!view)}}>
                        <img src={dots} alt='더보기'/>
                        {view && <Dropdown/>}
                    </ul>
                </div>
                
                {/* 반복될 부분 */}
                <div className='wrapper2'>
                    <div className='line'>

                    </div>
                    <div className='wrapper3'>
                        <div className='routeDiv'>
                            {/* <FontAwesomeIcon className="spot" icon={faCircle} style={{color: "#7d7d7d",}} /> */}
                            <div className='route'>
                                <span className='placeName'>제주 국제공항</span>
                                <div className='detailsWrapper'>
                                    <DistantCalc />
                                    <span className='placeCate'>공항</span>
                                </div>
                            </div>
                            <div className='weather'>
                                <img src={sun} alt='날씨'/>
                                온도
                            </div>
                        </div>
                        
                        <div className='moveInfoWrapper'>
                            <DistantCalc/>
                            <span className='moveInfo'><img src={car} alt='car icon'/>999km</span>
                            <span className='moveInfo'><img src={bus} alt='bus icon'/>999km</span>
                        </div>

                        <div className='routeDiv'>
                            <div className='route'>
                                <span className='placeName'>몽상 드 애월</span>
                                <div className='detailsWrapper'>
                                    <DistantCalc />
                                    <span className='placeCate'>카페</span>
                                    <span className='placeRate'>
                                        <FontAwesomeIcon icon={faStar}/>
                                        4.2(7,231)</span>
                                </div>
                            </div>
                            <div className='weather'>
                                <img src={sun} alt='날씨'/>
                                온도
                            </div>
                        </div>
                        <div className='imgSlider'>
                            <img src={test} alt='장소관련 사진'/>
                            <img src={test} alt='장소관련 사진'/>
                            <img src={test} alt='장소관련 사진'/>
                            <img src={test} alt='장소관련 사진'/>
                        </div>


                    </div>
                </div>

                
            </div>

            <div className='trouverRecomm'>
                <span><FontAwesomeIcon icon={faThumbsUp} />트루버의 추천을 받아보세요 </span>
                <div className='imgSlider'>
                    <div className='trouverRecommDetail'>
                        <img src={test} alt='장소관련 사진'/>
                        <span className='placeName'>애월 가나다라 카페</span>
                        <div className='detailsWrapper'>
                            <span className='placeCate'>카페</span>
                            <span className='placeRate'>
                                <FontAwesomeIcon icon={ faStar } />
                            4.2(7,231)</span>
                        </div>
                    </div>
                    <div className='trouverRecommDetail'>
                        <img src={test} alt='장소관련 사진'/>
                        <span className='placeName'>애월 가나다라 카페</span>
                        <div className='detailsWrapper'>
                            <span className='placeCate'>카페</span>
                            <span className='placeRate'>
                                <FontAwesomeIcon icon={ faStar } />
                            4.2(7,231)</span>
                        </div>
                    </div>
                    <div className='trouverRecommDetail'>
                        <img src={test} alt='장소관련 사진'/>
                        <span className='placeName'>애월 가나다라 카페</span>
                        <div className='detailsWrapper'>
                            <span className='placeCate'>카페</span>
                            <span className='placeRate'>
                                <FontAwesomeIcon icon={ faStar } />
                            4.2(7,231)</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='vPlanDetailBtnWrapper'>
                <div className='vPlanDetailBtn'>
                    <FontAwesomeIcon className='icon' size='2xl' icon={faBookmark} style={{color: "#c9c9c9"}} />
                    <span>일정 저장</span>
                </div>
                <div className='vPlanDetailBtn'>
                    <FontAwesomeIcon className='icon' size='2xl' icon={faCalendarDay} style={{color: "#c9c9c9",}} />
                    <span>일정 편집</span>
                </div>
                <div className='vPlanDetailBtn'>
                    <FontAwesomeIcon className='icon' size='2xl' icon={faSquareShareNodes} style={{color: "#c9c9c9",}} />
                    <span>일정 공유</span>
                </div>
            </div>
            
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

export default ViewPlanDetail;