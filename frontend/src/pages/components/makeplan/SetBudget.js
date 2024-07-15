import React, { useState } from 'react';
import { Slider } from 'antd-mobile';
// import { Toast } from 'antd-mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

// import 'rc-slider/assets/index.css';

function SetBudget(props) {
    const {min, max} = props;

    const [selectMin, setSelectMin] = useState(min); // eslint-disable-line no-unused-vars
    const [selectMax, setSelectMax] = useState(max); // eslint-disable-line no-unused-vars

    const toastValue = (value) => {
        var text; // eslint-disable-line no-unused-vars
        if (typeof value === 'number') {
            text = `${value}`; // eslint-disable-line no-unused-vars
        } else {
            text = `${value.join(',')}`; // eslint-disable-line no-unused-vars
            setSelectMin(value[0]);
            setSelectMax(value[1]);
        }
        // Toast.show(`선택됨 : ${selectMin}, ${selectMax}`);
        console.log(value);
    }
    return (
        <div className='setBudgetWrapper'>
            <div className='labelDiv'>
                <span className='quest'>예산은 얼마로 생각하세요?</span>
            </div>
            <IconWrapper className='icon-wrapper'>
                {/* <FrownOutlined className={preColorCls}/> */}
                <Slider 
                    style={{ '--fill-color': '#00b578'}}
                    range 
                    onAfterChange={toastValue} 
                    min={min}
                    max={max}
                    defaultValue={[250000,750000]}
                    step={1000}
                    icon={<FontAwesomeIcon icon={faDollarSign} />}
                    popover
                    residentPopover
                />
                {/* <SmileOutlined className={nextColorCls}/> */}
            </IconWrapper>
        </div>
    );
}

const IconWrapper = styled.div`
    padding: 3vw;
    width: 85vw;
`;
export default SetBudget;