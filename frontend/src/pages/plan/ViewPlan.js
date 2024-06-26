import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/plan.css'
import test from '../../images/test.jfif'

import SearchBox from '../components/SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
function ViewPlan() {
    const navigate = useNavigate();

    return (
        <div className='ViewPlanBgDiv'>

            <div className='searchContainer'>
                <form>
                    <SearchBox/>
                </form>
            </div>

            <div className='contentsWrapper'>
                <div className='contents' onClick={()=>{navigate('/ViewPlanDetail')}}>
                    <div className='imgWrapper'>
                        <img src={test} alt="thumbnail"/>
                    </div>
                    <div className='descWrapper'>
                        <div className='planTitle'>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</div>
                        <div className='detailsWrapper'>
                            <div className='router'>6 routes</div>
                            <div className='saved'>
                                <FontAwesomeIcon className='icon' icon={faBookmark}/>
                                999+
                            </div>
                        </div>
                    </div>
                </div>

                <div className='contents' onClick={()=>{navigate('/ViewPlanDetail')}}>
                    <div className='imgWrapper'>
                        <img src={test} alt="thumbnail"/>
                    </div>
                    <div className='descWrapper'>
                        <div className='planTitle'>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</div>
                        <div className='detailsWrapper'>
                            <div className='router'>6 routes</div>
                            <div className='saved'>
                                <FontAwesomeIcon className='icon' icon={faBookmark}/>
                                999+
                            </div>
                        </div>
                    </div>
                </div>

                <div className='contents' onClick={()=>{navigate('/ViewPlanDetail')}}>
                    <div className='imgWrapper'>
                        <img src={test} alt="thumbnail"/>
                    </div>
                    <div className='descWrapper'>
                        <div className='planTitle'>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</div>
                        <div className='detailsWrapper'>
                            <div className='router'>6 routes</div>
                            <div className='saved'>
                                <FontAwesomeIcon className='icon' icon={faBookmark}/>
                                999+
                            </div>
                        </div>
                    </div>
                </div>

                <div className='contents' onClick={()=>{navigate('/ViewPlanDetail')}}>
                    <div className='imgWrapper'>
                        <img src={test} alt="thumbnail"/>
                    </div>
                    <div className='descWrapper'>
                        <div className='planTitle'>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</div>
                        <div className='detailsWrapper'>
                            <div className='router'>6 routes</div>
                            <div className='saved'>
                                <FontAwesomeIcon className='icon' icon={faBookmark}/>
                                999+
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ViewPlan;