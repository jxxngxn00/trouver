import React, { useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faBed, faBowlFood, faMugSaucer, 
    faPersonRunning, faPalette, faClover, faChessRook, faGem } from '@fortawesome/free-solid-svg-icons'

function CateMenu({state, cate, setCate}) {
    const clicked_div = useRef([]);
    const [isActive, setIsActive] = useState(false);

    const toggleClass = (index, text) => {
        setIsActive(index);
        setCate(text);
    };

    return (
        <div className='cateMenu'>
            {state !== 0 && 
                <div className='title'><FontAwesomeIcon className='titleIcon' icon={faFire} />핫스팟 in 제주</div>
            }
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
}

export default CateMenu;