import asyncHandler from 'express-async-handler';
// import bcrypt from bcrypt;
import { mIsSigned } from '../models/user.js';

// 회원가입 여부 판단 => true : 로그인, false : 회원가입
export const cIsSigned = asyncHandler( async(req, res) => {
    mIsSigned(req, res);
});