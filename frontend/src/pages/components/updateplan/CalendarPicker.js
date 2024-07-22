import React, { useState } from "react";
import { Calendar } from "antd-mobile";
// import styled from "styled-components";

function CalendarPicker({ onValChange }) {
    // const today = dayjs();
    const [val, setVal] = useState(() => [
    ]);

    const handleValueChange = (val) => {
        onValChange(`${getDateToString(val.toString(), 0)} ~ ${getDateToString(val.toString(), 1)}`);
        setVal(val)
    }

    const getDateToString = (text, idx) => {
        const dateStrings = text.split(',');
        const dates = dateStrings.map(dateString => new Date(dateString));
        return formatDate(dates[idx]);
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth()+1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <>
            <div style={{height:1, marginTop:36}}></div>
            <Calendar
                className="calendar-custom"
                selectionMode="range"
                value={val}
                onChange={val=>{ handleValueChange(val) }}
            />
            
        </>
    );
}

export default CalendarPicker;