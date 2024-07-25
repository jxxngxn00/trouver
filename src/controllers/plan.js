import asyncHandler from 'express-async-handler';
import { MinsertPlan, MinsertDatePlan, MinsertRoute, 
    MgetPlanId, MgetPlanList, MgetPlan, 
    MupdatePlan, MupdateDatePlan, MupdateRoute,
    MdeletePlan} from '../models/plan.js';

export const CInsertPlan_temp = asyncHandler(async (req, res) => {
    const { date, budget, tags, user_login_id } = req.body;
    const plan_start = date[0];
    const plan_end = date[1];
    const plan_budget = ""+budget[0]+" ~ "+""+budget[1];
    const plan_tag = tags.join(',');
    const data = [plan_start, plan_end, plan_budget, plan_tag, user_login_id];

    MinsertPlan(data, res);
});

// 방금 임의로 만든 일정의 id를 가져오는 컨트롤러
export const CgetPlanId = asyncHandler(async (req, res) => {
    MgetPlanId(req,res);
});

// 일정 최초 저장
export const CInsertPlan = asyncHandler(async (req, res) => {
    const { date, budget, tags, user_login_id } = req.body;
    const plan_start = date[0];
    const plan_end = date[1];
    const plan_budget = ""+budget[0]+" ~ "+""+budget[1];
    const plan_tag = tags.join(',');
    const updatePlanData = [plan_start, plan_end, plan_budget, plan_tag, user_login_id];


    MupdatePlan(updatePlanData, res);
    MinsertDatePlan(req, res);
    MinsertRoute(req,res);
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
export const CupdatePlan = asyncHandler(async (req, res) => {
    await MupdatePlan(req, res);
    await MupdateDatePlan(req, res);
    await MupdateRoute(req,res);
});

// 일정 삭제
export const CdeletePlan = asyncHandler(async (req, res) => {
    MdeletePlan(req, res);
})

export default CInsertPlan;