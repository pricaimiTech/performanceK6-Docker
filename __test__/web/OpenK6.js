import { browser } from 'k6/experimental/browser';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const configWebLoad = JSON.parse(open('../../env/Web/config.web.json'));

export const options = {
  scenarios: {
    ui: configWebLoad.UI,
    },
  thresholds: {
    checks: configWebLoad.THRESHOLDS.checks,
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto(`${configWebLoad.SETTINGS.baseUrl}`);
    await page.screenshot({ path: 'screenshots/screenshot.png' });
  } finally {
    await page.close();
  }
}

export function handleSummary(data) {
  return {
    "report/WEB/LoginK6.html": htmlReport(data, { debug: false }),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}