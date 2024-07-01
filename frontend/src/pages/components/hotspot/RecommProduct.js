import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faAnglesRight, faFaceGrinHearts} from '@fortawesome/free-solid-svg-icons'

import test from '../../../images/test.jfif'
import styled from 'styled-components';
import CateMenu from './CateMenu';

function RecommProduct() {
    const navigate = useNavigate();
    const [cate, setCate] = useState();

    return (
        <div className='recommProduct'>

                <div className='title'><FontAwesomeIcon  className='titleIcon' icon={faFaceGrinHearts} />이런 장소는 어때요? :: {cate}</div>

                <CateMenu state={0} cate={cate} setCate={setCate}/>

                <div className='imgSlider'>
                    <div className='trouverRecommDetail' onClick={() => navigate('/viewproddetail')}>
                        <img src={test} alt='장소관련 사진'/>
                        <span className='placeName'>애월 가나다라 카페</span>
                        <div className='detailsWrapper'>
                            <span className='placeCate'>카페</span>
                            <span className='placeRate'>
                                <FontAwesomeIcon icon={ faStar } />
                            4.2(7,231)</span>
                        </div>
                    </div>
                    <div className='trouverRecommDetail'>
                        <img src={test} alt='장소관련 사진'/>
                        <span className='placeName'>애월 가나다라 카페</span>
                        <div className='detailsWrapper'>
                            <span className='placeCate'>카페</span>
                            <span className='placeRate'>
                                <FontAwesomeIcon icon={ faStar } />
                            4.2(7,231)</span>
                        </div>
                    </div>
                    <div className='trouverRecommDetail'>
                        <img src={test} alt='장소관련 사진'/>
                        <span className='placeName'>애월 가나다라 카페</span>
                        <div className='detailsWrapper'>
                            <span className='placeCate'>카페</span>
                            <span className='placeRate'>
                                <FontAwesomeIcon icon={ faStar } />
                            4.2(7,231)</span>
                        </div>
                    </div>
                    <div className='trouverRecommDetail moreBtn'>
                        <FontAwesomeIcon className='moreIcon' icon={faAnglesRight} size="2xl" style={{color: "#ffffff",}} />
                    </div>
                </div>
        </div>
    );
}


export default RecommProduct;