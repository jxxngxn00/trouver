import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function SetBudget() {
    /* 
        rc-slider tutorial
        참고 velog : https://velog.io/@rain98/rc-slider%EB%A1%9C-%EC%96%91%EB%B0%A9%ED%96%A5-range%EB%A7%8C%EB%93%A4%EA%B8%B0
    */
    // const { Range } = Slider;
    // console.log(Range);
    function log(value) {
        console.log(value); //eslint-disable-line
    }

    return (
        <div>
            <div className='labelDiv'>
                <span className='quest'>예산은 얼마로 생각하세요?</span>
            </div>

            <Slider range allowCross={false} defaultValue={[0, 20]} onChange={log} />
        </div>
    );
}


export default SetBudget;