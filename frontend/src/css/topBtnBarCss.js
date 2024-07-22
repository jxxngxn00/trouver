import styled from 'styled-components';

export const TopBarDiv = styled.div`
    & * {font-size: 1rem;}
    & .header {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 12345678;

        width: 90vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2vh 5vw;
        margin-bottom: 3vh;
        & .icon { font-size : 1.75rem; }
        & .btnDiv { display:flex; gap:3vw; }

    }

    & .original_header {
        background-color: rgba(0,0,0,0);
        transition: background-color 0.2s ease-out;
        & .icon { color: black; }
    }

    & .change_header {
        background-color: white;
        transition: background-color 0.2s ease-in;
        & .icon { color: black; }
    }
`;
