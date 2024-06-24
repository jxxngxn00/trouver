import React from 'react';

import '../../css/plan.css'
function ViewPlan(props) {
    return (
        <div className='ViewPlanBgDiv'>
            <div className='search'>
                <form>
                    <input></input>
                </form>
            </div>
            <div className='contentsWrapper'>

                <div className='contents'>
                    <div className='imgWrapper'>
                    </div>
                    <div className='descWrapper'>
                        <div className='title'></div>
                        <div className='router'></div>
                        <div className='saved'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPlan;