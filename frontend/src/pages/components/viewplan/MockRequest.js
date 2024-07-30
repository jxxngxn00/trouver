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
    console.log(">>> getViewPlanList :: ", res.data);
    return res.data;
}