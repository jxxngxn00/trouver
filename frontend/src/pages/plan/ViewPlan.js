import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Menu from '../components/Menu';
import { mockRequest } from '../components/viewplan/MockRequest';
import '../../css/plan.css'
import '../../css/customComponent.css'
import test from '../../images/test.jfif'

import SearchBox from '../components/SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { DotLoading, InfiniteScroll, List } from 'antd-mobile';

const InfiniteScrollContent = ({ hasMore }) => {
    return (<>
        {hasMore ? ( <>
            <span>Loading</span>
            <DotLoading />
        </>) : (<span>결과 로딩중...</span>)}
    </>);
};

function ViewPlan() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    async function loadMore() {
        const append = await mockRequest();
        setData( val => [...val, ...append]);
        setHasMore(append.length > 0);
    };

    const handleNavigate = (e) => {
        navigate('/ViewPlanDetail');
    };

    return (
        <>
        <Menu />
        <div className='homeBgDiv ViewPlanBgDiv'>
            <div className='searchContainer'>
                <form>
                    <SearchBox/>
                </form>
            </div>

            <div className='contentsWrapper'>
                <List>
                {data.map((item, index) => (
                    <List.Item key={index}>
                        <div key={index} className='contents' onClick={() => handleNavigate()}>
                            <div className='imgWrapper'>
                                <img src={test} alt="thumbnail" />
                            </div>
                            <div className='descWrapper'>
                                <div className='saved'>
                                    <FontAwesomeIcon className='icon' icon={faBookmark} style={{ marginRight: 5, color: '#45866B'}}/>
                                    999+
                                </div>
                                <div className='planTitle'>{item}, Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</div>
                                <div className='detailsWrapper'>
                                    <div className='router'>6 routes</div>
                                </div>
                            </div>
                        </div>
                    </List.Item>
                ))}
                </List>

                <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                    <InfiniteScrollContent hasMore={hasMore}/>
                </InfiniteScroll>
            </div>
        </div>
        </>
    );
}

export default ViewPlan;