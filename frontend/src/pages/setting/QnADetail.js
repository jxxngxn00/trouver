import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQ, faA, faEllipsisVertical, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { Popup, List, Modal, Toast } from 'antd-mobile';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import TopBtnBar from '../components/TopBtnBar';

// 삭제 전 경고 모달 팝업
const warning = () => {
    Modal.alert({
        header: (
            <ExclamationCircleFilled
                style={{
                    fontSize: 64,
                    color: 'var(--adm-color-warning)',
                }}
            />
        ),
        title: '문의사항 삭제',
        content: (
            <><div> 문의사항을 정말 삭제할까요? </div><div> 삭제된 문의사항은 복구하기 어렵습니다! </div></>
        ),
        showCloseButton: true,
        confirmText: '삭제하기',
        onConfirm: async () => deletAlert()
    });
};

// 삭제 완료 모달 팝업
const deletAlert = async () => {
    Modal.alert({
        header: ( <CheckCircleFilled
                style={{ 
                    fontSize: 64, 
                    color: 'var(--adm-color-confirm)'
                }} /> ),
        title: '문의 삭제 완료',
        content: '문의가 정상적으로 삭제되었습니다.',
        confirmText: '확인',
        closeOnMaskClick: true,
        // onConfirm: () => go('/viewplan')
    });
};
const stateStr = ['답변 대기중', '답변 완료', '기타'];
const cateStr = ['상품','일정','기타'];
const QnADetail = () => {
    const [view, setView] = useState(false);
    const location = useLocation();
    const data = location.state;
    
    // 수정 / 삭제 불가 여부 판단 및 안내
    const isWaited = (state) => {
        state === 0 ? setView(!view)
        : Toast.show({
            icon: (<FontAwesomeIcon icon={faExclamation} />),
            content: (<>수정이나 삭제할 수 없는<br/> 문의사항이에요 💬</>),
        });
    }

    const getItemClass = (state) => {
        switch (state) {
            case 0:
                return 'wait';
            case 1:
                return 'success';
            case 2:
                return 'warning';
            default:
                return '';
        }
    };

    return (
        <StyleDiv className='homeBgDiv ViewPlanBgDiv'>
            <TopBtnBar/>
            <TopBtnWrapper className='topBtnWrapper'>
                <span className='date'>{data?.date}</span>
                <span className={getItemClass(data?.state)+' '+'state'}>{stateStr[data?.state]}</span>
                <span className='dropDownTrigger' onClick={() => isWaited(data?.state)}><FontAwesomeIcon icon={faEllipsisVertical} /></span>
            </TopBtnWrapper>
            <Popup
                visible={view}
                onMaskClick={() => setView(false) }
                onClose={() => setView(false)}
            >
                <List>
                    <List.Item clickable arrowIcon={false}>수정</List.Item>
                    <List.Item clickable arrowIcon={false} onClick={()=>warning()}>삭제</List.Item>
                </List>
            </Popup>
            <QuestionDiv className='questionDiv'>
                <FontAwesomeIcon className='icon' icon={faQ} color='#007fe0'/>
                <div>
                    <Title>
                        <Cate>{cateStr[data?.cate]}</Cate>
                        {data?.title}
                    </Title>
                    {/* 답변상태, 드롭다운버튼 만들기 (답변상태에 따른) */}
                    <Content>문의 내용 문의 내용 문의 내용 문의 내용 문의 내용 문의 내용 문의 내용 문의 내용 문의 내용 문의 내용 </Content>
                </div>
            </QuestionDiv>
            <AnswerDiv className='answerDiv'>
                <FontAwesomeIcon className='icon' icon={faA} style={{color: "#ff3c1a",}} />
                <div>
                    <Title>관리자 답변</Title>
                    <Content>문의 내용 문의 내용 문의 내용 문의 내용 문의 내용 문의 내용 문의 내용 문의 내용 문의 내용 문의 내용 </Content>
                </div>
            </AnswerDiv>
        </StyleDiv>
    );
};
const StyleDiv = styled.div`
    & .icon { height:5vh; }
`;

const TopBtnWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 90vw;
    margin: 9vh 0vw 2vh;
    & .date, .state { white-space:nowrap; }
    & .date { width: 60vw; }
    & .state {
        color: white;
        padding: 0.7vh 3vw;
        border-radius: 15px;
    }
    & .wait {
        background-color: #5c5c5c;
    }

    & .success {
        background-color: #007fe0;
    }

    & .warning {
        background-color: #ff5d00;
    }
`;

const QuestionDiv = styled.div`
    width: 90vw;
    display: flex;
    align-items: flex-start;
    gap: 3vw;
    margin : 5vh auto;
`;

const AnswerDiv = styled(QuestionDiv)``;


const Content = styled.div`
    width: 100%;
    text-align: left;
`;
const Title = styled(Content)`
    font-size: 1.33rem;
    font-family: 'Pretendart-ExtraBold'!important;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2vw;

    margin-bottom: 2vh;
`;
const Cate = styled(Content)`
    width: fit-content !important;
    font-size: 1rem;
    font-family: 'Pretendart-ExtraBold';
    color: white;
    background-color: #45866B;
    padding: 0.5vh 3vw;
    border-radius: 15px;
`;

export default QnADetail;