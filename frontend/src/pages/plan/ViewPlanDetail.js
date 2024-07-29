import React, { useEffect, useState } from 'react';

// components
import DistantCalc from '../components/viewplan/DistantCalc';
import Dropdown from '../components/viewplan/Dropdown';
import Menu from '../components/Menu';
import TopBtnBar from '../components/TopBtnBar';

// library
import styled from 'styled-components';
import { Avatar, Toast, Modal } from 'antd-mobile';
import { CheckCircleFilled } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faThumbsUp, faBookmark, faCalendarDay, faSquareShareNodes } from '@fortawesome/free-solid-svg-icons'


// images
import mapPicture from '../../images/map.png'
import dots from '../../images/dots.png'
import test from '../../images/test.jfif'
import car from '../../images/icons/car.png'
import bus from '../../images/icons/bus.png'
import sun from '../../images/icons/sun.gif'

// hooks
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const getDateToString = (date) => {
    const newDate = new Date(date);
    return formatDate(newDate);
};

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

function ViewPlanDetail() {
    const curr_user_id = 'fdb19576-48f1-11ef-bcc9-af0a24947caf';
    // const curr_user_id = 'fdb19c88-48f1-11ef-bcc9-af0a24947caf';
    const [view, setView] = useState(false);
    const [plan, setPlan] = useState([]);
    const [datePlan, setDatePlan] = useState([]);
    const [route, setRoute] = useState([]);
    const [index, setIndex] = useState(0);
    const go = useNavigate();
    const { planId } = useParams();

    useEffect(() => {
        const getPlanDetail = async () => {
            const res = await axios.get(`/api/plan/getPlanDetail/${planId}`);
            console.log(">> getPlanDetail :: ",res.data.datePlan);
            const resPlan = res.data.plan[0];
            const resDatePlan = res.data.datePlan;
            setPlan(resPlan);
            setDatePlan(resDatePlan);
        };

        const getRoute = async () => {
            const res = await axios.get(`/api/plan/getPlanDetailRoute/${planId}`);
            console.log(">> getPlanDetailRouter : ", res.data);
            setRoute(res.data);
        }
        getPlanDetail();
        getRoute();
        // eslint-disable-next-line
    },[planId]);

    const getDayName = (week_n) => {
        // console.log('week_n :: ' ,week_n);
        switch (week_n) {
            case '0': 
                return '일요일';
            case '1': 
                return '월요일';
            case '2': 
                return '화요일';
            case '3': 
                return '수요일';
            case '4': 
                return '목요일';
            case '5': 
                return '금요일';
            case '6': 
                return '토요일';
            default:
                return 'Error';
        }
    }
    // 책갈피 저장 완료 모달 팝업
    const saveConfirm = async () => {
        const result = await Modal.confirm({
            header: ( <CheckCircleFilled
                    style={{ 
                        fontSize: 64, 
                        color: 'var(--adm-color-confirm)'
                    }} /> ),
            title: '책갈피 저장 완료',
            content: '책갈피에 담아뒀어요!',
            confirmText: '책갈피에서 확인하기',
            cancelText: '더 둘러보기',
            closeOnMaskClick: true,
        });

        if (result) { 
            Toast.show( { content:'책갈피 -- 준비중입니다.', position:'bottom'})
        } else {
            Toast.show( { content:'마이페이지의 "책갈피"에서 확인할 수 있어요!', position:'bottom'})
        }
    }
    return (
        <>
        <TopBtnBar/>
        <Menu/>
        <div className='homeBgDiv viewDetailWrapper'>
            <PlanTitle className='planTitle'>
                {plan.plan_title}
            </PlanTitle>
            <PlanInfo>
                <div className='planDate'>
                    {getDateToString(plan.plan_start)} ~ {getDateToString(plan.plan_end)} <br/>
                    예산 : {plan.plan_budget}
                </div>
                <div className='writerDiv'>
                    <span>{plan.user_name}</span>
                    <Avatar src=''/>
                </div>
            </PlanInfo>
            <div className='mapWrapper'>
                <img src={mapPicture} alt='지도 예시' />
            </div>
            
            {/* N일차 라디오 버튼 */}
            <div className="dateRadioBtn">
                <div className="dateRadioBoxWrapper">
                {datePlan.map((dateN, idx) => (
                    <React.Fragment key={idx} >
                        <InfoRadioBoxInput
                            type="radio"
                            id={`day${idx + 1}`}
                            name="day"
                            value={idx}
                            onChange={(e) => {setIndex(e.target.value);}}
                            defaultChecked = {idx === index}
                        />
                        <InfoCheckBoxLabel htmlFor={`day${idx + 1}`}>
                            {idx + 1}일차
                        </InfoCheckBoxLabel>
                    </React.Fragment>
                ))}
                </div>
            </div>
            
            

            <div className='routesWrapper'>
                <div className='wrapper1'>
                    <span className='date'>
                        {datePlan[index]?.date_plan_date}&nbsp;
                        {getDayName(datePlan[index]?.week_n)}
                    </span>
                    <ul className='dropDownBtn' onClick={()=>setView(!view)}>
                        <img src={dots} alt='더보기' />
                        {view && <Dropdown currUserId={curr_user_id} planId = {plan?.plan_d} userId = {plan?.user_id}/>}
                    </ul>
                </div>

                {/* 반복될 부분 */}
                { route.map((r, idx) => {
                    // console.log(r?.date_plan_uuid === datePlan[index]?.date_plan_uuid);
                    return r.date_plan_uuid === datePlan[index]?.date_plan_uuid ? 
                    (
                    <><div className='routeDiv' key={idx} onClick={()=>go(`/viewProdDetail/${r.route_pla_id}`)}>
                            <div className='route'>
                                <span className='placeName'>{r.pla_name}</span>
                                <div className='detailsWrapper'>
                                    <DistantCalc />
                                    <span className='placeCate'>{r.pla_cate}</span>
                                    { r.pla_rate_avg ? 
                                        (<span className='placeRate'>
                                            <FontAwesomeIcon icon={faStar} />
                                            {r.pla_rate_avg}
                                        </span>) : null
                                    }

                                </div>
                            </div>
                            <div className='weather'>
                                <img src={sun} alt='날씨' />
                                온도
                            </div>
                            { r.route_tip ? 
                                (
                                    <div className='routeDiv commentDiv' key={idx}>
                                        <span> 이용자님 만의 Tip!</span>
                                        <span className='content'>웨이팅 10분에서 15분정도 있어용!!!</span>
                                    </div>
                                ) : null
                            }
                        </div>
                        
                        { idx !== route.length - 1 && route[idx+1].date_plan_uuid === datePlan[index]?.date_plan_uuid ? (
                            <div className='moveInfoWrapper'>
                                <DistantCalc /> 
                                <span className='moveInfo'><img src={car} alt='car icon' />999km</span>
                                <span className='moveInfo'><img src={bus} alt='bus icon' />999km</span>
                            </div>
                        ) : null
                        }
                        </>
                        ) : null
                    })
                }

                <div className='wrapper2'>
                    <div className='line'></div>
                    <div className='wrapper3'>
                        

                        <div className='imgSlider'>
                            <img src={test} alt='장소관련 사진' />
                            <img src={test} alt='장소관련 사진' />
                            <img src={test} alt='장소관련 사진' />
                            <img src={test} alt='장소관련 사진' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='trouverRecomm'>
                <RecommTitle className='title'><FontAwesomeIcon icon={faThumbsUp} />&nbsp; 트루버의 추천을 받아보세요 </RecommTitle>
                <div className='imgSlider'>
                    <div className='trouverRecommDetail'>
                        <img src={test} alt='장소관련 사진' />
                        <span className='placeName'>애월 가나다라 카페</span>
                        <div className='detailsWrapper'>
                            <span className='placeCate'>카페</span>
                            <span className='placeRate'>
                                <FontAwesomeIcon icon={faStar} /> &nbsp;
                                4.2(7,231)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='vPlanDetailBtnWrapper'>
                <div className='vPlanDetailBtn' onClick={() => saveConfirm()}>
                    <FontAwesomeIcon className='icon' size='2xl' icon={faBookmark} style={{ color: "#c9c9c9" }} />
                    <span>999+</span>
                </div>
                <div className='vPlanDetailBtn' onClick={() => go(`/planUpdate/${plan.plan_id}`)}>
                    <FontAwesomeIcon className='icon' size='2xl' icon={faCalendarDay} style={{ color: "#c9c9c9", }} />
                    <span>일정 편집</span>
                </div>
                <div className='vPlanDetailBtn' onClick={() => { Toast.show( {content:'공유하기 -- 준비중입니다.', position:'center'})}}>
                    <FontAwesomeIcon className='icon' size='2xl' icon={faSquareShareNodes} style={{ color: "#c9c9c9", }} />
                    <span>일정 공유</span>
                </div>
            </div>
        </div>
        </>
    );
}

const InfoRadioBoxInput = styled.input`
    position: relative;
    width: 0px;
    height: 0px;
    padding: 0;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
    display: none;
    &:checked+label {
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
    margin-left: 2vw;
`;

const PlanInfo = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 1vh 0;
`;

const PlanTitle = styled.div`
    margin-top: 7vh;
`;

const RecommTitle = styled.span`
    display: block;
    text-align: left;
    padding: 0vh 2vw;
    margin-top: 2vh;

    font-family: 'Pretendart-ExtraBold';
    font-size: 1rem;
`;
export default ViewPlanDetail;
