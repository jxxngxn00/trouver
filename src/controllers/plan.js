import asyncHandler from 'express-async-handler';
import { MinsertPlan, MinsertDatePlan, MinsertRoute, 
    MgetPlanId, MgetPlanList, MgetPlan, MupdatePlan,
    MdeletePlan} from '../models/plan.js';

export const CInsertPlan_temp = asyncHandler(async (req, res) => {
    MinsertPlan(req, res);
    // MinsertDatePlan(req, res);
    // MinsertRoute(req,res);
});

export const CInsertPlan = asyncHandler(async (req, res) => {
    MupdatePlan(req, res);
    MinsertDatePlan(req, res);
    MinsertRoute(req,res);
});

// 방금 임의로 만든 일정의 id를 가져오는 컨트롤러
export const CgetPlanId = asyncHandler(async (req, res) => {
    // const user_id = req.params.id;
    MgetPlanId(req,res);
});

// 일정 목록보기 (최신순)
export const CgetPlanList = asyncHandler(async (req, res) => {
    MgetPlanList(req, res);
});

// 일정 상세보기
export const CgetPlan = asyncHandler(async (req, res) => {
    MgetPlan(req,res);
})

// 일정 Update :: Plan

// 일정 삭제
export const CdeletePlan = asyncHandler(async (req, res) => {
    MdeletePlan(req, res);
})

export default CInsertPlan;