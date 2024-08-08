import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import noResult from '../../images/no-result.gif';
import { Divider, Rate, ImageViewer, Modal } from 'antd-mobile';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Review = ({ reviews, id, naverReview }) => {
    const [visible, setVisible] = useState(false);
    const user_uuid = "fdb19576-48f1-11ef-bcc9-af0a24947caf";
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
        title: "리뷰 삭제",
        content: (
            <>
            <div> 리뷰를 정말 삭제할까요? </div>
            <div> 삭제된 리뷰는 복구하기 어렵습니다! </div>
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
            {/* 네이버 블로그 리뷰 */}
            <TitleSpan className='title'>네이버 블로그</TitleSpan>
            <BlogReviewWrapper>
            {naverReview && naverReview.length > 0 ? (
                naverReview.map((nItem, index) => (
                    <BlogReviewDiv 
                        key={index}  
                        onClick={() => window.open(nItem?.link, "_blank", "noopener noreferrer")}
                    >
                        {/* <img className='thumb' src={test} alt="썸네일"/> */}
                        <BlogInfo>
                            <span className='blogTitle content' dangerouslySetInnerHTML={{__html: nItem?.title}}></span>
                            <div className='blogContent content' dangerouslySetInnerHTML={{__html: nItem?.description}}></div>
                        </BlogInfo>
                    </BlogReviewDiv>
                ))
            ) : (
                <NoResultDiv>
                    <img className="noResultIcon" src={noResult} alt="No results" />
                    <span className='noResultDesc'>검색 결과를 찾을 수 없어요 🥲</span>
                </NoResultDiv>
            )}
            </BlogReviewWrapper>

            <Divider/>
            {/* <TitleSpan className='title'>구글 평점</TitleSpan>
            <Divider/> */}

            <TitleSpan className='title'>트루버 리뷰</TitleSpan>
            {/* // eslint-disable-next-line */}
            { !reviews || (Array.isArray(reviews) && reviews.length === 0) ? (
                <ReviewWrapper>
                    아직 리뷰가 작성되지 않았어요. 🥲 <br/>
                    트루버 리뷰와 함께하세요!<br/>
                    <br/>
                    <lord-icon
                        src="https://cdn.lordicon.com/nizfqlnk.json"
                        trigger="loop"
                        delay="3000"
                        colors="primary:#45866b"
                        style={{ width : "35vw", height : "35vw"}}
                    />
                </ReviewWrapper>
            ) : reviews.map ((review, idx) => {
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

export const MyReview = ({ user_id }) => {
    const [visible, setVisible] = useState(false);
    const [reviews, setReviews] = useState([]);
    const go = useNavigate();

    const getMyReview = async () => {
        try {
            const res = await axios.get(`/api/review/getMyReview/${user_id}`);
            console.log(res.data);
            setReviews(res.data);

        } catch (error) {
            console.error("Error getMyReview Axios : ",error);
        }
    }

    useEffect(()=> {
        getMyReview();
        // eslint-disable-next-line
    },[])

    return (
        <>
        { !reviews || (Array.isArray(reviews) && reviews.length === 0) ? (
            <ReviewWrapper>
                아직 리뷰가 작성되지 않았어요. 🥲 <br/>
                트루버 리뷰와 함께하세요!<br/>
                <br/>
                <lord-icon
                    src="https://cdn.lordicon.com/nizfqlnk.json"
                    trigger="loop"
                    delay="3000"
                    colors="primary:#45866b"
                    style={{ width : "35vw", height : "35vw"}}
                /><br/>
                <ReviewBtn onClick={()=> go(`/product`)}>여행지 구경하고 리뷰쓰기</ReviewBtn>
            </ReviewWrapper>
        ) : reviews.map ((review, idx) => {
            // eslint-disable-next-line
            if (review.pla_r_is_deleted) return;
            return(
            <ReviewWrapper key={idx}>
                <div className='reviewWrapper'>
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
                <EditBtnWrapper className='editBtnWrapper'>
                    <div className='reviewBtn editBtn' onClick={() => go(`/updateReview/${review.pla_r_uuid}`)}>수정</div>
                    <div className='reviewBtn deleteBtn' onClick={() => go(`/viewproddetail/${review.pla_id}`)}>여행지 보러가기</div>
                </EditBtnWrapper>

            </ReviewWrapper>)
        })}
        </>
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
    padding: 3vh 2vw 3vh;
`;

const BlogReviewDiv = styled.div`
    & .thumb {
        object-fit: cover;
        width: 100%;
        height: 50%;
    }

    width: 53vw;
    height: 14vh;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;

    box-shadow: 0px 0px 5px 2px #bcbcbc;

    & .content { 
        padding: 0.5vh 1.3vw 0vh;
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
        height: 2.7rem; 
        & b{
            font-family:'Pretendart-ExtraBold'; 
            color: #45866B;
            font-size: inherit;
        }
    } 

    & .blogContent {
        height: 6.2em; 
        line-height: 1.6em;
        -webkit-line-clamp: 2; /* 라인수 */
        font-size: 0.65rem;
        font-family: 'KCC-Hanbit';
        color: #6f6f6f;
    }
`;

const BlogInfo = styled.div`
    & .blogTitle { 
        font-family:'Pretendart-ExtraBold'; 
        font-size: 0.85rem;
    }
`;

const ReviewWrapper = styled.div`
    margin-top: 2vh;
    font-size: 1rem;
    padding-bottom: 3vh;
    text-align: center;
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

const NoResultDiv = styled.div`
    width : 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    & span {
        font-family: 'KCC-Hanbit';
    }
    & .noResultIcon {
        width: 35vw;
    }
`;

export default Review;