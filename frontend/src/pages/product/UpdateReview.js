import React, { useState } from 'react';
import TopBtnBar from '../components/TopBtnBar';
import { CheckBoxInput, CheckBoxLabel } from '../../css/Tag';
import styled from 'styled-components';
import profile from '../../images/default_profile.png';
import { ImageUploader, Rate, TextArea, Modal } from 'antd-mobile';
import UseAnimations from 'react-useanimations';
import radioButton from 'react-useanimations/lib/radioButton';

import { sleep } from "antd-mobile/es/utils/sleep"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const mockUpload = async (file) => {
    await sleep(3000);
    return {
        url: URL.createObjectURL(file),
    };
}

const UpdateReview = () => {
    const userName = '도레미';
    const go = useNavigate();
    const [enteredRate, setEnteredRate] = useState();
    const [enteredTags, setEnteredTags] = useState([]);
    const [endteredCont, setEnteredConts] = useState("");
    const [enteredFile, setEnteredFile] = useState([]);

    const handleImageUpload = (val) => {
        setEnteredFile(val); 
    };

    const handleTagChange = () => {
        const checkedLabels = Array.from(document.querySelectorAll('.tagCheckBox input:checked'))
            .map(input => input.nextElementSibling.textContent);
        setEnteredTags(checkedLabels);
    }
    
    const handleSubmit = (e) => {
        // 페이지 리로드 방지
        e.preventDefault();

        const form = document.forms['reviewForm'];
        console.log(endteredCont);

        // state 결합 : 제출된 폼의 내용을 모두 담은 객체 생성
        const reviewData = {
            r_rate : enteredRate,
            r_img : enteredFile,
            r_tag : enteredTags,
            r_content : endteredCont,
        };
        console.log(reviewData);
        try {
            // DB에 formData 저장 
            axios.post(`/api/review/insertPlaceReview`, reviewData, {
                headers : {
                    "Context-Type" : "multipart/form-data",
                },
            });
            // 화면 이동 코드 
            saveConfirm();
        } catch (error) {
            console.error("Error fetching plan insert : ",error);
        }

        // 양방형 바인딩 : 입력 후 form에 적은 값 화면에서 없애기
        setEnteredRate(0);
        setEnteredFile([]);
        setEnteredTags([]);
        setEnteredConts("");

    };

    // 저장 완료 모달 팝업
    const saveConfirm = () => {
        Modal.alert({
        header: (
            <UseAnimations autoplay animation={radioButton} size={56} />
        ),
        title: "리뷰 저장 완료",
        content: "리뷰가 저장 및 업로드 되었습니다.",
        confirmText: "확인",
        closeOnMaskClick: true,
        onConfirm: () => go('/viewprodDetail/6491f54a-48f9-11ef-bcc9-af0a24947caf'),
        });
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
                        <Rate id="rate" className="rate" defaultValue={3} allowHalf allowClear={false} 
                            onChange = {val => setEnteredRate(val) }
                        />
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
                        ].map(tag => (
                            <div key={tag.id} className="tagCheckBox">
                                <CheckBoxInput type="checkbox" id={tag.id} name="tag" onChange={()=>handleTagChange()} />
                                <CheckBoxLabel htmlFor={tag.id}>{tag.label}</CheckBoxLabel>
                            </div>
                        ))}
                    </div>
                </KeywordDiv>

                <PhotoDiv className="photoDiv">
                    <span className="label">사진</span>
                    <ImageUploader id="img"
                        className='imageUploader'
                        value={enteredFile}        
                        onChange={
                            // setEnteredFile
                            (val) => {handleImageUpload(val);}
                        }
                        upload={mockUpload}
                        showUpload={enteredFile.length < 4}
                        maxCount={4}
                    />
                </PhotoDiv>
                <ReviewDiv className="reviewDiv">
                    <span className="label">리뷰 작성</span>
                    <TextArea className='textArea' id='content'
                        placeholder="리뷰를 작성해주세요."
                        showCount
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        onChange={(val) => {setEnteredConts(val)}}
                    />
                </ReviewDiv>
                <SubmitBtn className='submitBtn' block size='middle' onClick={() => handleSubmit}>
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

export default UpdateReview;
