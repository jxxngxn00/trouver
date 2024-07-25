import { Router } from 'express';
const router = Router();

import {CgetPlanId, CInsertPlan_temp, CInsertPlan, CdeletePlan, CupdatePlan} from '../controllers/plan.js';

router.get("/", (req, res) => { res.send("plan Routes.")});

router.post("/insertPlanTemp", CInsertPlan_temp );
router.get("/getPlanId/:id", CgetPlanId); // 방금 user가 임의로 생성한 plan id 

router.patch("/insertPlan/:id", CInsertPlan);

router.patch("/updatePlan/:id", CupdatePlan);
router.patch("/deletePlan/:id", CdeletePlan);

export default router;