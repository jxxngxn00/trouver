import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Menu from '../components/Menu';
import { mockRequest } from '../components/viewplan/MockRequest';
import '../../css/plan.css'
import '../../css/customComponent.css'
import test from '../../images/test.jfif'

import SearchBox from '../components/SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faMapPin } from '@fortawesome/free-solid-svg-icons'
import { DotLoading, InfiniteScroll, List } from 'antd-mobile';
import axios from 'axios';

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

    const handleNavigate = async (e, plan_uuid) => {
        try {
            axios.patch(`/api/plan/updateHits/${plan_uuid}`);
            console.log('Navigating to:', `/ViewPlanDetail/${plan_uuid}`); // 디버깅을 위해 로그 추가
            navigate(`/ViewPlanDetail/${plan_uuid}`);
        } catch (error) {
            console.error('Error updating hits : ',error);
        }
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
                        <div key={index} className='contents' onClick={(e) => handleNavigate(e, item.plan_uuid)}>
                            <div className='imgWrapper'>
                                <img src={test} alt="thumbnail" />
                            </div>
                            <div className='descWrapper'>
                                <div className='saved'>
                                    <FontAwesomeIcon className='icon' icon={faBookmark} style={{ marginRight: 5, color: '#45866B'}}/>
                                    {item.plan_saved}
                                </div>
                                <div className='planTitle'>
                                    {item.plan_title}
                                </div>
                                <div className='detailsWrapper'>
                                    <div className='detail'>
                                        <FontAwesomeIcon className="descicon" icon={faMapPin} size="xs" /> 
                                        {item.count_routes} route
                                    </div>
                                    <div className='detail'>
                                        <FontAwesomeIcon className="descicon" icon={faMapPin} size="xs" /> 
                                         {item.plan_start} <br/> ~ {item.plan_end}
                                    </div>
                                    <div className='detail'>
                                        <FontAwesomeIcon className="descicon" icon={faMapPin} size="xs" /> 
                                         {item.plan_budget}
                                    </div>
                                    <div className='detail tag'>
                                        <FontAwesomeIcon className="descicon" icon={faMapPin} size="xs" /> 
                                         {item.plan_tag}
                                    </div>
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