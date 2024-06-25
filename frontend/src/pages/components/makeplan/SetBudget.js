import React, { useState } from 'react';
import styled from 'styled-components';
function SetBudget() {
    /* 
        dual slider tutorial
        참고 velog : https://velog.io/@forest_xox/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%96%91%EB%B0%A9%ED%96%A5-Range-%EB%A7%8C%EB%93%A4%EA%B8%B0
    */
    const fixedMaxPrice = 10000;
    const fixedMinPrice = 5000000;
    const priceGap = 1000;


    const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice); 
    const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
    const [rangeMinPercent, setRangeMinPercent] = useState(0);
    const [rangeMaxPercent, setRangeMaxPercent] = useState(0);

    const prcieRangeMinValueHandler = e => {
    setRangeMinValue(parseInt(e.target.value));
    };

    const prcieRangeMaxValueHandler = e => {
    setRangeMaxValue(parseInt(e.target.value));
    };

    const twoRangeHandler = () => {
    if (rangeMaxValue - rangeMinValue < priceGap) {
        setRangeMaxValue(rangeMinValue + priceGap);
        setRangeMinValue(rangeMaxValue - priceGap);
    } else {
        setRangeMinPercent((rangeMinValue / fixedMaxPrice) * 100);
        setRangeMaxPercent(100 - (rangeMaxValue / fixedMaxPrice) * 100);
    }
    };
    return (
        <div>
             <div className='labelDiv'>
                <span className='quest'>예산은 얼마로 생각하세요?</span>
            </div>
            <FilterPriceSlide>
                <FilterPriceSlideInner
                    rangeMinPercent = {rangeMinPercent}
                    rangeMaxPercent = {rangeMaxPercent}
                    // rangeMinPercent = {0}
                    // rangeMaxPercent = {100}
                />
            </FilterPriceSlide>

            <FilterPriceRangeWrap>
                <FilterPriceRangeMin
                    type='range' 
                    min={fixedMinPrice}
                    max={fixedMaxPrice - priceGap}
                    step="1000"
                    value={rangeMinValue}
                    onChange={e=>{
                        prcieRangeMinValueHandler(e);
                        twoRangeHandler();
                    }}
                />
                <FilterPriceRangeMax
                    type='range' 
                    min={fixedMinPrice + priceGap}
                    max={fixedMaxPrice}
                    step="1000"
                    value={rangeMinValue}
                    onChange={e=>{
                        prcieRangeMaxValueHandler(e);
                        twoRangeHandler();
                    }}    
                />
            </FilterPriceRangeWrap>
        </div>
    );
}

const FilterPriceSlide = styled.div`
    position : relative;
    height: 4px;
    width: 50vw;
    border-radius: 10px;
    background-color: #dddddd;
`;

const FilterPriceSlideInner = styled.div`
    position: absolute;
    left:${props => props.rangeMinPercent}%;
    right:${props => props.rangeMaxPercent}%;
    height:4px;
    border-radius: 10px;
    background-color: #b0b0b0;
`;

const FilterPriceRangeWrap = styled.div`
    position : relative;
    
`;
const FilterPriceRangeMin = styled.input`
    pointer-events: none;
    &::-webkit-slider-thumb {
        pointer-events: auto;
    }
    position : absolute;
    left: 0%;
    top:-2.5vh;
    width: 100%;  
        -webkit-appearance: none;
    background: none;

        &::-webkit-slider-thumb {
            height: 30px;
            width: 30px;
            border-radius: 50%;
            border: 2px solid #b0b0b0;
            background-color: white;
            -webkit-appearance: none;
        }
`;
const FilterPriceRangeMax = styled(FilterPriceRangeMin)``;

export default SetBudget;