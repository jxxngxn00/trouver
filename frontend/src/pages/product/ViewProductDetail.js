import React, {useState, useRef, useEffect}  from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faBookmark as filledBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import TopBtnBar from '../components/TopBtnBar';
import { CarryOutOutlined, EditOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Divider, Toast } from 'antd-mobile';
import { useNavigate, useParams } from 'react-router-dom';
import UseAnimations from 'react-useanimations';
import bookmark from 'react-useanimations/lib/bookmark';
import plusToX from 'react-useanimations/lib/plusToX';
import Review from '../components/Review';
import Menu from '../components/Menu';

function ViewProductDetail(props) {
    const go = useNavigate();
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState("");
    const [curIndex, setCurIndex] = useState(0);
    const [reviews, setReviews] = useState([]);

    function handleChange(index){
        setCurIndex(index);
    };

    const getPlace = async () => {
        try {
            const res = await axios.get(`/api/place/getPlace/${id}`);
            setProductDetail(res.data);
        } catch (error) {
            console.error("Error fetching product detail : ",error);
        }
    };

    const getPlaceReview = async () => {
        try {
            const res = await axios.get(`/api/review/getPlaceReview/${id}`);
            setReviews(res.data);
        } catch (err) {
            console.error("Error fetching place review : ",err);
        }
    }

    useEffect(() => {
        getPlace();
        getPlaceReview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    /* 이미지 슬라이드 */
    const imageData = [
        {
            label: "thumb",
            alt: productDetail[0]?.pla_name,
            url: productDetail[0]?.pla_thumb
        },
        {
            label: "image",
            alt: productDetail[0]?.pla_name,
            url: productDetail[0]?.pla_image
        }
    ];



    const renderSlides = imageData.map(image => {
        return(
            <div key={image.alt}>
                <img src={image.url} alt={image.alt} className='carouselImg'/>
            </div>
        );
        
    });

    /* Tab Pane 기능 */
    const tabData = [
        { 
            id: 0,
            title: "업체정보",
            class: 'business',
            content: productDetail[0]?.pla_phone,
        },
        { 
            id: 1,
            title: "상품정보",
            class: 'info',
            content: productDetail[0]?.pla_image,
        },
        { 
            id: 2,
            title: "상세설명",
            class: 'description',
            content: productDetail[0]?.pla_content,
        },
        { 
            id: 3,
            title: "리뷰",
            class: 'review',
            content: (<Review reviews={reviews}/>)
        }
    ];

    const [currTab, setCurrTab] = useState(0);

    const targetRefs = useRef([]);

    const handleTabClick = (index) => {
        setCurrTab(index);
        targetRefs.current[index].scrollIntoView({ behavior : 'smooth' });
    };

    // 모아보기 저장 토글
    const [saved, setSaved] = useState(false);
    const handleSaved = () => {
        if (saved) {
            Toast.show({
                icon:(<UseAnimations className='toastIcon' 
                    strokeColor='white'
                    fillColor='white' 
                    animation={plusToX} size={56} 
                    autoplay
                    wrapperStyle={{ margin:'auto' }}
                    />),
                content:'모아보기에서 해제되었어요!',
                duration: 1200,
            });
        } else {
            Toast.show({
                icon:(<UseAnimations className='toastIcon' 
                    strokeColor='white'
                    fillColor='white' 
                    animation={bookmark} size={56} 
                    autoplay 
                    wrapperStyle={{ margin:'auto' }}/>),
                content:'책갈피에 저장되었어요!',
                duration: 1200,
            });
        }
        setSaved(!saved)
    }

    return (
        <div className='bgProd homeBgDiv'>
            <Menu/>
            {/* 뒤로가기 버튼, 검색 버튼, 지도 버튼 */}
            <TopBtnBar/>
            {/* 이미지 스와이프 */}
            <div className='prodImgSlider'>
                <Carousel
                    className='imgCarousel'
                    showArrows={false}
                    showStatus={false}
                    dynamicHeight={true}
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    swipeable={true}
                    selectedItem={curIndex}
                    onChange={handleChange} >
                    {renderSlides}
                </Carousel>
            </div>
            {/* 타이틀 + 버튼 */}
            <TitleDiv>
                <span className='cate'>{productDetail[0]?.pla_cate}</span>
                <span className='title'>{productDetail[0]?.pla_name}</span>
                <span className='addr'><FontAwesomeIcon icon={faLocationDot} />{productDetail[0]?.pla_addr1}</span>
                {/* <span className='price'>178,000원 ~</span> */}
                <Divider/>
                <ButtonDiv>
                    <button className='prodBtn' onClick={() => handleSaved()}>
                        { saved ? (<FontAwesomeIcon className='icon' icon={filledBookmark}/>) : (<FontAwesomeIcon className='icon' size="2xl" icon={faBookmark} />)}
                        모아보기
                    </button>
                    <button className='prodBtn'>
                        {/* <FontAwesomeIcon className='icon' size='2xl' icon={faCalendarPlus} /> */}
                        <CarryOutOutlined className='icon' />
                        일정추가
                    </button>
                    <button className='prodBtn' onClick={() => go('/makeReview')}>
                        <EditOutlined className='icon'/>
                        리뷰쓰기
                    </button>
                    <button className='prodBtn'>
                        <ShareAltOutlined className='icon' />
                        공유하기
                    </button>
                </ButtonDiv>
                
                <div className='line'></div>
            </TitleDiv>
            {/* 탭팬 : 업체정보, 상품정보, 상세설명, 리뷰 */}
            <TabPane>
                <ul className='tabMenu'>
                    {tabData.map(item => (
                        <li
                            key={item.id}
                            className={currTab === item.id ? 'tabMenuBtn active' :  'tabMenuBtn'}
                            onClick={() => handleTabClick(item.id) }>
                        {item.title}
                        </li>
                    ))}
                </ul>
                <div className='line'></div>
            </TabPane>
            {tabData.map(item => (
                <TabCont
                    key={item.id}
                    className={item.class}
                    ref={(el) => (targetRefs.current[item.id] = el)}
                >
                    {/* 업체정보 */}
                    {item.id ===0 ? (
                        <div>
                            <h2>연락처 : {item.content}</h2>
                        </div>
                    ) : null}
                    {/* 상품정보 */}
                    {item.id ===1 ? (
                        <div>
                            <img className='contImg' src={item.content} alt='상세설명 이미지'/>
                        </div>
                    ) : null}
                    {/* 상세설명 */}
                    {item.id ===2 ? (
                        <div>
                            <h2>{item.content}</h2>
                        </div>
                    ) : null}
                    {/* 리뷰 */}
                    {item.id ===3 ? (
                        <div>
                            {item.content}
                        </div>
                    ) : null}
                </TabCont>
            ))}
        </div>  
    );
}

const TitleDiv = styled.div`
    position: relative;
    width: 100vw;

    & span {
        display: block;
        padding-left: 5vw;
        margin-bottom: 1vh;
    }

    & .cate, .title, .addr { text-align: left; }
    & .price { text-align:right; padding-right : 5vw; font-size:1.5rem; }
    & .title { font-size: 2rem!important; }
    & .addr { color : gray; }
    & .line {
        width: 100vw;
        height: 1vh;
        background-color: rgb(235 247 242);
    }
`;

const ButtonDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 0vh 0vw 2vh 0vw;
    & .prodBtn {
        width: 23vw;
        background-color: white;

        display: flex;
        flex-direction: column;
        gap: 0.5vh;
        align-items: center;
        justify-content: space-between;

        border: none;
        border-radius: 15px;

        margin-top: 0 !important;
        font-size: 0.8rem;
        & .icon {
            padding-left: 0vw !important;
        }
        & svg { width: 8vw; height: 8vw; }
    }
`;

const TabPane = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 3rem;
    background: white;
    z-index: 1000;

    & .tabMenu {
        margin: 0 0 2vh ;
        padding-top: 2vh;
        padding-left : 0;
        display: flex;
        justify-content: space-evenly;
        &:hover {
            cursor: pointer;
        }
    }

    & .tabMenuBtn {
        /* font-family: 'Pretendart-ExtraBold'; */
        list-style: none;
        font-size: 1.2rem;
        
    }
    & .line {
        width: 80vw;
        height: 0.1vh;
        background-color: rgb(180 199 191);
        margin: auto;
    }
`;

const TabCont = styled.div`
    width: 100vw;
    min-height: 2vh;
    padding-top: 3vh;
    background: rgb(255,255,255);
    & .contImg {
        width: 100vw;
    }
`;

export default ViewProductDetail;