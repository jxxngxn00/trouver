import { Router } from 'express';
const router = Router();

import {CgetPlanId, CInsertPlan} from '../controllers/plan.js';

router.get("/", (req, res) => { res.send("plan Routes.")});

router.post("/insertPlan", CInsertPlan );
router.get("/getPlanId/:id", CgetPlanId); // 방금 user가 임의로 생성한 plan id 
export default router;