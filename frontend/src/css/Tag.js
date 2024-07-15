import styled from "styled-components";

export const CheckBoxInput = styled.input`
    display: none;
    position: relative;
    width: 1px;
    height: 1px;
    padding: 0;
    /* margin: -1; */
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space:nowrap;
    border: 0;

        &:checked+label{
        background-color: #45866B;
        color: white;
        }
`;

export const CheckBoxLabel = styled.label`
    padding: 0.2rem 0.7rem 0.2rem;
    cursor: pointer;
    border-radius: 2rem;
    background-color: #f2f4f6;
    font-size: 0.9rem;
    font-family: 'Pretendart-ExtraBold';
    color: #45866B;
    border: none;
`;
