import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import '../css/product.css'

import CateMenu from './components/hotspot/CateMenu';
import RecommProduct from './components/hotspot/RecommProduct';
import Commercial from './components/Commercial';
import SearchBox from './components/SearchBox';
function HotSpot(props) {
    const [cate, setCate] = useState();

    return (
        <div className='bgProd homeBgDiv'>
            <div className='searchContainer'>
                <form>
                    <SearchBox/>
                </form>
            </div>
            {/* 카테고리 메뉴 */}
            <CateMenu cate={cate} setCate={setCate}/>
            {/* 광고 배너 */}
            <Commercial/>
            {/* 카테고리별 추천 상품 */}
            <RecommProduct/>
        </div>
    );
}

export default HotSpot;