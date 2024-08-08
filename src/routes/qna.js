import { Router } from "express";
const router = Router();
import {
    CgetQnaList, CgetQnaDetail, CinsertQna, CupdateQna, CdeleteQna
} from "../controllers/qna.js";

router.get("/", CgetQnaList);
router.get("/detail/:qid", CgetQnaDetail);

router.post("/insert/:id", CinsertQna);

router.patch("/update/:qid", CupdateQna);
router.patch("/delete/:qid", CdeleteQna);

export default router;