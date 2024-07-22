import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import '../css/product.css'

import CateMenu from './components/product/CateMenu';
import RecommProduct from './components/product/RecommProduct';
import Commercial from './components/Commercial';
import SearchBox from './components/SearchBox';
import Menu from './components/Menu';

function Product(props) {
    const [cate, setCate] = useState('');

    return (
        <>
        <Menu />
        <div className='bgProd homeBgDiv'>
            <div className='searchContainer'>
                <form>
                    <SearchBox />
                </form>
            </div>
            {/* 자체 추천 여행 상품 */}
            <RecommProduct/>
            {/* 광고 배너 */}
            <Commercial />
            {/* 카테고리 메뉴 */}
            <CateMenu cate={cate} setCate={setCate} />
            {/* 카테고리별 추천 상품 */}
            <RecommProduct cate={cate}/>
        </div>
        </>
    );
}

export default Product;