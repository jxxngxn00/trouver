import { ArrowDownOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { faQ, faA } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse } from 'antd-mobile';
import React from 'react';
import styled from 'styled-components';
import TopBtnBar from '../components/TopBtnBar';
const items = [
    {
        title: '질문 내용1',
        contents: '답변이 길어지면 어케 되나요?? 답변이 길어지면 어케 되나요?? 답변이 길어지면 어케 되나요?? 답변이 길어지면 어케 되나요?? 답변이 길어지면 어케 되나요?? 답변이 길어지면 어케 되나요?? 답변이 길어지면 어케 되나요?? 답변이 길어지면 어케 되나요?? 답변이 길어지면 어케 되나요?? ',
    },
    {
        title: '질문 내용2',
        contents: '답변 내용2',
    },
    {
        title: '질문 내용3',
        contents: '답변 내용3',
    },
    {
        title: '질문 내용4',
        contents: '답변 내용4',
    },
    {
        title: '질문 내용5',
        contents: '답변 내용5',
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
                            arrowIcon={<ArrowDownOutlined />}>
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