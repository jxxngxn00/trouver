import React from 'react';
import Contents from '../Contents';
import styled from 'styled-components';

const Plan = ({ user_id }) => {
    return (
        <Content className='ViewPlanBgDiv'>
            <Contents user_id={user_id}/>
        </Content>
    );
};

const Content = styled.div`
    width: 100% !important;
`;
export default Plan;