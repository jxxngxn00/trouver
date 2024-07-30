import asyncHandler from 'express-async-handler';
import { MsavePlace, MunsavePlace, MupdatePlaceSaveMinus, MupdatePlaceSavePlus
    ,MisSavedPlace,
    MsavePlan, MunsavePlan, MupdatePlanSaveMinus, MupdatePlanSavePlus
    ,MisSavedPlan,
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
    await MsavePlan(req, res);
    MupdatePlanSavePlus(req, res);
});

export const CunsavePlan = asyncHandler(async (req, res) => {
    // user id , pla id 변수 사용
    console.log("CunsavePlan");
    const data = [];
    await MunsavePlan(req, res);
    MupdatePlanSaveMinus(req, res);
})

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
    await MsavePlace(req, res);
    MupdatePlaceSavePlus(req, res);
});

export const CunsavePlace = asyncHandler(async (req, res) => {
    // user id , pla id 변수 사용
    console.log("CunsavePlace");
    const data = [];
    await MunsavePlace(req, res);
    MupdatePlaceSaveMinus(req, res);
})