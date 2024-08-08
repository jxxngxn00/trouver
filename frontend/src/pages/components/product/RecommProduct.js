import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faStar, faBookmark, faMapPin, faTags } from '@fortawesome/free-solid-svg-icons'
import { DotLoading, InfiniteScroll, List } from 'antd-mobile';
import axios from 'axios';
import { mockCateRequest } from '../viewplan/MockRequest';

import test from '../../../images/test.jfif';
function RecommProduct({cate}) {
    const navigate = useNavigate();
    const [places,  setPlaces] = useState([]);

    // eslint-disable-next-line
    const getPlaceList = async () => {
        // console.log(cate);
        try {
            if (!cate) {
                const res = await axios.get(`/api/place/getPlaceList5`);
                setPlaces(res.data);
                // console.log("none cate :",res.data);
            } else {
                const res = await axios.get(`/api/place/getPlaceListByCate5/${cate}`);
                setPlaces(res.data);
                // console.log(`${cate} :: `,res.data);
            }
            
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line
        getPlaceList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cate]);

    return (
        <div className='recommProduct'>
                <div className='title'><FontAwesomeIcon  className='titleIcon' icon={faPaperPlane} />트루버 추천 {cate}</div>
                <div className='imgSlider'>
                    {places.map((item) => {
                        return (
                            <div key={item.pla_id} className='trouverRecommDetail' onClick={() => navigate(`/viewproddetail/${item.pla_id}`)}>
                                <img src={item.pla_thumb} alt='장소관련 사진'/>
                                <span className='placeName'>{item.pla_name}</span>
                                <div className='detailsWrapper'>
                                    <span className='placeCate'>{item.pla_cate}</span>
                                    <span className='placeRate'>
                                        <FontAwesomeIcon icon={ faStar } />
                                    {item.pla_rate_avg}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
        </div>
    );
}

export const ProductList = ({cate}) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setData([]);
    },[cate]);

    const InfiniteScrollContent = ({ hasMore }) => {
        return (<>
            {hasMore ? ( <>
                <span>Loading</span>
                <DotLoading />
            </>) : (<span>오류 발생시, 문의하기를 통해 오류 상황을 알려주세요!</span>)}
        </>);
    };
    
    async function loadMore() {
        const append = await mockCateRequest(cate);
        setData( val => [...val, ...append]);
        // console.log('new data :: ', append);
        setHasMore(append.length > 0);
    };

    const handleNavigate = async (e, pla_id) => {
        try {
            axios.patch(`/api/place/updateHits/${pla_id}`);
            // console.log('Navigating to:', `/ViewPlanDetail/${plan_uuid}`); // 디버깅을 위해 로그 추가
            navigate(`/ViewProdDetail/${pla_id}`);
        } catch (error) {
            console.error('Error updating hits : ',error);
        }
    };

    return (
        <div className='contentsWrapper'>
            <List>
            {data.map((item, index) => (
                <List.Item key={index}>
                    <div key={index} className='contents' onClick={(e) => handleNavigate(e, item.pla_id)}>
                        <div className='imgWrapper'>
                            <img src={item.pla_thumb || test} alt="thumbnail" />
                        </div>
                        <div className='descWrapper'>
                            <div className='saved'>
                                <FontAwesomeIcon className='icon' icon={faBookmark} style={{ marginRight: 5, color: '#45866B'}}/>
                                {item.pla_saved}
                            </div>
                            <div className='planTitle'>
                                {item.pla_name}
                            </div>
                            <div className='detailsWrapper'>
                                <div className='detail'>
                                    <FontAwesomeIcon className="descicon" icon={faMapPin} size="sm" /> 
                                    {item.pla_addr1}
                                </div>
                                <div className='detail'>
                                    <FontAwesomeIcon className="descicon" icon={faStar} size="sm" /> 
                                    {item.pla_rate_avg}
                                </div>
                                <div className='detail tag'>
                                    <FontAwesomeIcon className="descicon" icon={faTags} size="sm" /> 
                                    {item.pla_tag}
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
    );
};

export default RecommProduct;