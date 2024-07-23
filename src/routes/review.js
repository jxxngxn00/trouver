import { Router } from "express";
const router = Router();

import CgetPlaceReview, { CinsertPlaceReview,
    CupdatePlaceReview, CdeletePlaceReview,
    CgetPlanReview, CinsertPlanReview,
    CupdatePlanReview, CdeletePlanReview
} from "../controllers/review.js";//여행지 리뷰 모델

router.get("/", (req, res) => { res.send("review CRUD")});

router.get("/getPlaceReview", CgetPlaceReview);
router.get("/insertPlaceReview", CinsertPlaceReview);
router.get("/updatePlaceReview", CupdatePlaceReview);
router.get("/deletePlaceReview", CdeletePlaceReview);

router.get("/getPlanReview", CgetPlanReview);
router.get("/insertPlanReview", CinsertPlanReview);
router.get("/updatePlanReview", CupdatePlanReview);
router.get("/deletePlanReview", CdeletePlanReview);

export default router;