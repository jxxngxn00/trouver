import React from 'react';
import TopBtnBar from '../components/TopBtnBar';
import { CheckBoxInput, CheckBoxLabel } from '../../css/Tag';
import styled from 'styled-components';
import profile from '../../images/default_profile.png';
import { Button, Form, ImageUploader, Rate, TextArea } from 'antd-mobile';

const WritingReview = () => {
    const userName = '도레미';
    return (
        <div className="homeBgDiv">
            <TopBtnBar />

            <form>
                <StarRateDiv>
                    <div className="imgWrapper">
                        <img src={profile} alt="기본 프로필 사진" />
                    </div>
                    <div className="rateWrapper">
                        <span className="desc">{userName}님 이곳은 어떠셨나요?</span>
                        <Rate className="rate" defaultValue={3} allowHalf allowClear={false} />
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
                    <ImageUploader
                        className='imageUploader'
                />
                </PhotoDiv>
                <ReviewDiv className="reviewDiv">
                    <span className="label">리뷰 작성</span>
                    <TextArea className='textArea'
                        placeholder="리뷰를 작성해주세요."
                        showCount
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </ReviewDiv>
                <SubmitBtn className='submitBtn' block type='submit' size='middle'>
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
