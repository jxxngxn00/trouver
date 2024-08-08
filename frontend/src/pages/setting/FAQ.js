import { ArrowDownOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { faQ, faA } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse } from 'antd-mobile';
import React from 'react';
import styled from 'styled-components';
import TopBtnBar from '../components/TopBtnBar';
const items = [
    {
        title: '다른 태그도 등록하고 싶어요.',
        contents: '새로운 카테고리 추가를 원하신다면 메일로 의견을 전달해주세요! 더욱 풍성한 여행정보 제공을 위해 노력하겠습니다 🥰',
    },
    {
        title: '막상 위치에 가보니 해당 장소가 없어요 / 달라요.',
        contents: '1:1 문의하기를 통해 접수해주세요 !',
    },
    {
        title: '일정을 편집 / 삭제하고 싶어요.',
        contents: '마이페이지 > 나의 일정 > 편집/삭제할 일정 클릭 > 일정 상세보기 하단 일정편집 클릭 > 편집 및 삭제 를 통해 가능합니다.',
    },
    {
        title: '회원 정보를 수정하거나 탈퇴하고 싶어요.',
        contents: '기능 준비중입니다.',
    },
    {
        title: '트루버와 협업하고 싶어요.',
        contents: '각종 광고 및 인터뷰, 협업 문의는 저희 트루버 메일을 통해 연락해주시면 감사하겠습니다. ( trouver00@gmail.com )',
    },

];
const FAQ = () => {
    // console.log(items);
    return (
        <div className='homeBgDiv ViewPlanBgDiv'>
            <TopBtnBar/>
            <CollapseWrapper>
                <Title>FAQ</Title>
                <Collapse className='collapse' defaultActiveKey={['0']}
                arrowIcon={active => (active ? <MinusOutlined /> : <PlusOutlined/>)}>
                    { items.map((item, idx) => (
                        <Collapse.Panel key={idx} 
                            title={
                                <span>
                                    <FontAwesomeIcon className='icon' icon={faQ} color='#007fe0'/>
                                    {item.title}
                                </span>
                            } 
                            arrowIcon={<ArrowDownOutlined />}
                        >
                            <FontAwesomeIcon className='icon' icon={faA} style={{color: "#ff3c1a",}} />
                            {item.contents}
                        </Collapse.Panel>
                    ))}
                </Collapse>
            </CollapseWrapper>
        </div>
    );
};
const Title = styled.span`
    margin-left: 3vw;
    font-family: 'Pretendart-ExtraBold';
    font-size: 1.75rem;
`;

const CollapseWrapper = styled.div`
    margin-top: 10vh;
    width: 100vw;
    text-align: left;
    & .icon { margin-right : 3vw ;}
    & .adm-collapse-panel-content-inner .adm-list-item-content-main {
        display: flex;
    }
`;
export default FAQ;