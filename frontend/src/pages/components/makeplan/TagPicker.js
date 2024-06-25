import React from 'react';
import styled from 'styled-components';

function TagPicker() {
    return (
        <div className='setDateDiv'>
            <div className='labelDiv'>
                <span className='quest'>어떤 여행을 <br/>하고 싶으세요?</span>
                <span className='detail_quest'>한가지를 꼭 선택해주세요.</span>
            </div>
            <div className='tagDiv'>
                <div className='compPicker'>
                    <span className='tagQuest'>누구와 함께 여행을 가나요?</span>
                    <div className='tagCheckBoxWrapper'>
                        <CheckBoxInput type='checkbox' id='company' name='company'/>
                        <CheckBoxLabel htmlFor='test'>company</CheckBoxLabel>
                    </div>
                </div>
                <div className='tagPicker'>
                    <span className='tagQuest'>여행 테마 / 취미 / 관심사를 알려주세요!</span>
                    <div className='tagCheckBoxWrapper'>
                        <CheckBoxInput type='checkbox' id='tag' name='tag'/>
                        <CheckBoxLabel htmlFor='tag'>tag</CheckBoxLabel>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default TagPicker;


const CheckBoxInput = styled.input`
    position: relative;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space:nowrap;
    border: 0;

    &:checked+label{
    background-color: #45866B;
    color: white;
    }
`;

const CheckBoxLabel = styled.label`
    padding: 0.5rem 1rem 0.5rem;
    cursor: pointer;
    border-radius: 2rem;
    background-color: #f2f4f6;
    font-size: 0.9rem;
    color: #383838;
    border: none;
`;
