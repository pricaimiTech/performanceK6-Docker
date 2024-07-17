import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

import http from 'k6/http';
import { check } from 'k6';


export let options = {
    stages:[
        // Ramp-up from 1 to TARGET_VUS virtual users (VUs) in 5s
        { duration: "5s", target: 10 },
  
        // Stay at rest on TARGET_VUS VUs for 10s
        { duration: "10s", target: 20 },
  
        // Ramp-down from TARGET_VUS to 0 VUs for 5s
        { duration: "5s", target: 0 }
    ],
    thresholds: {
        "http_req_failed": [
            "rate<0.01"
        ],
        "http_req_duration": [
            "p(90)<400",
            "p(95)<800",
            "p(99.9)<2000"
        ]
    }
};

export default function () {
    const response = http.get(`https://fakestoreapi.com/products`);
    check(response, { 'status was 200': r => r.status === 200 });
}

export function handleSummary(data) {
    return {
        "report/API/load/GetAllProducts.html": htmlReport(data, {
            debug: false,
        }),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
