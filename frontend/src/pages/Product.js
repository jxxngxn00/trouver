import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import '../css/product.css'

import CateMenu from './components/product/CateMenu';
import RecommProduct from './components/product/RecommProduct';
import { ProductList } from './components/product/RecommProduct';
import Commercial from './components/Commercial';
import SearchBox from './components/SearchBox';
import Menu from './components/Menu';

function Product(props) {
    const [cate, setCate] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0);
    const cateMenu = useRef(null);

    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };
    useEffect(() => {
        window.addEventListener("scroll", updateScroll);
    },[]);

    useEffect(() => {
        cateMenu.current?.scrollIntoView({ behavior : 'smooth', block : 'start'});
    },[cate]);
    return (
        <>
        <Menu />
        <div className='bgProd homeBgDiv ViewPlanBgDiv'>
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
            <CateMenu cate={cate} setCate={setCate} scrollPosition={scrollPosition}/>
            {/* 카테고리별 상품 및 리스트 */}
            { cate && (
                <div className='cateContentDiv' ref={cateMenu}>
                    <RecommProduct cate={cate}/>
                    <ProductList cate={cate}/>
                </div>
            )}
            
            
        </div>
        </>
    );
}

export default Product;