// eslint-disable-next-line
import React from 'react';
import { sleep } from 'antd-mobile/es/utils/sleep';

let count = 0;

export async function mockRequest() {
    if (count >= 5) { return []; }
    await sleep(1500);
    count++;
    return [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
    ];
}