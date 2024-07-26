import asyncHandler from 'express-async-handler';
import { MinsertPlan, MinsertDatePlan, MinsertRoute, 
    MgetPlanId, MgetPlanList, MgetPlan, MgetDatePlanId,
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
    const value = req.body;
    const user_id = req.params.id;
    const updatePlanData = value[0];
    const datePlanData = value[1];
    const routeData = value[2];

    MupdatePlan({...updatePlanData, user_id : user_id}, res);

    datePlanData.map((date) => {
        MinsertDatePlan({...date, user_id : user_id}, res);
    });
    const datePlanIds = await MgetDatePlanId({ plan_id : datePlanData[0].plan_id, user_id : user_id}, res);
    // console.log(datePlanIds.length > 0 ? datePlanIds : "undefined");
    routeData.map((route, idx) => {
        MinsertRoute({...route, date_plan_id : datePlanIds[idx].date_plan_id, 
            user_id : user_id},res);
    });
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