// import bcrypt from bcrypt;
import asyncHandler from 'express-async-handler';
import MgetPlaceList from '../models/place.js';
import { MgetPlaceList5, MgetPlace, MgetPlaceListByCate5, MgetPlaceListBySearch } from '../models/place.js';


export const CgetPlaceList = asyncHandler(async (req, res) => {
    MgetPlaceList(req, res);
});

export const CgetPlaceList5 = asyncHandler(async (req, res) => {
    MgetPlaceList5(req, res);
});

export const CgetPlace = asyncHandler(async (req,res) => {
    const id = req.params.id;
    MgetPlace(req,res);
});

export const CgetPlaceListByCate5 = asyncHandler(async (req,res) => {
    const cate = req.params.cate;
    MgetPlaceListByCate5(req,res);
});

export const CgetPlaceListBySearch = asyncHandler(async (req, res) => {
    const searchTerm = req.params.searchTerm;
    MgetPlaceListBySearch(req,res);
})

export default CgetPlaceList;