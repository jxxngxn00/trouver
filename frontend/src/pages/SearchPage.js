import React from 'react';
import styled from 'styled-components';
import SearchBox from './components/SearchBox';
import History from './components/SearchHistory';
import { CheckBoxInput, CheckBoxLabel } from '../css/Tag';
import { Collapse } from 'antd-mobile';
import SearchTrend from './SearchTrend';

const SearchPage = () => {
    return (
        <BgDiv className='homeBgDiv ViewPlanBgDiv'>
            {/* 검색바 */}
            <div className='searchContainer'>
                <form>
                    <SearchBox/>
                </form>
            </div>
            {/* 나의 검색 기록 */}
            <SearchLogDiv>
                <span className='title'>최근 검색어</span>
                <History/>
            </SearchLogDiv>
            {/* 요즘 많이 찾는 키워드 top5 */}
            <TrendSearchDiv>
                <span className='title'>요즘 많이 찾는 검색어</span>
                <SearchTrend/>
            </TrendSearchDiv>
            {/* 필터 검색 */}
            <Collapse className='collapse'>
                <Collapse.Panel key='1' className='collapse' title='필터로 검색하기'>
                    {/* 지역별 핫스팟 */}
                    <KeywordDiv className="tagPicker">
                        <span className="tagQuest label">지역별 핫스팟</span>

                        <div className="tagCheckBoxWrapper">
                            {[
                                { id: 'area1', label: '전체' },
                                { id: 'area2', label: '동부' },
                                { id: 'area3', label: '서부' },
                                { id: 'area4', label: '남부' },
                                { id: 'area5', label: '북부' },
                            ].map(tag => (
                                <div key={tag.id} className="tagCheckBox">
                                    <CheckBoxInput type="checkbox" id={tag.id} name="tag" />
                                    <CheckBoxLabel htmlFor={tag.id}>{tag.label}</CheckBoxLabel>
                                </div>
                            ))}
                            
                        </div>
                    </KeywordDiv>
                    {/* 테마 키워드 */}
                    <KeywordDiv className="tagPicker">
                        <span className="tagQuest label">테마 키워드</span>
                        <div className="tagCheckBoxWrapper">
                            {[
                                { id: 'tag1', label: '쇼핑' },
                                { id: 'tag2', label: '스포츠' },
                                { id: 'tag3', label: '영화관람' },
                                { id: 'tag4', label: '감귤따기' },
                                { id: 'tag5', label: '테마여행' },
                                { id: 'tag6', label: '쇼핑' },
                                { id: 'tag7', label: '스포츠' },
                                { id: 'tag8', label: '영화관람' },
                                { id: 'tag9', label: '감귤따기' },
                                { id: 'tag10', label: '맛집탐험' }
                            ].map(tag => (
                                <div key={tag.id} className="tagCheckBox">
                                    <CheckBoxInput type="checkbox" id={tag.id} name="tag" />
                                    <CheckBoxLabel htmlFor={tag.id}>{tag.label}</CheckBoxLabel>
                                </div>
                            ))}
                        </div>
                    </KeywordDiv>
                </Collapse.Panel>
            </Collapse>
        </BgDiv>
    );
};
const BgDiv = styled.div`
    & .collapse { 
        text-align : left; 
        width: 100vw;
        /* padding-right: 5vw; */
    }

    & .collapse::before {
        text-align: left;
        width: 100vw;
    }
`;
const KeywordDiv = styled.div`
    margin-top: 1vh;
    width: 100vw;

    & .label { 
        display: block;
        color: black; 
        text-align: left; 
        font-family: 'Pretendart-ExtraBold';
        /* font-size: 0.8rem; */
    }

    & .tagCheckBoxWrapper {
        display: flex;
        flex-wrap: wrap;
        width: 92vw;
    }
`;
const SearchLogDiv = styled.div`
    & .title {
        width: 90vw;
        display: block;
        text-align: left;
        margin: 5vw 1.5vh;

        font-family: 'Pretendart-ExtraBold';
    }
`;
const TrendSearchDiv = styled(SearchLogDiv)``;
export default SearchPage;