import React from 'react';
import Menu from './components/Menu';

import styled from 'styled-components';
import profile from '../images/default_profile.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPercent, faPenNib, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { Toast } from 'antd-mobile';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function Settings(props) {
    const user_name = "도레미";
    const go = useNavigate();

    // eslint-disable-next-line
    const handleClick = (idx) => {
        const propsToPass = { message: idx};
        go('/reserve', { state: propsToPass });
    }

    const toastShow = () => {
        Toast.show({
            icon: (<ClockCircleOutlined/>),
            content: '아직 준비중인 기능이에요 🤔'
        })
    }
    return (
        <>
        <Menu /><div className='homeBgDiv'>
            <Profile onClick={() => go('/profile')}>
                {/* 프로필 */}
                <div className='imgWrapper'>
                    <img className='userImg' src={profile} alt='기본 프로필' />
                </div>
                <div className='textInfo'>
                    <span id='name'>{user_name}</span>
                    <span id='mbti'>ENFP</span>
                </div>
            </Profile>
            {/* 버튼 */}
            <BtnWrapper>
                <div className='profileBtn' onClick={() => toastShow()}>
                    <FontAwesomeIcon className='icon' icon={faPercent} style={{ color: "#ffffff", }} />
                    쿠폰
                </div>
                <div className='profileBtn' onClick={() => go('/profile')}>
                    <FontAwesomeIcon className='icon' icon={faPenNib} style={{ color: "#ffffff", }} />
                    내 일정
                </div>
                <div className='profileBtn' onClick={() => go('/profile')}>
                    <FontAwesomeIcon className='icon' icon={faBookmark} style={{ color: "#ffffff", }} />
                    책갈피
                </div>
            </BtnWrapper>
            <Line />
            {/* 예약/취소 내역 => 예약 시스템 구축 미비로 인한 기능 개발 보류 */}
            {/*
            <ReserveLog>
                예약 / 취소 내역
                <div className='menu' onClick={() => handleClick(1) }>숙소</div>
                <div className='menu' onClick={() => handleClick(2) }>레저 티켓</div>
                <div className='menu' onClick={() => handleClick(3) }>맛집</div>
            </ReserveLog>
            <Line />  */}
            {/* 고객센터 */}
            <Service>
                고객센터
                <div className='menu' onClick={() => go('/faq')}>자주 묻는 질문</div>
                <div className='menu' onClick={() => go('/qna')}>1:1 문의</div>
            </Service>
            <Line />
            {/* 공지사항 + 앱 설정 */}
            <Etc>
                <div className='menu'>공지사항</div>
                <div className='menu'>앱 설정</div>
            </Etc>
            <Line />
            <Etc>
                <div className='menu'>연락처 : trouver00gmail.com</div>
                <div className='menu'>출처들...</div>
            </Etc>
        </div>
        </>
    );
}

const Profile = styled.div`
    width: 100vw;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 7vh 0vw 3vh;
    gap: 4vw;

    & .imgWrapper{ 
        position: relative;
        width : 25vw; 
        height: 25vw;
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

const BtnWrapper = styled.div`
    background-color: white;
    display: flex;
    justify-content: space-evenly;
    width: 100vw;
    padding: 2vh 0vw;

    & .icon {
        margin-right: 1.5vw;
    }

    & .profileBtn {
        padding: 1vh 5vw;
        background-color: #B082C2;
        color: white;
        border-radius: 30px;
        &:hover{ cursor: pointer; }
    }
`;

// 구분선
const Line = styled.div`
    width: 100vw;
    height: 0.1vh;
    background-color: rgb(215,215,215,1);
`;


const ReserveLog = styled.div`
    /* width: 100vw; */
    background-color: white;
    text-align: left;
    padding: 2.23vh 5vw ;
    font-family: 'Pretendart-ExtraBold';
    font-size: 1.1rem;

    & .menu { 
        font-size : 0.95rem; 
        margin: 2.1vh auto;
    }
`;

const Service = styled(ReserveLog)``;
const Etc = styled(ReserveLog)``;
export default Settings;