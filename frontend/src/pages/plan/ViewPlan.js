import React from 'react';

import '../../css/plan.css'
import test from '../../images/test.jfif'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
function ViewPlan() {
    return (
        <div className='ViewPlanBgDiv'>
            <div className='search'>
                <form>
                    <input placeholder='알고 싶은 일정 키워드를 검색하세요.'></input>
                    <input type='submit'/>
                </form>
            </div>
            <div className='contentsWrapper'>

                <div className='contents'>
                    <div className='imgWrapper'>
                        <img src={test} alt="thumbnail"/>
                    </div>
                    <div className='descWrapper'>
                        <div className='planTitle'>Lorem ipsum</div>
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