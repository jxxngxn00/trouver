import React from 'react';
import Contents from '../Contents';
import styled from 'styled-components';

const MySaved = () => {
    return (
        <Content className='ViewPlanBgDiv'>
            <Contents/>
        </Content>
    );
};

const Content = styled.div`
    width: 100% !important;
`;

export default MySaved;