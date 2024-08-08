import React from 'react';
import { PlanBookmark, PlaceBookmark} from '../Contents';
import styled from 'styled-components';
import { CapsuleTabs } from 'antd-mobile';

const MySaved = ({ user_id }) => {
    // console.log("user_id:",user_id );
    return (
        <Content className='ViewPlanBgDiv'>
            <CapsuleTabs className='capsuleTabs'>
                <CapsuleTabs.Tab title='여행지' key='place' className='placeTab'>
                    { PlaceBookmark(user_id) }
                </CapsuleTabs.Tab>
                <CapsuleTabs.Tab title='일정' key='plan' className='planTab'>
                    { PlanBookmark(user_id) }
                </CapsuleTabs.Tab>
            </CapsuleTabs>
        </Content>
    );
};

const Content = styled.div`
    width: 100% !important;
    & .adm-capsule-tabs-header {
        width: 80vw;
        margin: auto;
    }

`;

export default MySaved;