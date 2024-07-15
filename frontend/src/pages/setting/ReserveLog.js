import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Dropdown, Radio, Space, Tabs } from 'antd-mobile';
import styled from 'styled-components';
import { faBullseye, faFan, faHouseUser, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Contents from '../components/Contents';
import TopBtnBar from '../components/TopBtnBar';
// 드롭다운 메뉴 
const items = [
    {
        label: '전체',
        key: '0',
        icon: <FontAwesomeIcon icon={faBullseye}/>,
        value: '0'
    },
    {
        label: '숙소',
        key: '1',
        icon: <FontAwesomeIcon icon={faHouseUser}/>,
        value: '1'
    },
    {
        label: '레저',
        key: '2',
        icon: <FontAwesomeIcon icon={faFan}/>,
        value: '2',
    },
    {
        label: '맛집',
        key: '3',
        icon: <FontAwesomeIcon icon={faUtensils}/>,
        value: '3',
    },
];

function ReserveLog() {
    const location = useLocation();
    const { state } = location;
    const [ dropdownVal, setDropDownVal ] = useState('');

    useEffect( () => {
        //eslint-disable-next-line
        setDropDownVal(items[state.message].label);
    },[]);

    const handleMenuChange = (value) => {
        // console.log(value);
        setDropDownVal(items[value].label);
    }

    return (
        <StyleDiv className='homeBgDiv ViewPlanBgDiv'>
            <TopBtnBar />
            <DropdownDiv className='dropdownDiv'>
                <div className='title'>예약 / 취소내역</div>
                <Dropdown className='dropdown'>
                    <Dropdown.Item key='sorter' title={ dropdownVal }>
                        <div style={{ padding:12 }}>
                            <Radio.Group defaultValue={ state.message } onChange={(value) => handleMenuChange(value)}>
                                <Space direction='vertical' block>
                                    { items.map((item) => (
                                        <Radio key={item.key} block value={item.value}>
                                            {item.icon} {item.label}
                                        </Radio>
                                    ))}
                                </Space>
                            </Radio.Group>
                        </div>
                    </Dropdown.Item>
                </Dropdown>
            </DropdownDiv>
            <TapDiv>
                <Tabs 
                    defaultActiveKey='1' 
                    className='tabs'
                >
                    <Tabs.Tab title='예약' key='1'>
                        {/* 예약 내역 나타내기 */}
                        <Contents/>
                    </Tabs.Tab>
                    <Tabs.Tab title='취소' key='2'>
                        {/* 예약 내역 나타내기 */}
                        <Contents/>
                    </Tabs.Tab>
                </Tabs>
            </TapDiv>
        </StyleDiv>
    );
};

const TapDiv = styled.div`
    width: 100vw;
    overflow: hidden;
    & .tabs {
        --active-line-color : #45866B ;
        --active-title-color : #45866b ;
    }
`;

const DropdownDiv = styled.div`
    /* align-items: flex-end !important; */
    width: 100%;
    margin-top: 7vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & .title { 
        margin-left: 5vw;
        font-family: 'Pretendart-ExtraBold';
        font-size: 1.33rem;
    }
    & .adm-dropdown-item {
        justify-content: flex-end !important;    
        margin-right: 5vw;
    }
`;

const StyleDiv = styled.div`
    align-items: none !important;
`;
export default ReserveLog;