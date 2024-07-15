import React from 'react';
import styled from 'styled-components';
const items = [
    { id:'search0', label:'테스트 데이터입니다. 0' },
    { id:'search1', label:'테스트 데이터입니다. 1' },
    { id:'search2', label:'테스트 데이터입니다. 2' },
    { id:'search3', label:'테스트 데이터입니다. 3' },
    { id:'search4', label:'테스트 데이터입니다. 4' },
];
const SearchTrend = () => {
    return (
        <div>
            {items.map((item, idx) => (
                <TrendDiv key={item.id} className='TrendDiv'>
                    <span className='number'>{idx+1}.</span>
                    <span className='label'>{item.label}</span>
                </TrendDiv>
            ))}
        </div>
    );
};

const TrendDiv = styled.div`
    margin: 1.3vh 0vw;
    /* padding: 0vh 5vw; */
    width: 100vw;
    display: flex;
    align-items: center;
    & .label { width:35vw; 
        padding: 0vh 5vw;
        white-space:nowrap; 
        text-align:left; 
        flex:2; 
    }

    & .number { 
        font-family: 'Pretendart-ExtraBold';
        font-size: 1rem;
        padding: 0vh 0vw 0vh 5vw;
        white-space:nowrap; 
        text-align:left;
    }
`;
export default SearchTrend;