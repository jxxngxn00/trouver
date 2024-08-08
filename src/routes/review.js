import { Router } from "express";
const router = Router();

import CgetPlaceReview, { CgetPlaceReviewDetail, CinsertPlaceReview,
    CupdatePlaceReview, CdeletePlaceReview,
    CgetPlanReview, CinsertPlanReview,
    CupdatePlanReview, CdeletePlanReview,
    CgetMyReview,
} from "../controllers/review.js";//여행지 리뷰 모델

router.get("/", (req, res) => { res.send("review CRUD")});

router.get("/getPlaceReview/:id", CgetPlaceReview);
router.get("/getPlaceReviewDetail/:plaRid", CgetPlaceReviewDetail);
router.post("/insertPlaceReview", CinsertPlaceReview);
router.patch("/updatePlaceReview", CupdatePlaceReview);
router.patch("/deletePlaceReview/:plaRid", CdeletePlaceReview);

router.get("/getPlanReview", CgetPlanReview);
router.get("/insertPlanReview", CinsertPlanReview);
router.get("/updatePlanReview", CupdatePlanReview);
router.get("/deletePlanReview", CdeletePlanReview);

router.get("/getMyReview/:id", CgetMyReview);
export default router;