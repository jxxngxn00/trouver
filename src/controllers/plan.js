import asyncHandler from 'express-async-handler';
import { MinsertPlan, MinsertDatePlan, MinsertRoute, 
    MgetPlanId, MgetPlanList, MgetPlan, MgetDatePlanId,
    MupdatePlan, MupdateDatePlan, MupdateRoute,
    MdeletePlan,
    MgetDatePlan,
    MupdateHits,
    MgetRoute} from '../models/plan.js';

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
    routeData.map((route, idx) => {
        route.map(item => {
            MinsertRoute({...item, date_plan_id : datePlanIds[idx].date_plan_id, 
                user_id : user_id},res);
        })
        // console.log("=====================");
    });
});


// 일정 목록보기 (최신순)
export const CgetPlanList = asyncHandler(async (req, res) => {
    // console.log(">>> getPlanList Controller");
    MgetPlanList(req, res);
});

// 일정 상세보기 (plan + dateplan)
export const CgetPlan = asyncHandler(async (req, res) => {
    try {
        const plan = await MgetPlan(req, res);
        const datePlan = await MgetDatePlan(req, res);
        const result = {
            plan: plan,
            datePlan: datePlan,
        };
        res.send(result);
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
});

// 일정 상세보기 (route)
export const CgetRoute = asyncHandler(async (req, res) => {
    try {
        const result = await MgetRoute(req, res);
        // console.log('>> id :: ', req.params.id);
        // console.log('>> result :: ', result);
        res.send(result);
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
})

// 일정 Update :: Plan
export const CupdatePlan = asyncHandler(async (req, res) => {
    MupdatePlan(req, res);
    MupdateDatePlan(req, res);
    MupdateRoute(req, res);
});

// 일정 삭제
export const CdeletePlan = asyncHandler(async (req, res) => {
    MdeletePlan(req, res);
})

// 조회수 증가
export const CupdateHits = asyncHandler(async (req, res) => {
    MupdateHits(req, res);
});
export default CInsertPlan;