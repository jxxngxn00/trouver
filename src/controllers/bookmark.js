import asyncHandler from 'express-async-handler';
import { MsavePlace, MunsavePlace, MupdatePlaceSaveMinus, MupdatePlaceSavePlus
    ,MisSavedPlace,
    MsavePlan, MunsavePlan, MupdatePlanSaveMinus, MupdatePlanSavePlus
    ,MisSavedPlan,
    MgetMyPlanBookmark,
    MgetMyPlaceBookmark,
    MgetCountSavedPlace,
    MgetCountSavedPlan,
 } from '../models/bookmark.js';
 
 /* Plan Bookmark */
export const CgetSavedPlanState = asyncHandler(async (req, res) => {
    const { user_id } = req.query;
    const { planId } = req.params;
    // console.log(">> CgetSavedPlanState :: ", planId);
    const data = [planId, user_id];
    MisSavedPlan(data, res);
    // console.log(res);
});

export const CsavePlan = asyncHandler(async (req, res) => {
    // user id , pla id 변수 사용
    console.log("CsavePlan");
    // const { plaId } = req.params;
    MsavePlan(req, res);
    MupdatePlanSavePlus(req, res);
});

export const CunsavePlan = asyncHandler(async (req, res) => {
    // user id , pla id 변수 사용
    console.log("CunsavePlan");
    const data = [];
    MunsavePlan(req, res);
    MupdatePlanSaveMinus(req, res);
});

export const CgetMyPlanBookMark = asyncHandler(async (req, res) => {
    // console.log(req.params.id);
    MgetMyPlanBookmark(req, res);
});

 /* Place Bookmark */
 export const CgetSavedPlaceState = asyncHandler(async (req, res) => {
    const { user_id } = req.query;
    const { plaId } = req.params;
    console.log(">> CgetSavedPlaceState :: ", plaId);
    const data = [plaId, user_id];
    MisSavedPlace(data, res);
    // console.log(res);
});

export const CsavePlace = asyncHandler(async (req, res) => {
    // user id , pla id 변수 사용
    console.log("CsavePlace");
    // const { plaId } = req.params;
    MsavePlace(req, res);
    MupdatePlaceSavePlus(req, res);
});

export const CunsavePlace = asyncHandler(async (req, res) => {
    // user id , pla id 변수 사용
    console.log("CunsavePlace");
    const data = [];
    MunsavePlace(req, res);
    MupdatePlaceSaveMinus(req, res);
});

export const CgetMyPlaceBookmark = asyncHandler(async (req, res) => {
    // console.log(req.params.id);
    MgetMyPlaceBookmark(req,res);
});

export const CgetCountSave = asyncHandler(async (req, res) => {

    const countSavedPlace = await MgetCountSavedPlace(req, res);
    const countSavedPlan = await MgetCountSavedPlan(req, res);
    // console.log(countSavedPlace);
    const result = {
        place : countSavedPlace,
        plan: countSavedPlan
    };
    console.log(">> CgetCountSave : ",result);
    res.send(result);
});