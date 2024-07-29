import asyncHandler from 'express-async-handler';
import { MsavePlace, MunsavePlace, MupdatePlaceSaveMinus, MupdatePlaceSavePlus
    ,MisSavedPlace
 } from '../models/bookmark';

export const CgetSavedPlaceState = asyncHandler(async (req, res) => {
    MisSavedPlace(req, res);
});

export const CsavePlace = asyncHandler(async (req, res) => {
    // user id , pla id, sp_cate 변수 사용
    const data = [];
    await MsavePlace(data, res);
    MupdatePlaceSavePlus(data, res);
});

export const CunsavePlace = asyncHandler(async (req, res) => {
    await MunsavePlace(req, res);
    MupdatePlaceSaveMinus(req, res);
})