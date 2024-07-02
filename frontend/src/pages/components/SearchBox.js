import React, {useState} from 'react';
import styled from 'styled-components';

function SearchBox() {
    const [inputText, setInputText] = useState("");

    const activeButton = () => {
        alert(inputText); // 테스트
    };

    const activeEnter = (e) => {
        if(e.key === "Enter"){
            activeButton();
        }
    };

    const handleChange = (e) => {
        setInputText(e.target.value);
        console.log(e.target.value);
    };

    return (
        <>
            <SearchInput

                type="search"
                name="input"
                className='input'
                id='search-input'
                placeholder='검색어를 입력하세요'
                value={inputText || ''}
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) => activeEnter(e)}
            />
            {/* <button type='reset' className='search' id='search-btn' onkey={() => expand()}></button> */}
        </>
    );
}

const SearchInput = styled.input`
    z-index: 100000;
`;

export default SearchBox;