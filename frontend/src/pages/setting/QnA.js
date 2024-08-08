import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { List } from 'antd-mobile';
import { Form, useNavigate } from 'react-router-dom';
import TopBtnBar from '../components/TopBtnBar';
import axios from 'axios';
/*
    ~ state 별 상태 ~
    0 : 답변 대기중
    1 : 답변 완료
    2 : 기타 (삭제됨 등등 ...)
*/
const stateStr = ['답변 대기중', '답변 완료', '기타'];
const cateStr = ['상품','일정','회원','기타'];
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
    const data = { user_id : 'fdb1a386-48f1-11ef-bcc9-af0a24947caf' }
    const [items, setItems] = useState([]);

    const getQnaList = async () => {
        const res = await axios.get(`/api/qna/`,{params : data});
        // console.log(res)
        res?.data.map((result) => {
            /* 결과 파라미터 items 배열 형태로 바꿔서 setItems */
            const id = result.q_id,
                state = result.q_answer,
                cate = result.q_cate,
                date = result.q_date;
            const FormatDate = dayjs(date).format('YYYY-MM-DD');
            const inputData = {
                id : id,
                state : Number(state),
                cate : Number(cate), 
                date : FormatDate,
            };
            console.log(inputData);
            setItems([...items, inputData]);
        })
    }

    useEffect(()=> {
        getQnaList();
    },[]);

    const handleClick = (idx) => {
        const props = items[idx];
        go(`/qnaDetail/${props.id}`);
    }

    return (
        <StyleDiv className='homeBgDiv ViewPlanBgDiv'>
            <TopBtnBar/>
            <QnaBtn onClick={() => go(`/qnaInsert/${data.user_id}`)}>1:1 문의하기</QnaBtn>
            <List className='listWrapper'>
                { items.map((item, idx) => (
                    <List.Item 
                    className={getItemClass(item.state)}
                    key={item.id} extra={stateStr[item.state]} clickable
                    onClick={() => handleClick(idx)}
                    >
                    <span className='cate'>{cateStr[item.cate]}</span>
                    {item.date}
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