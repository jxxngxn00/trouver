import React from 'react';
import { useNavigate } from 'react-router-dom';
function Dropdown({currUserId, planId, userId}) {
    const go = useNavigate();
    return (
        <div className='dropDownWrapper'>
            <li onClick={()=> go('/qnaInsert')}>문의 하기</li>
        </div>
    );
}

export default Dropdown;