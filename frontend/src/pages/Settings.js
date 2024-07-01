import React from 'react';

import styled from 'styled-components';
import profile from '../images/profil.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPercent, faPenNib, faBookmark } from '@fortawesome/free-solid-svg-icons'

function Settings(props) {
    const user_name = "도레미";
    return (
        <div className='homeBgDiv'>
            <Profile>
                {/* 프로필 */}
                <img className='userImg' src={profile} alt='기본 프로필'/>
                <div className='textInfo'>
                    <span id='name'>{user_name}</span>
                    <span id='mbti'>ENFP</span>
                </div>

            </Profile>
            {/* 버튼 */}
            <BtnWrapper>
                <div className='profileBtn'><FontAwesomeIcon className='icon' icon={faPercent} style={{color: "#ffffff",}} />쿠폰</div>
                <div className='profileBtn'><FontAwesomeIcon className='icon' icon={faPenNib} style={{color: "#ffffff",}} />리뷰</div>
                <div className='profileBtn'><FontAwesomeIcon className='icon' icon={faBookmark} style={{color: "#ffffff",}} />My</div>
            </BtnWrapper>
            <Line/>
            {/* 예약/취소 내역 */}
            <ReserveLog>
                예약 / 취소 내역
                <div className='menu'>숙소</div>
                <div className='menu'>레저 티켓</div>
                <div className='menu'>맛집</div>
                <div className='menu'>항공</div>
            </ReserveLog>
            <Line/>
            {/* 고객센터 */}
            <Service>
                고객센터
                <div className='menu'>자주 묻는 질문</div>
                <div className='menu'>1:1 문의</div>
            </Service>
            <Line/>
            {/* 공지사항 + 앱 설정 */}
            <Etc>
                <div className='menu'>공지사항</div>
                <div className='menu'>앱 설정</div>
            </Etc>
        </div>
    );
}

const Profile = styled.div`
    width: 100vw;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 3vh 0vw;
    gap: 4vw;
    & .userImg{ width : 15%; }
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