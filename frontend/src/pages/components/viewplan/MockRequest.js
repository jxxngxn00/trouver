// eslint-disable-next-line
import React from 'react';
import { sleep } from 'antd-mobile/es/utils/sleep';
import axios from 'axios';

let count = 0;

export async function mockRequest() {
    if (count >= 5) { return []; }
    await sleep(1500);
    count++;
    const res = await axios.get(`/api/plan/getPlanList`);
    // console.log(">>> getViewPlanList :: ", res.data);
    return res.data;
};

export async function mockCateRequest(cate) {
    if (count >= 5) { return []; }
    await sleep(1500);
    count++;
    const res = await axios.get(`/api/place/getPlaceListByCate/${cate}`);
    // console.log(">>> getViewPlanList :: ", res.data);
    return res.data;
};

export const mockMyPlan = async (user_id) => {
    if (count >= 5) { return []; }
    await sleep(1500);
    count++;
    const res = await axios.get(`/api/plan/getMyPlan/${user_id}`);
    console.log(">>> getMyPlan :: ", res.data);
    return res.data;
};

export const mockMyPlanBookmark = async (user_id) => {
    if (count >= 5) { return []; }
    await sleep(1500);
    count++;
    const res = await axios.get(`/api/bookmark/getMyPlanBookmark/${user_id}`);
    console.log(">>> getMyPlanBookmark :: ", res.data);
    return res.data;
};

export const mockMyPlaceBookmark = async (user_id) => {
    if (count >= 5) { return []; }
    await sleep(1500);
    count++;
    const res = await axios.get(`/api/bookmark/getMyPlaceBookmark/${user_id}`);
    console.log(">>> getMyPlaceBookmark :: ", res.data);
    return res.data;    
};