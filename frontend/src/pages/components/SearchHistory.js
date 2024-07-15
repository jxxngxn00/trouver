import { ClearOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
const items = [
    { id:'search0', label:'테스트 데이터입니다. 0' },
    { id:'search1', label:'테스트 데이터입니다. 1' },
    { id:'search2', label:'테스트 데이터입니다. 2' },
    { id:'search3', label:'테스트 데이터입니다. 3' },
    { id:'search4', label:'테스트 데이터입니다. 4' },
];
const History = () => {
    return (
        <HistoryWrapper>  
            {items.map((item, idx) => (
                <HistoryDiv key={item.id} className='historyDiv'>
                    <span className='label'>{item.label}</span>
                    <button className='deleteBtn'><ClearOutlined/></button>
                </HistoryDiv>
            ))}
        </HistoryWrapper>
    );
};
const HistoryWrapper = styled.div`
    display: grid;
`;
const HistoryDiv = styled.div`
    margin: 1.3vh 0vw;
    /* padding: 0vh 5vw; */
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & .deleteBtn { 
        border: 1.3px solid rgba(232,76,76,1);
        background-color: white;
        border-radius: 100%;
        width: 5vw; 
        display: flex;
        justify-content: center; align-items: center;
        margin-top: 0;
        color: rgba(232,76,76,1);
        margin-right: 5vw;
     }
    & .label { width:35vw; 
        padding: 0vh 5vw;
        white-space:nowrap; 
        text-align:left; 
        flex:2; 
    }
`;
export default History;