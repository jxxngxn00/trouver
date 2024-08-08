import asyncHandler from "express-async-handler";
import MgetPlaceReview, { MinsertPlaceReview, //여행지 리뷰 모델
    MupdatePlaceReview, MdeletePlaceReview,
    MgetPlanReview, MinsertPlanReview,          // 일정 리뷰 모델
    MupdatePlanReview, MdeletePlanReview,
    MgetPlaceReviewDetail,
    MgetMyReview
} from "../models/review.js";

/* 여행지 리뷰 컨트롤러 */
export const CgetPlaceReview = asyncHandler(async (req, res) => {
    const id = req.params.id;
    MgetPlaceReview(req, res);
});

export const CgetPlaceReviewDetail = asyncHandler(async (req, res) => {
    MgetPlaceReviewDetail(req, res);
});

export const CinsertPlaceReview = asyncHandler(async (req, res) => {
    // 필요 params : user_id, pla_id,pla_img, pla_r_rate, pla_r_tag, pla_r_content
    const { user_id, pla_id, r_img, r_rate, r_tag, r_content } = req.body;

    let pla_r_imgs = [];
    r_img.map((item, idx) => {
        pla_r_imgs = [...pla_r_imgs, item.url];
    });
    const pla_r_img = pla_r_imgs.join('|');
    const pla_r_tag = r_tag.join('/');

    const data = [user_id, pla_id, pla_r_img, r_rate, pla_r_tag, r_content];

    MinsertPlaceReview(data, res);
});

export const CupdatePlaceReview = asyncHandler(async (req, res) => {
    // 필요 params : user_id, pla_id,pla_img, pla_r_rate, pla_r_tag, pla_r_content
    const { r_id, pla_id, r_img, r_rate, r_tag, r_content } = req.body;
    let pla_r_imgs = [];
    r_img.map((item, idx) => {
        pla_r_imgs = [...pla_r_imgs, item.url];
    });
    const pla_r_img = pla_r_imgs.join('|');
    const pla_r_tag = r_tag.join('/');
    const pla_r_content = r_content +  " (수정됨)";
    const data = {
        pla_r_id : r_id, 
        pla_id : pla_id, 
        pla_r_img : pla_r_img, 
        pla_r_rate : r_rate, 
        pla_r_tag : pla_r_tag, 
        pla_r_content : pla_r_content
    };
    MupdatePlaceReview(data, res);
});

export const CdeletePlaceReview = asyncHandler(async (req, res) => {
    MdeletePlaceReview(req, res);
});

/* 일정 리뷰 컨트롤러 */
export const CgetPlanReview = asyncHandler(async (req, res) => {
    const id = req.params.id;
    MgetPlanReview();
});

export const CinsertPlanReview = asyncHandler(async (req, res) => {
    // 필요 params : user_id, pla_id,pla_img, pla_r_rate, pla_r_tag, pla_r_content
    const data = [];
    MinsertPlanReview();
});

export const CupdatePlanReview = asyncHandler(async (req, res) => {
    // 필요 params : user_id, pla_id,pla_img, pla_r_rate, pla_r_tag, pla_r_content
    const data = [];
    MupdatePlanReview();
});

export const CdeletePlanReview = asyncHandler(async (req, res) => {
    // 필요 params : user_id, pla_r_id
    const data = [];
    MdeletePlanReview();
});

/* 내가 쓴 리뷰 컨트롤러 */
export const CgetMyReview = asyncHandler(async (req, res) => {
    // console.log(">>> getMyReview controller param :: ",req.params.id);
    MgetMyReview(req, res);
})
export default CgetPlaceReview;