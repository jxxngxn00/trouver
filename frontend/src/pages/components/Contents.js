import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRequest } from './viewplan/MockRequest';
import test from '../../images/test.jfif'
import '../../css/plan.css'
import '../../css/customComponent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { DotLoading, InfiniteScroll, List } from 'antd-mobile';
import styled from 'styled-components';

const InfiniteScrollContent = ({ hasMore }) => {
    return (<>
        {hasMore ? ( <>
            <span>Loading</span>
            <DotLoading />
        </>) : (<span>결과 로딩중...</span>)}
    </>);
};

const Contents = () => {
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
        <ContentsWrapper className='contentsWrapper'>
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
        </ContentsWrapper>
    );
};
const ContentsWrapper = styled.div`
    justify-content: center !important;

    & .adm-list-item {
        padding-left: 0 !important;
    }
`;
export default Contents;