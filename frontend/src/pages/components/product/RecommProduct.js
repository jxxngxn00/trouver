import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faStar, faAnglesRight } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';
function RecommProduct({cate}) {
    const navigate = useNavigate();
    const [places,  setPlaces] = useState([]);

    // eslint-disable-next-line
    const getPlaceList = async () => {
        console.log(cate);
        try {
            if (!cate) {
                const res = await axios.get(`/api/place/getPlaceList5`);
                setPlaces(res.data);
                console.log("none cate :",res.data);
            } else {
                const res = await axios.get(`/api/place/getPlaceListByCate5/${cate}`);
                setPlaces(res.data);
                console.log(`${cate} :: `,res.data);
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
                    <div className='trouverRecommDetail moreBtn'>
                        <FontAwesomeIcon className='moreIcon' icon={faAnglesRight} size="2xl" style={{color: "#ffffff",}} />
                    </div>
                </div>
        </div>
    );
}

export default RecommProduct;