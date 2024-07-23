import { CalendarPicker } from 'antd-mobile';
import styled from 'styled-components';
import React, { useState } from 'react';

export const getDateToString = (text, idx) => {
    // console.log("DatePickerCustom :: ",text);
    const dateStrings = text?.split(',');
    const dates = dateStrings?.map(dateString => new Date(dateString));
    return formatDate(dates[idx]);
};

export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function DatePickerCustom({ onDateChange }) {
    const [val, setVal] = useState(null);
    const [visible, setVisible] = useState(false);


    return (
        <div className='setDateDiv'>
            <div className='labelDiv'>
                <span>언제 여행을 떠나시나요?</span>
            </div>
            <DateDiv className='dateDiv'>
                {val ? <DateButton onClick={() => {setVisible(true)}}>{getDateToString(val.toString(), 0)} ~ {getDateToString(val.toString(), 1)}</DateButton>
                : <DateButton onClick={() => {setVisible(true)}}>날짜가 설정되지 않았습니다.</DateButton>}
                <CalendarPicker
                    title='여행 일정 날짜'
                    visible={visible}
                    selectionMode='range'
                    value={val}
                    onClose={() => setVisible(false)}
                    onMaskClick={() => setVisible(false)}
                    onChange={val => {
                        setVal(val);
                        onDateChange([getDateToString(val.toString(), 0), getDateToString(val.toString(), 1)]);
                    }}
                    confirmText='변경하기'
                />
            </DateDiv>
            
        </div>
    );
}

const DateButton = styled.button`
    border: none;
    border-radius: 30px;
    font-family: 'KCC-Hanbit';
    color: #45866b;
    background-color: white;
`;

const DateDiv = styled.div`
    font-family: 'KCC-Hanbit';
    color: white;
    font-size: 1rem;
`;
export default DatePickerCustom;
