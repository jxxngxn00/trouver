import React from 'react';
import { useNavigate } from 'react-router-dom';
function Dropdown() {
    const go = useNavigate();
    return (
        <div className='dropDownWrapper'>
            <li onClick={()=> go('/planUpdate')}>일정 편집</li>
            <li onClick={()=> go('/qnaInsert')}>문의 하기</li>
        </div>
    );
}

export default Dropdown;