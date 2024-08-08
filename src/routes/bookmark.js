import { Router } from 'express';
const router = Router();
import { CsavePlace , CgetSavedPlaceState, CunsavePlace, 
    CgetSavedPlanState, CunsavePlan, CsavePlan, 
    CgetMyPlaceBookmark, CgetMyPlanBookMark, 
    CgetCountSave } from '../controllers/bookmark.js';

// Home
router.get('/getCountSave/:id', CgetCountSave);

// plan bookmark
router.post("/savePlan/:planId", CsavePlan);
router.delete("/unsavePlan/:planId", CunsavePlan);
router.get('/getSavedPlanState/:planId', CgetSavedPlanState);
router.get('/getMyPlanBookmark/:id', CgetMyPlanBookMark);

// place bookmark
router.get("/", (req, res) => { res.send("bookmark.")});
router.post("/savePlace/:plaId", CsavePlace);
router.delete("/unsavePlace/:plaId", CunsavePlace);
router.get('/getSavedPlaceState/:plaId', CgetSavedPlaceState);
router.get('/getMyPlaceBookmark/:id', CgetMyPlaceBookmark);

export default router;