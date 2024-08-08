import { Router } from 'express';
const router = Router();

import {CgetPlanId, CInsertPlan_temp, CInsertPlan, CdeletePlan, CupdatePlan, CgetPlan, CgetPlanList, CupdateHits, CgetRoute, CgetMyPlan, CgetRecentPlan} from '../controllers/plan.js';

router.get("/", (req, res) => { res.send("plan Routes.")});
router.get("/getRecentPlan/:id", CgetRecentPlan);
router.post("/insertPlanTemp", CInsertPlan_temp );
router.patch("/insertPlan/:id", CInsertPlan);

router.get("/getPlanId/:id", CgetPlanId); // 방금 user가 임의로 생성한 plan id 
router.get("/getPlanDetail/:id", CgetPlan); // plan+dateplan
router.get("/getPlanDetailRoute/:id", CgetRoute); //route
router.get("/getPlanList", CgetPlanList);

router.patch("/updatePlan/:id", CupdatePlan);
router.patch("/deletePlan/:id", CdeletePlan);

router.patch("/updateHits/:id", CupdateHits);

router.get("/getMyPlan/:id", CgetMyPlan);

export default router;