import React, { useEffect, useState, useRef } from 'react';
import Menu from '../components/Menu';
import TopBtnBar from '../components/TopBtnBar';

import styled from 'styled-components';
import { Divider, SideBar, Swiper, Tabs } from 'antd-mobile';

import profile from '../../images/default_profile.png';

import ProfileUpdate from '../components/setting/ProfileUpdate';
import {MyReview} from '../components/Review';
import Plan from '../components/setting/Plan';
import MySaved from '../components/setting/MySaved';

const tabs = [
    { key: 'key0',
        title : '프로필 수정',
        div : (<ProfileUpdate/>),
    },
    { key: 'key1',
        title : '내가 쓴 리뷰',
        div : (<MyReview/>),
    },
    { key: 'key2',
        title : '나의 일정',
        div : (<Plan/>),
    },
    { key: 'key3',
        title : '책갈피',
        div : (<MySaved/>),
    },
]

const Profile = () => {
    const user_name = '도레미';
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <Menu/>
            <TopBtnBar/>
            <div className='homeBgDiv'>
                <ProfileDiv className='profileDiv'>
                    <div className='imgWrapper'>
                        <img className='userImg' src={profile} alt='기본 프로필' />
                    </div>
                    <div className='textInfo'>
                        <span id='name'>{user_name}</span>
                        <span id='mbti'>ENFP</span>
                    </div>
                </ProfileDiv>
                <Divider />
                <ContentDiv className='contentDiv'>
                    <Tabs className='tabs' activeKey={tabs[activeIndex].key} onChange={key => {
                        var _a;
                        const index = tabs.findIndex(item => item.key == key);
                        setActiveIndex(index);
                        (_a = swiperRef.current) === null || _a === void 0 ? void 0 : _a.swipeTo(index);
                    }}>
                        {tabs.map(item => (
                            <Tabs.Tab title={item.title} key={item.key}/>
                        ))}
                    </Tabs>
                    <Swiper direction='horizontal' loop indicator={() => null} ref={swiperRef} defaultIndex={activeIndex}
                        onIndexChange={index => setActiveIndex(index) }>
                        {tabs.map((item, idx) => (
                            <Swiper.Item key={idx}>
                                <div className='content'>
                                    {item.div}
                                </div>
                            </Swiper.Item>
                            ))}
                    </Swiper>
                </ContentDiv>
            </div>
        </>
    );
};

const ProfileDiv = styled.div`
    margin-top: 3vh;
    width: 100vw;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    padding: 7vh 0vw 3vh;
    gap: 3vw;


    & .imgWrapper{ 
        position: relative;
        width : 35vw; 
        height: 35vw;
        border-radius: 30px;
        overflow: hidden;
        & img { 
            height: 100%;
            position : absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    & .textInfo {
        display: flex;
        flex-direction: column;
        align-items : flex-start;
        & #name { 
            font-family: 'Pretendart-ExtraBold'; 
            font-size: 1.3rem;
        }
    }
`;

const ContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    & .content {
        width: 100vw;
        height: 100%;
        display: flex;
        justify-content: center;
        text-align: left;
        flex-direction: column;
        align-items: center;
        font-size: 2rem;
    }

    & .tabs {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 1234567;
    }
`;
export default Profile;