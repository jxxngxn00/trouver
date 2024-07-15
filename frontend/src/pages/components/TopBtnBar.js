import { DoubleLeftOutlined, SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TopBarDiv } from '../../css/topBtnBarCss';

const TopBtnBar = () => {
    const go = useNavigate();
    const handleBackBtn = () => {
        go(-1);
    };

    let currentUrl = window.location.pathname;
    const [scrollPosition, setScrollPosition] = useState(0);
    // Scroll 위치를 감지
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };

    useEffect(() => {
        window.addEventListener("scroll", updateScroll);
    },[]);

    return (
        <TopBarDiv className='topBarDiv'>
            <div className={scrollPosition < 50 ? "original_header header" : "change_header header"}>
                <DoubleLeftOutlined className='backBtn icon' onClick={() => handleBackBtn()} />
                <div className='btnDiv'>
                    <SearchOutlined className='searchBtn icon' onClick={() => go('/search')} />
                    <CalendarOutlined className='calendarBtn icon'/>
                </div>
            </div>
        </TopBarDiv>
    );
};

export default TopBtnBar;
