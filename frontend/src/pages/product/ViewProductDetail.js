import React, {useState}  from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import test from '../../images/test.jfif'
function ViewProductDetail(props) {
    const imageData = [
        {
            label: "Image 1",
            alt: "image1",
            url: test
        },
        {
            label: "Image 2",
            alt: "image2",
            url: test
        },
        {
            label: "Image 3",
            alt: "image3",
            url: test
        },
    
    ];
    const [curIndex, setCurIndex] = useState(0);
    function handleChange(index){
        setCurIndex(index);
    }
    const renderSlides = imageData.map(image => {
        return(
            <div key={image.alt}>
                <img src={image.url} alt={image.alt} className='carouselImg'/>
            </div>
        );
        
    });


    return (
        <div className='bgProd homeBgDiv'>
            {/* 뒤로가기 버튼, 검색 버튼, 지도 버튼 */}
            {/* 이미지 스와이프 */}
            <div className='prodImgSlider'>
                <Carousel
                    className='imgCarousel'
                    showArrows={false}
                    dynamicHeight={true}
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    selectedItem={curIndex}
                    onChange={handleChange} >
                    {renderSlides}
                </Carousel>
            </div>
            {/* 타이틀 + 버튼 */}
            {/* 탭팬 : 업체정보, 상품정보, 상세설명, 리뷰 */}
            {/* 평점 */}

            {/* 팝업 : 옵션선택 */}
        </div>  
    );
}

export default ViewProductDetail;