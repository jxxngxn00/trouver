import React, { useEffect, useState } from 'react';
import TopBtnBar from '../components/TopBtnBar';
import { CheckBoxInput, CheckBoxLabel } from '../../css/Tag';
import styled from 'styled-components';
import { ImageUploader, Rate, TextArea, Modal } from 'antd-mobile';
import UseAnimations from 'react-useanimations';
import radioButton from 'react-useanimations/lib/radioButton';

import { sleep } from "antd-mobile/es/utils/sleep"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const mockUpload = async (file) => {
    await sleep(3000);
    return {
        url: URL.createObjectURL(file),
    };
}

const UpdateReview = () => {
    const userName = '도레미';
    const go = useNavigate();
    const [enteredPlaceId, setEnteredPlaceId] = useState("");
    const [enteredPlaceName, setEnteredPlaceName] = useState("");
    const [enteredPlaceImg, setEnteredPlaceImg] = useState("");
    const [enteredPlaceAddr, setEnteredPlaceAddr] = useState("");
    const [enteredRate, setEnteredRate] = useState();
    const [enteredTags, setEnteredTags] = useState([]);
    const [endteredCont, setEnteredConts] = useState("");
    const [enteredFile, setEnteredFile] = useState([]);
    const plaRid = useParams().plaRid;

    const getPlaceReviewDetail = async () => {
        try {
            const res = await axios.get(`/api/review/getPlaceReviewDetail/${plaRid}`);
            const result = res.data[0];
            const review = {
                plaId : result.pla_id,
                plaName : result.pla_name,
                plaThumb : result.pla_thumb,
                plaAddr : result.pla_addr,
                plaRuuid: result.pla_r_uuid,
                userUuid: result.user_uuid,
                plaRimg: result.pla_r_img,
                plaRdate: result.pla_r_date,
                plaRrate: result.pla_r_rate,
                plaRtag: result.pla_r_tag,
                plaRcont: result.pla_r_content,
            };
            
            return review;
        } catch (error) {
            console.error("Error fetching product detail : ",error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await getPlaceReviewDetail();
            console.log(res);
            if (res) {
                setEnteredPlaceId(res.plaId);
                setEnteredPlaceName(res.plaName);
                setEnteredPlaceImg(res.plaThumb);
                setEnteredPlaceAddr(res.plaAddr);

                setEnteredRate(res.plaRrate);
                const defaultCheckedTags = res.plaRtag?.split('/');
                setEnteredTags(defaultCheckedTags || []);
                setEnteredConts(res.plaRcont);

                const imgs = res.plaRimg?.split('|');
                const imgsJson = imgs.map((item) => {
                    return { url : item }
                })
                console.log("imgs : ",imgsJson);
                setEnteredFile(imgsJson || []);

                // 저장된 Tag input 설정
                defaultCheckedTags?.forEach(tag => {
                    const checkbox = document.querySelector(`input[name="tag"][value="${tag}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            }
        };
        fetchData();
        // eslint-disable-next-line
    },[]);



    const handleImageUpload = (val) => {
        setEnteredFile(val); 
    };

    const handleTagChange = () => {
        const checkedLabels = Array.from(document.querySelectorAll('.tagCheckBox input:checked'))
            .map(input => input.nextElementSibling.textContent);
        setEnteredTags(checkedLabels);
    }
    
    const resetCheckboxes = () => {
        document.querySelectorAll('.tagCheckBox input:checked').forEach(input => {
            input.checked = false;
        });
        setEnteredTags([]);
    };

    const handleSubmit = (e) => {
        // 페이지 리로드 방지
        e.preventDefault();
        // state 결합 : 제출된 폼의 내용을 모두 담은 객체 생성
        const reviewData = {
            r_id : plaRid,
            r_rate : enteredRate,
            r_img : enteredFile,
            r_tag : enteredTags,
            r_content : endteredCont,
        };

        try {
            // DB에 formData 저장 
            axios.patch(`/api/review/updatePlaceReview`, reviewData, {
                headers : {
                    "Context-Type" : "multipart/form-data",
                },
            });
            // 화면 이동 모달 팝업
            saveConfirm();
        } catch (error) {
            console.error("Error fetching plan insert : ",error);
        }

        // 양방형 바인딩 : 입력 후 form에 적은 값 화면에서 없애기
        setEnteredRate(0);
        setEnteredFile([]);
        resetCheckboxes();
        setEnteredConts("");

    };

    // 수정 완료 모달 팝업
    const saveConfirm = () => {
        Modal.alert({
        header: (
            <UseAnimations autoplay animation={radioButton} size={56} />
        ),
        title: "리뷰 수정 완료",
        content: "리뷰가 수정 및 업로드 되었습니다.",
        confirmText: "확인",
        closeOnMaskClick: true,
        onConfirm: () => go(`/viewprodDetail/${enteredPlaceId}`),
        });
    };

    return (
        <div className="homeBgDiv">
            <TopBtnBar />
            <form name="reviewForm" onSubmit={(event)=>handleSubmit(event)}>
                <StarRateDiv>
                    <div className="imgWrapper">
                        <img src={enteredPlaceImg} alt="장소 사진" />
                    </div>
                    <div className="rateWrapper">
                        <span className="title">{enteredPlaceName}</span>
                        <span className="addr">{enteredPlaceAddr}</span>
                        <span className="desc">{userName}님 이곳은 어떠셨나요?</span>
                        <Rate id="rate" className="rate" defaultValue={3} allowHalf allowClear={false} 
                            value={enteredRate} onChange = {val => setEnteredRate(val) }
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
                        value={endteredCont}
                        onChange={(val) => {setEnteredConts(val)}}
                    />
                </ReviewDiv>
                <SubmitBtn className='submitBtn' block size='middle' onClick={() => handleSubmit}>
                    수정 완료
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
        text-align: left;
        width: 52vw;
        & .title {
            font-size: 1.35em;
            font-family: 'Pretendart-ExtraBold';
        }

        & .addr {
            font-size: 0.7em;
            color : #adadad;
        }

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
