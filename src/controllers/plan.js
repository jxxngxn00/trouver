import asyncHandler from 'express-async-handler';
import { MinsertPlan, MinsertDatePlan, MinsertRoute, MgetPlanId, MgetDatePlanId } from '../models/plan.js';

export const CInsertPlan = asyncHandler(async (req, res) => {
    MinsertPlan(req, res);
    // res.json({ result : true });
});

export const CgetPlanId = asyncHandler(async (req, res) => {
    const user_id = req.params.id;
    MgetPlanId(req,res);
})

export default CInsertPlan;