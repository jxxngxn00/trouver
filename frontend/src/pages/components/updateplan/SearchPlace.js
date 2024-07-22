import { Popover, Radio, SearchBar } from 'antd-mobile';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';
import { CheckCircleFilled, CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';


const SearchPlace = ({ route, setRoute }) => {
    const [value, setValue] = useState();
    const [search, setSearch] = useState('');
    const [tPlace, setTPlace] = useState();

    const getPlace5 = async () => {
        try {
            const res = await axios.get(`/api/place/getPlaceList5`)
            setTPlace(res.data);
            // console.log('>>> res.data : ' , res.data);
        } catch (error) {
            console.error("Error fetching product detail : ",error);
        }
    };

    const getPlaceBySearch = async (searchTerm) => {
        try {
            const res = await axios.get(`/api/place/getPlaceListBySearch/${searchTerm}`);
            setTPlace(res.data);
            // console.log('>>> res.data : ' , res.data);
        } catch (error) {
            console.error("Error fetching product detail : ",error);
        }
    };

    
    useEffect(() => {
        getPlace5();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <SearchDiv>
            <SearchBar
                placeholder='알고 싶은 장소를 검색하세요'
                onChange={(val) => {
                    setSearch(val);
                    getPlaceBySearch(val);
                }}
                onSearch={(val) => getPlaceBySearch(val)}
                clearable
            />
            <div className='placeWrapper'>
                <Radio.Group
                        value={value}
                        onChange={val => {
                            setValue(val);
                            setRoute(val);
                            console.log(val);
                        }}
                >
                { (!search) ?
                    (<>
                    {/* default 영역 */}
                    <PlaceDiv className='placeDiv'>
                        <span className='divTitle'>트루버 추천 장소
                            <Popover content={<>AI 추천으로 <br /> 나와 비슷한 유저들이 좋아하는 장소를 <br /> 추천해드려요.</>} trigger='click' placement='bottom'>
                                <InfoCircleOutlined className='infoPopupBtn' />
                            </Popover>
                        </span>
                        {tPlace?.map((item, index) => (
                            <PlaceCard key={index} className='placeCard'>
                                <img className='thumb' src={item.pla_thumb} alt="장소 썸네일" />
                                <InfoDiv className='infoDiv'>
                                    <div className='title'>{item.pla_name}</div>
                                    <div className='details'>
                                        <div className='cate'>{item.pla_cate}</div>
                                        <div className='rate'><FontAwesomeIcon icon={faStar} style={{ color: "#81C1A7", }} />{item.pla_rate}</div>
                                    </div>
                                </InfoDiv>

                                <Radio
                                    className='checkRadio'
                                    id={item.pla_id}
                                    value={item.pla_id}
                                    icon={checked => checked ? (<CheckCircleFilled style={{ color: '#45866B' }} />)
                                        : (<CheckCircleOutlined style={{ color: 'var(--adm-color-weak)' }} />)} 
                                />
                            </PlaceCard>
                        ))}
                    </PlaceDiv>
                    <PlaceDiv className='placeDiv'>
                        <span className='divTitle'>내가 저장한 장소</span>
                        
                    </PlaceDiv>
                    </>)
                    : (<> 
                    {/* 검색 결과 영역 */}
                    <PlaceDiv className='placeDiv'>
                            <span className='divTitle'>{search}의 검색결과</span>
                            {tPlace?.map((item, index) => (
                                <PlaceCard key={index} className='placeCard'>
                                    <img className='thumb' src={item.pla_thumb} alt="장소 썸네일" />
                                    <InfoDiv className='infoDiv'>
                                        <div className='title'>{item.pla_name}</div>
                                        <div className='details'>
                                            <div className='cate'>{item.pla_cate}</div>
                                            <div className='rate'><FontAwesomeIcon icon={faStar} style={{ color: "#81C1A7", }} />{item.pla_rate}</div>
                                        </div>
                                    </InfoDiv>

                                    <Radio
                                        className='checkRadio'
                                        id={item.pla_id}
                                        value={item.pla_id}
                                        icon={checked => checked ? (<CheckCircleFilled style={{ color: '#45866B' }} />)
                                            : (<CheckCircleOutlined style={{ color: 'var(--adm-color-weak)' }} />)} />
                                </PlaceCard>
                            ))}
                    </PlaceDiv>
                    </>)
                }
                </Radio.Group>
            </div>
        </SearchDiv>
    );
};

const SearchDiv = styled.div`
    width: 90vw;
    padding: 2vh 3vw;
    margin: 4.2vh auto;

    & .placeWrapper { 
        position: relative;
        overflow-y:scroll; 
        height: 70vh;
    }
`;

const PlaceDiv = styled.div`
    width: 90vw;
    display: flex;
    flex-direction: column;
    margin-top: 3.5vh;

    & .divTitle { 
        font-family: 'Pretendart-ExtraBold';
        font-size:1.5rem; 
        text-align: left;
        padding: 0vh 1.7vw;
    }

    & .infoPopupBtn { margin-left: 1vw; }
`;
const PlaceCard = styled.div`
    width: 97%;
    margin: 1vh auto;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    box-shadow: 0px 0px 3px #4e4e4e;
    border-radius: 15px;

    & img { width : 34vw; }

    & .checkRadio { margin-right: 3vw; }
`;

const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    & .title { 
        font-size: 1.2em;
        width: 40vw;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & .details {
        display: flex;
        justify-content: flex-start;
        gap: 3vw;
    }
`;

export default SearchPlace;