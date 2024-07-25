import React, { useState } from 'react';
import styled from 'styled-components';

import test from '../../images/test.jfif';
import { Divider, Rate, ImageViewer, Modal } from 'antd-mobile';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Review = ({ reviews, id }) => {
  const [visible, setVisible] = useState(false);
  const user_uuid = "0eb6e69c-47cc-11ef-b3c9-7085c2d2eea0";
  const go = useNavigate();

  
    // 삭제 전 경고 모달 팝업
    const warning = (review_id) => {
        Modal.alert({
        header: (
            <ExclamationCircleFilled
            style={{
                fontSize: `2rem`,
                color: "var(--adm-color-warning)",
            }}
            />
        ),
        title: "일정 삭제",
        content: (
            <>
            <div> 일정을 정말 삭제할까요? </div>
            <div> 삭제된 일정은 복구하기 어렵습니다! </div>
            </>
        ),
        showCloseButton: true,
        confirmText: "삭제하기",
        onConfirm: async () => {
            axios.patch(`/api/review/deletePlaceReview/${review_id}`);
            deletAlert();
        },
        });
    };

    // 삭제 완료 모달 팝업
    const deletAlert = async () => {
        Modal.alert({
        header: (
            <CheckCircleFilled
            style={{
                fontSize: `64pt`,
                color: "var(--adm-color-confirm)",
            }}
            />
        ),
        title: "삭제 완료",
        content: "정상적으로 삭제되었습니다.",
        confirmText: "확인",
        closeOnMaskClick: true,
        onConfirm: () => {
            window.location.reload();
        },
        });
    };
    return (
        <div>
            <TitleSpan className='title'>네이버 블로그 리뷰</TitleSpan>
            <BlogReviewWrapper>
                {[...Array(10)].map((index)=> (
                    <BlogReviewDiv key={index}>
                        <img className='thumb' src={test} alt="썸네일"/>
                        <BlogInfo>
                            <span className='blogTitle content'>블로그 이름</span>
                            <div className='blogContent content'>블로그 내용 블로그 내용 블로그 내용 블로그 내용 블로그 내용 블로그 내용 </div>
                        </BlogInfo>
                    </BlogReviewDiv>
                ))}
            </BlogReviewWrapper>

            <Divider/>
            <TitleSpan className='title'>구글 평점</TitleSpan>
            {/* api data 형식 확인 후 디자인 / 프론트 작업 진행 계획 */}
            <Divider/>

            <TitleSpan className='title'>트루버 리뷰</TitleSpan>
            {/* // eslint-disable-next-line */}
            { reviews.map ((review, idx) => {
                // eslint-disable-next-line
                if (review.pla_r_is_deleted) return;
                return(
                <ReviewWrapper key={idx}>
                    <div className='reviewWrapper'>
                        <div>{review.user_name}</div>
                        <div>{review.pla_r_tag}</div>
                        <Rate readOnly value={review.pla_r_rate}/>
                        <ImgSlider className='reviewImgSlider'>
                            { review.pla_r_img && [...review.pla_r_img.split('|')].map((item, index)=> (
                                <>
                                <img className='reviewThumb' key={index} src={item} alt="썸네일" onClick={() => setVisible(true)}/>
                                <ImageViewer
                                    classNames={{
                                        mask: 'customize-mask',
                                        body: 'customize-body',
                                    }}
                                    image={item}
                                    visible={visible}
                                    onClose={() => {
                                        setVisible(false);
                                    } } />
                                </>
                            ))}
                        </ImgSlider>
                        <div>
                            {review.pla_r_content}
                        </div>
                    </div>
                    {   
                        review.user_uuid === user_uuid && (
                        <EditBtnWrapper className='editBtnWrapper'>
                            <div className='reviewBtn editBtn' onClick={() => go(`/updateReview/${review.pla_r_uuid}`)}>수정</div>
                            <div className='reviewBtn deleteBtn' onClick={() => warning(review.pla_r_uuid)}>삭제</div>
                        </EditBtnWrapper> )
                    }
                </ReviewWrapper>)
            })}
            <ReviewBtn onClick={()=> go(`/makeReview/${id}`)}>리뷰 쓰러 가기</ReviewBtn>
        </div>
    );
};

export const MyReview = () => {
    const [visible, setVisible] = useState(false);
    return (
        <ReviewWrapper>
                <div className='reviewWrapper'>
                    <div>내가 쓴 리뷰</div>
                    <div>태그</div>
                    <Rate readOnly value={4}/>
                    <ImgSlider className='reviewImgSlider'>
                        {[...Array(3)].map((index)=> (
                            <>
                            <img className='reviewThumb' key={index} src={test} alt="썸네일" onClick={() => setVisible(true)}/>
                            <ImageViewer
                                classNames={{
                                    mask: 'customize-mask',
                                    body: 'customize-body',
                                }}
                                image={test}
                                visible={visible}
                                onClose={() => {
                                    setVisible(false);
                                } } />
                            </>
                        ))}
                    </ImgSlider>
                    <div>
                        내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 
                    </div>
                </div>
            </ReviewWrapper>
    );
};

const TitleSpan = styled.span`
    display: block;
    width: 90vw;
    text-align: left;
`;

const BlogReviewWrapper = styled.div`
    overflow: auto;
    display: flex;
    gap: 3vw;
    margin: 2vh 3vw;
    padding: 0 2vw 3vh;
`;

const BlogReviewDiv = styled.div`
    & .thumb {
        object-fit: cover;
        width: 100%;
        height: 50%;
    }

    width: 35vw;
    height: 30vh;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;

    box-shadow: 0px 0px 5px 2px #bcbcbc;

    & .content { 
        padding: 1vh 0.8vw;
        display: block;

        width: 90%;
        text-align:left; 

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* 라인수 */
        -webkit-box-orient: vertical;
        word-wrap:break-word; 
        line-height: 1em;
        height: 1em; 
    }

    & .blogContent {
        height: 3em; 
        line-height: 1.6em;
        -webkit-line-clamp: 2; /* 라인수 */
    }
`;

const BlogInfo = styled.div`
    & .blogTitle { font-family:'Pretendart-ExtraBold'; }
`;

const ReviewWrapper = styled.div`
    margin-top: 2vh;
    font-size: 1rem;
    padding-bottom: 3vh;
    & .reviewWrapper {
        text-align: left;
        width: 80vw;
        margin: auto;
    }
`;

const ImgSlider = styled(BlogReviewWrapper)`
    gap:1vw;
    padding: 0;
    & .reviewThumb {
        width: 25vw;
        height: 25vw;
        object-fit: cover;
        border-radius: 15px;
    }
`;

const ReviewBtn = styled.div`
    width: 80vw;
    margin: 0.5vh auto;
    background-color: black;
    color: white;
    padding: 2vh 0vw;
    /* box-shadow: 0px 0px 7px 0px #646372; */
    border-radius: 15px;
    font-size: 0.95rem;
    font-family: 'Pretendart-ExtraBold';
`;

const EditBtnWrapper = styled.div`
    margin-top: 3%;
    display: flex;
    justify-content: space-evenly;

    & .reviewBtn {
        width: 35vw;
        padding: 1vh 0vw;
        text-align: center;
        background-color: #45866b;
        color: white;
        border-radius: 15px;
        font-family: 'Pretendart-ExtraBold';
        transition-duration: 0.2s;
        &:active {
            background-color: #557366;
            color: #ababab;
        }
    }
`;

export default Review;