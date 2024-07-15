import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

import http from 'k6/http'
import { check } from 'k6'

export let options = {
    stages: [
       {duration: "3s", target:1} 
    ],
    thresholds: {
        http_req_failed:["rate<0.01"],
        http_req_duration: ["p(90)<400", "p(95)<800", "p(99.9)<2000"]
    }
}

export default function (){
    const baseURL = 'https://fakestoreapi.com'


    let response = http.del(baseURL+'/products/7')
    check(response, {'status was 200': r => r.status == 200})
    console.log(response.json()); // response
}

export function handleSummary(data) {
    return {
      "results/html-report/load-testaDeleteProduct.html": htmlReport(data, {
        debug: false,
      }),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }