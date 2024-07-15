import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { List } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import TopBtnBar from '../components/TopBtnBar';
/*
    ~ state 별 상태 ~
    0 : 답변 대기중
    1 : 답변 완료
    2 : 기타 (삭제됨 등등 ...)
*/
const items = [
    {
        id:0,
        title:'1대1 문의 제목 0',
        state:0,
        cate:0,
        date: dayjs().format('YYYY-MM-DD'),
    },
    {
        id:1,
        title:'1대1 문의 제목 1',
        state:1,
        cate:1,
        date: dayjs().format('YYYY-MM-DD'),
    },
    {
        id:2,
        title:'1대1 문의 제목 2',
        state:2,
        cate:2,
        date: dayjs().format('YYYY-MM-DD'),
    },
];
const stateStr = ['답변 대기중', '답변 완료', '기타'];
const cateStr = ['상품','일정','기타'];
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

const QnA = () => {
    const go = useNavigate();
    const handleClick = (idx) => {
        const props = items[idx];
        go('/qnaDetail', {state: props});
    }

    return (
        <StyleDiv className='homeBgDiv ViewPlanBgDiv'>
            <TopBtnBar/>
            <QnaBtn onClick={() => go('/qnaInsert')}>1:1 문의하기</QnaBtn>
            <List className='listWrapper'>
                { items.map((item, idx) => (
                    <List.Item 
                    className={getItemClass(item.state)}
                    key={item.id} extra={stateStr[item.state]} description={item.date} clickable
                    onClick={() => handleClick(idx)}
                    >
                    <span className='cate'>{cateStr[item.cate]}</span>
                    {item.title}
                    </List.Item>
                ))}
            </List>
        </StyleDiv>
    );
};

const StyleDiv = styled.div`
    & .listWrapper {
        width: 100%;

        & .adm-list-item-content-main {
            padding: 3vh 3vw;
            text-align: left;
        }

        & .wait .adm-list-item-content-extra{
            color: #5c5c5c;
        }

        & .success .adm-list-item-content-extra{
            color: #007fe0;
        }

        & .warning .adm-list-item-content-extra{
            color: #d66829;
        }

        & .cate { 
            margin-right: 3vw; 
            background-color: #45866B;
            color: white;
            padding: 0.5vh 2vw;
            border-radius: 15px;
        }
    }
`;

const QnaBtn = styled.div`
    width: 70vw;
    background-color: black;
    color: white;
    border-radius: 15px;
    margin: 9vh auto 2vh;
    height: 5vh;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default QnA;