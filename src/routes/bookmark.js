import { Router } from 'express';
const router = Router();
import { CsavePlace , CgetSavedPlaceState, CunsavePlace, CgetSavedPlanState, CunsavePlan, CsavePlan } from '../controllers/bookmark.js';


router.get("/", (req, res) => { res.send("bookmark.")});
router.post("/savePlace/:plaId", CsavePlace);
router.delete("/unsavePlace/:plaId", CunsavePlace);
router.get('/getSavedPlaceState/:plaId', CgetSavedPlaceState);

router.post("/savePlan/:planId", CsavePlan);
router.delete("/unsavePlan/:planId", CunsavePlan);
router.get('/getSavedPlanState/:planId', CgetSavedPlanState);
export default router;