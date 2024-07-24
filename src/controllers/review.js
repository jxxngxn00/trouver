import asyncHandler from "express-async-handler";
import MgetPlaceReview, { MinsertPlaceReview, //여행지 리뷰 모델
    MupdatePlaceReview, MdeletePlaceReview,
    MgetPlanReview, MinsertPlanReview,          // 일정 리뷰 모델
    MupdatePlanReview, MdeletePlanReview
} from "../models/review.js";

/* 여행지 리뷰 컨트롤러 */
export const CgetPlaceReview = asyncHandler(async (req, res) => {
    const id = req.params.id;
    MgetPlaceReview(req, res);
});

export const CinsertPlaceReview = asyncHandler(async (req, res) => {
    // 필요 params : user_id, pla_id,pla_img, pla_r_rate, pla_r_tag, pla_r_content
    const data = req.body;
    MinsertPlaceReview(req, res);
});

export const CupdatePlaceReview = asyncHandler(async (req, res) => {
    // 필요 params : user_id, pla_id,pla_img, pla_r_rate, pla_r_tag, pla_r_content
    const data = [];
    MupdatePlaceReview();
});

export const CdeletePlaceReview = asyncHandler(async (req, res) => {
    // 필요 params : user_id, pla_r_id
    const data = [];
    MdeletePlaceReview();
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

export default CgetPlaceReview;