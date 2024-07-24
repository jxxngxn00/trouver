import { Router } from 'express';
const router = Router();

import {CgetPlanId, CInsertPlan_temp} from '../controllers/plan.js';

router.get("/", (req, res) => { res.send("plan Routes.")});

router.post("/insertPlanTemp", CInsertPlan_temp );
router.get("/getPlanId/:id", CgetPlanId); // 방금 user가 임의로 생성한 plan id 
export default router;