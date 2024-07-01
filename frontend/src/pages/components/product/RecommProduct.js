import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faStar, faAnglesRight } from '@fortawesome/free-solid-svg-icons'

import test from '../../../images/test.jfif'
function RecommProduct({cate}) {
    const navigate = useNavigate();
    return (
        <div className='recommProduct'>
                <div className='title'><FontAwesomeIcon  className='titleIcon' icon={faPaperPlane} />트루버 추천 {cate}</div>

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