import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { mockMyPlan, mockMyPlanBookmark, mockMyPlaceBookmark } from './viewplan/MockRequest';
import test from '../../images/test.jfif'
import '../../css/plan.css'
import '../../css/customComponent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faMapPin } from '@fortawesome/free-solid-svg-icons'
import { DotLoading, InfiniteScroll, List } from 'antd-mobile';
import styled from 'styled-components';

const InfiniteScrollContent = ({ hasMore }) => {
    return (<>
        {hasMore ? ( <>
            <span>Loading</span>
            <DotLoading />
        </>) : (<span>오류 발생시 새로고침하거나, 1:1 문의를 통해 알려주세요!</span>)}
    </>);
};

const Contents = ({user_id}) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    async function loadMore() {
        const append = await mockMyPlan(user_id);
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
        </>
    );
};

export function PlanBookmark(user_id) {
    const navigate = useNavigate();
    const [placeData, setPlaceData] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    async function loadMore() {
        const append = await mockMyPlanBookmark(user_id);
        setPlaceData(val => [...val, ...append]);
        setHasMore( append.length > 0 );
    };


    const handleNavigate = async (e, plan_uuid) => {
        try {
            axios.patch(`/api/plan/updateHits/${plan_uuid}`);
            console.log('Navigating to:', `/ViewPlanDetail/${plan_uuid}`); // 디버깅을 위해 로그 추가
            navigate(`/ViewPlanDetail/${plan_uuid}`);
        } catch (error) {
            console.error('Error updating hits : ', error);
        }
    };

    return (
        <>
            <div className='contentsWrapper'>
                <List>
                    {placeData.map((item, index) => (
                        <List.Item key={index}>
                            <div key={index} className='contents' onClick={(e) => handleNavigate(e, item.plan_uuid)}>
                                <div className='imgWrapper'>
                                    <img src={test} alt="thumbnail" />
                                </div>
                                <div className='descWrapper'>
                                    <div className='saved'>
                                        <FontAwesomeIcon className='icon' icon={faBookmark} style={{ marginRight: 5, color: '#45866B' }} />
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
                                            {item.plan_start} <br /> ~ {item.plan_end}
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
                    <InfiniteScrollContent hasMore={hasMore} />
                </InfiniteScroll>
            </div>
        </>
    );
};

export function PlaceBookmark(user_id) {
    const navigate = useNavigate();
    const [placeData, setPlaceData] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    async function loadMore() {
        const append = await mockMyPlaceBookmark(user_id);
        setPlaceData(val => [...val, ...append]);
        setHasMore(append.length > 0);
    };


    const handleNavigate = async (e, pla_uuid) => {
        try {
            axios.patch(`/api/place/updateHits/${pla_uuid}`);
            console.log('Navigating to:', `/ViewProdDetail/${pla_uuid}`); // 디버깅을 위해 로그 추가
            navigate(`/ViewProdDetail/${pla_uuid}`);
        } catch (error) {
            console.error('Error updating hits : ', error);
        }
    };

    return (
        <>
            <div className='contentsWrapper'>
                <List>
                    {placeData.map((item, index) => (
                        <List.Item key={index}>
                            <div key={index} className='contents' onClick={(e) => handleNavigate(e, item.pla_uuid)}>
                                <div className='imgWrapper'>
                                    <img src={test} alt="thumbnail" />
                                </div>
                                <div className='descWrapper'>
                                    <div className='saved'>
                                        <FontAwesomeIcon className='icon' icon={faBookmark} style={{ marginRight: 5, color: '#45866B' }} />
                                        {item.pla_saved}
                                    </div>
                                    <div className='planTitle'>
                                        {item.pla_name}
                                    </div>
                                    <div className='detailsWrapper'>
                                        <div className='detail'>
                                            <FontAwesomeIcon className="descicon" icon={faMapPin} size="xs" />
                                            {item.pla_addr1}
                                        </div>
                                        <div className='detail tag'>
                                            <FontAwesomeIcon className="descicon" icon={faMapPin} size="xs" />
                                            {item.pla_tag}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </List.Item>
                    ))}
                </List>

                <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                    <InfiniteScrollContent hasMore={hasMore} />
                </InfiniteScroll>
            </div>
        </>
    );
}
// eslint-disable-next-line
const ContentsWrapper = styled.div`
    justify-content: center !important;
    & .adm-list-item {
        padding-left: 0 !important;
    }
`;
export default Contents;