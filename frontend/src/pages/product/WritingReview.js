import React, { useState } from 'react';
import TopBtnBar from '../components/TopBtnBar';
import { CheckBoxInput, CheckBoxLabel } from '../../css/Tag';
import styled from 'styled-components';
import profile from '../../images/default_profile.png';
import { ImageUploader, Rate, TextArea } from 'antd-mobile';

const WritingReview = () => {
    const userName = '도레미';
    const [enteredRate, setEnteredRate] = useState();
    const [enteredFile, setEnteredFile] = useState("");
    const [enteredTags, setEnteredTags] = useState([]);
    const [endteredCont, setEnteredConts] = useState("");

    const handleSubmit = (e) => {
        // 페이지 리로드 방지
        e.preventDefault();
        const form = document.forms['reviewForm'];
        console.log(form.rate); 
        console.log(form.img);
        console.log(form.content.innerHTML);  
            
        // state 결합 : 제출된 폼의 내용을 모두 담은 객체 생성
        const reviewData = {
            r_rate : enteredRate,
            r_img : enteredFile,
            r_tag : enteredTags,
            r_content : endteredCont,
        };
        
        // 양방형 바인딩 : 입력 후 form에 적은 값 화면에서 없애기
        setEnteredRate(0);
        setEnteredFile("");
        setEnteredTags([]);
        setEnteredConts("");
    };
    return (
        <div className="homeBgDiv">
            <TopBtnBar />
            <form name="reviewForm" onSubmit={(event)=>handleSubmit(event)}>
                <StarRateDiv>
                    <div className="imgWrapper">
                        <img src={profile} alt="기본 프로필 사진" />
                    </div>
                    <div className="rateWrapper">
                        <span className="desc">{userName}님 이곳은 어떠셨나요?</span>
                        <Rate id="rate" className="rate" defaultValue={3} allowHalf allowClear={false} />
                    </div>
                </StarRateDiv>

                <KeywordDiv className="tagPicker">
                    <span className="tagQuest label">테마 키워드</span>
                    <div className="tagCheckBoxWrapper">
                        {[
                            { id: 'tag1', label: '쇼핑' },
                            { id: 'tag2', label: '스포츠' },
                            { id: 'tag3', label: '영화관람' },
                            { id: 'tag4', label: '감귤따기' },
                            { id: 'tag5', label: '맛집탐험' },
                            { id: 'tag6', label: '쇼핑' },
                            { id: 'tag7', label: '스포츠' },
                            { id: 'tag8', label: '영화관람' },
                            { id: 'tag9', label: '감귤따기' },
                            { id: 'tag10', label: '맛집탐험' }
                        ].map(tag => (
                            <div key={tag.id} className="tagCheckBox">
                                <CheckBoxInput type="checkbox" id={tag.id} name="tag" />
                                <CheckBoxLabel htmlFor={tag.id}>{tag.label}</CheckBoxLabel>
                            </div>
                        ))}
                    </div>
                </KeywordDiv>

                <PhotoDiv className="photoDiv">
                    <span className="label">사진</span>
                    <ImageUploader id="img"
                        className='imageUploader'
                    />
                </PhotoDiv>
                <ReviewDiv className="reviewDiv">
                    <span className="label">리뷰 작성</span>
                    <TextArea className='textArea' id='content'
                        placeholder="리뷰를 작성해주세요."
                        showCount
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </ReviewDiv>
                <SubmitBtn className='submitBtn' block type='submit' size='middle' onClick={() => handleSubmit}>
                    작성 완료
                </SubmitBtn>
            </form>
        </div>
    );
};
const SubmitBtn = styled.button`
    width : 80vw!important; 
    border: none;
    border-radius: 15px;
    background-color: #45866B;
    color:white;
    margin: 4vh auto;
`;

const StarRateDiv = styled.div`
    margin-top: 8vh;
    display: flex;
    gap: 4.5vw;
    justify-content: center;
    align-items: center;

    & .imgWrapper { 
        position: relative;
        width: 25vw; 
        height: 25vw;
        border-radius: 30px;
        overflow: hidden;

        & img { 
            height: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    & .rateWrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        & .desc { 
            font-size: 1rem; 
            margin-top: 0;
        }
    }
`;

const KeywordDiv = styled.div`
    margin-top: 5vh;
    width: 100vw;

    & .label { 
        display: block;
        color: black; 
        text-align: left; 
        padding-left: 10vw; 
        font-family: 'Pretendart-ExtraBold';
        font-size: 1.33rem;
    }

    & .tagCheckBoxWrapper {
        display: flex;
        flex-wrap: wrap;
    }

    & .tagCheckBox {
        margin-right: 2vw;
    }
`;

const PhotoDiv = styled(KeywordDiv)`
    & .imageUploader { 
        padding-left: 10vw; 
        margin-top: 1.7vh;
    }
`;
const ReviewDiv = styled(KeywordDiv)`
    & .textArea   {
        padding-left: 10vw; 
        margin-top: 1.7vh;
        width: 80vw;
    }

`;

export default WritingReview;
