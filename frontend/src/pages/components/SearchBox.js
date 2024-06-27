import React, {useState} from 'react';

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
    return (
        <>
            < input
                type="search"
                name="input"
                className='input'
                id='search-input'
                placeholder='보고싶은 일정을 입력하세요'
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => activeEnter(e)}
            />
            {/* <button type='reset' className='search' id='search-btn' onkey={() => expand()}></button> */}
        </>
    );
}

export default SearchBox;