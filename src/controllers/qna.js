import AsyncHandler from "express-async-handler";
import { MinsertQna, MgetQnaList, MgetQnaDetail, 
    MupdateQna, MdeleteQna
} from '../models/qna.js';

export const CinsertQna = AsyncHandler(async (req, res) => {
    // const { q_content, q_cate } = req.body;
    const q_content = req.body.content;
    const q_cate = req.body.cate;
    const user_id = req.params.id;
    const data = [user_id, q_content, q_cate];
    // console.log(data);
    MinsertQna(data, res);
});

export const CgetQnaList = AsyncHandler(async (req, res) => {
    const user_id = req.query.user_id
    // console.log(">>> getQnaList Controller 호출 : ", user_id);
    const data = [user_id];
    MgetQnaList(data, res);
    // console.log(">>> getQnaList Controller result : ", result);
});

export const CgetQnaDetail = AsyncHandler(async (req, res) => {
    const q_id = req.params.qid;
    const data = [q_id];
    MgetQnaDetail(data, res);
    // res.send(result);
});

export const CupdateQna = AsyncHandler(async (req, res) => {
    const q_content = req.body.q_content;
    const q_cate = req.body.q_cate;
    const user_id = req.body.user_id;
    const q_id = req.body.q_id;
    const data = [ q_cate, q_content, q_id, user_id ];
    MupdateQna(data, res);
});

export const CdeleteQna = AsyncHandler(async (req, res) => {
    const user_id = req.body.user_id;
    const q_id = req.params.qid;
    const data = [ q_id, user_id ];
    // console.log(data);
    MdeleteQna(data, res);
});

