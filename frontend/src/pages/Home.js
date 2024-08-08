import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from './components/Menu';
import logo_big from '../images/logo_big.png';
import '../css/Home.css';
import Plan from './components/home/Plan';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMapPin } from '@fortawesome/free-solid-svg-icons';

const displayBG = (menu, recentPlan, navigate, savedPlace, savedPlan) => {
    const userName = 'Trouver';

    const handleNavigate = async (e, plan_uuid) => {
        try {
            axios.patch(`/api/plan/updateHits/${plan_uuid}`);
            // console.log('Navigating to:', `/ViewPlanDetail/${plan_uuid}`); // 디버깅을 위해 로그 추가
            navigate(`/ViewPlanDetail/${plan_uuid}`);
        } catch (error) {
            console.error('Error updating hits : ',error);
        }
    };

    switch(menu){
        case 1: // Plan 메뉴 버튼 클릭시
            return <Plan />;
        default: // default : home
            return (
                <>
                    <div className='welcomeDiv div-100'>
                        <div className='div-50 textDiv'>
                            <p>어서오세요</p>
                            <p className='userNameP'>{userName}님!</p>
                            <p>여행을 떠나볼까요?</p>
                        </div>
                        <div className='div-50 imgDiv'>
                            <img className='logoImg' src={logo_big} alt="Trouver logo"></img>
                        </div>
                    </div>
                    { recentPlan ? (
                        <div className='planDiv div-100' onClick={(e) => handleNavigate(e, recentPlan.plan_uuid)}>
                            <Title>최근에 정한 일정 ✏️</Title>
                            <DescWrapper className='descWrapper'>
                                <div className='planTitle'>
                                    {recentPlan.plan_title}
                                </div>
                                <div className='detailsWrapper'>
                                    <div className='detail'>
                                        <FontAwesomeIcon className="descicon" icon={faMapPin} size="xs" />  &nbsp;
                                        {recentPlan.count_routes} route
                                    </div>
                                    <div className='detail'>
                                        <FontAwesomeIcon className="descicon" icon={faMapPin} size="xs" /> &nbsp;
                                        {recentPlan.plan_start} ~ {recentPlan.plan_end}
                                    </div>
                                    <div className='detail'>
                                        <FontAwesomeIcon className="descicon" icon={faMapPin} size="xs" /> &nbsp;
                                        {recentPlan.plan_budget}
                                    </div>
                                    <div className='detail tag'>
                                        <FontAwesomeIcon className="descicon" icon={faMapPin} size="xs" /> &nbsp;
                                        {recentPlan.plan_tag}
                                    </div>
                                </div>
                            </DescWrapper>
                        </div>
                    ) : (
                        <div className='planDiv div-100' onClick={() => navigate(`/`)}>
                            <Title>저장된 일정이 없어요!</Title>
                        </div>
                    )}

                    <div className='testDiv div-100'> 
                       <Title> 취향지수 높이기 (준비중)</Title>
                    </div>

                    <Title>나의 북마크</Title>
                    <div className='savedDiv div-100'>
                        <div className='savedPlaceDiv div-50' onClick={() => navigate('/profile')}> 
                            <Title className='savedTitle'>여행지</Title>
                            <span className='count'>{savedPlace}</span>
                        </div>
                        <div className='savedPlanDiv div-50' onClick={() => navigate('/profile')}>
                            <Title className='savedTitle'>일정</Title>
                            <span className='count'>{savedPlan}</span>
                        </div>
                    </div>
                    
                    <Title>이런 여행은 어때요?</Title>
                    <div className='feedDiv div-100'> 
                        <div className='feedDiv div-50'> </div>
                        <div className='feedDiv div-50'> </div>
                        <div className='feedDiv div-50'> </div>
                        <div className='feedDiv div-50'> </div>
                        <div className='feedDiv div-50'> </div>
                        <div className='feedDiv div-50'> </div>
                    </div>
                </>
            );
    }
};

function Home(props) {
    const [menu, setMenu] = useState(() => {
        const savedMenu = localStorage.getItem('activeMenu');
        return savedMenu !== null ? JSON.parse(savedMenu) : 0;
    });
    const [recentPlan, setRecentPlan] = useState();
    const [savedPlan, setSavedPlan] = useState();
    const [savedPlace, setSavedPlace] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    const curr_user_id = 'fdb19576-48f1-11ef-bcc9-af0a24947caf'; // mac
    const getRecentPlan = async () => {
        try {
            const res = await axios.get(`/api/plan/getRecentPlan/${curr_user_id}`);
            // console.log(res.data);
            if (res.data && res.data.length > 0) {
                setRecentPlan(res.data[0]);
            } else {
                console.warn("No recent plan found, using default value.");
                setRecentPlan(null);
            }
        } catch (error) {
            console.error("Error getRecentPlan :: ", error);
        }
    };

    const getCountSave = async () => {
        const res = await axios.get(`/api/bookmark/getCountSave/${curr_user_id}`);
        console.log(res.data);
        setSavedPlace(res.data.place);
        setSavedPlan(res.data.plan);
    };

    useEffect(() => {
        getRecentPlan();
        getCountSave();
    },[curr_user_id]);

    useEffect(() => {
        if (location.state && location.state.menu !== undefined) {
            setMenu(location.state.menu);
        }
    }, [location]);

    return (
        <div className='homeBgDiv'>
            <Menu menu={menu} setMenu={setMenu} />
            { displayBG(menu, recentPlan, navigate, savedPlace, savedPlan) }
        </div>
    );
}

const Title = styled.div`
    text-align: left;
    font-family: 'KCC-Hanbit';
    margin: 3vh 0vw 0vh 6vw;
    font-size: 1.3rem;
    font-weight: bold;

    color: #45866b;
`;

const DescWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding : 0vh 7vw;
    margin-top: 1.2vh;

    & .planTitle {
        white-space: nowrap;
        padding: 0%;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        width: 100%;
    }

    & .detailsWrapper {
        flex-direction: column;
        align-items: flex-start;
    }
`;
export default Home;
