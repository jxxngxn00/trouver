import React, { useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup, faBed, faBowlFood, faMugSaucer, 
    faPersonRunning, faPalette, faClover, faChessRook, faGem } from '@fortawesome/free-solid-svg-icons'

function CateMenu({cate, setCate}) {
    const clicked_div = useRef([]);
    const [isActive, setIsActive] = useState(false);

    const toggleClass = (index, text) => {
        setIsActive(index);
        setCate(text);
    };

    return (
        <div className='cateMenu'>
            <div className='title'><FontAwesomeIcon className='titleIcon' icon={faLayerGroup} />트루버 추천 코스 카테고리</div>
            <div className='btnWrapper'>
                {[
                    { icon: faBed, text: '숙소' },
                    { icon: faBowlFood, text: '맛집' },
                    { icon: faMugSaucer, text: '카페' },
                    { icon: faPersonRunning, text: '액티비티' },
                    { icon: faPalette, text: '박물관/전시회' },
                    { icon: faClover, text: '자연경관' },
                    { icon: faChessRook, text: '테마파크' },
                    { icon: faGem, text: '쿠폰/할인' }
                ].map((item, index) => (
                    <div
                        key={index}
                        className={`btnSpan ${isActive === index ? 'clicked' : ''}`}
                        onClick={() => toggleClass(index, item.text)}
                    >
                        <div className='btnDiv'>
                            <FontAwesomeIcon icon={item.icon} className='icon' size="lg" />
                        </div>
                        <span ref={el => clicked_div.current[index] = el}>{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    /* 
    return (
        <div className='cateMenu'>
            <div className='title'><FontAwesomeIcon icon={faLayerGroup} />트루버 추천 코스 카테고리</div>
            <div className='btnWrapper'>
                <div className={isActive? "btnSpan clicked" : "btnSpan"}onClick={() => {toggleClass()}}>
                    <div className='btnDiv'>
                        <FontAwesomeIcon icon={faBed} className='icon' size="lg"/>
                    </div>
                    <span ref={clicked_div} >숙소</span>
                </div>

                <div className={isActive? "btnSpan clicked" : "btnSpan"} onClick={() => {toggleClass()}}>
                    <div className='btnDiv'>
                        <FontAwesomeIcon icon={faBowlFood} className='icon' size="lg" />
                    </div>
                    <span ref={clicked_div}>맛집</span>
                </div>
                <div className='btnSpan'>
                    <div className='btnDiv'>
                        <FontAwesomeIcon icon={faMugSaucer} className='icon' size="lg" />
                    </div>
                    <span>카페</span>
                </div>
                <div className='btnSpan'>
                    <div className='btnDiv'>
                        <FontAwesomeIcon icon={faPersonRunning} className='icon' size="lg" />
                    </div>
                    <span>액티비티</span>
                </div>

                <div className='btnSpan'>
                    <div className='btnDiv'>
                        <FontAwesomeIcon icon={faPalette} className='icon' size="lg" />
                    </div> 
                    <span>박물관/전시회</span>
                </div>
                
                <div className='btnSpan'>
                    <div className='btnDiv'>
                        <FontAwesomeIcon icon={faClover} className='icon' size="lg" />
                    </div>
                    <span>자연경관</span>
                </div>
                
                <div className='btnSpan'>
                    <div className='btnDiv'>
                        <FontAwesomeIcon icon={faChessRook} className='icon' size="lg" />
                    </div>
                    <span>테마파크</span>
                </div>
                <div className='btnSpan'>
                    <div className='btnDiv'>
                        <FontAwesomeIcon icon={faGem} className='icon' size="lg" />
                    </div>
                    <span>쿠폰/할인</span>
                </div>

            </div>
        </div>
    );
    */
}

export default CateMenu;