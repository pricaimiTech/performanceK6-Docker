import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

import http from 'k6/http';
import { check } from 'k6';

const testConfig = JSON.parse(open('../../env/settings.json'));
const configLoad = JSON.parse(open('../../env/config.load.json'));


export let options = {
    stages: configLoad.STAGES,
    thresholds: configLoad.THRESHOLDS,
};

export default function () {
    const response = http.get(`${testConfig.SETTINGS.baseUrl}/products/${testConfig.PRODUCT.id}`);
    console.log(response.body)
    check(response, { 'status was 200': r => r.status === 200 });
}

export function handleSummary(data) {
    return {
        "report/API/load/GetASingleProduct.html": htmlReport(data, {
            debug: false,
        }),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
