import { browser } from 'k6/experimental/browser';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { check } from 'k6';

const configWebLoad = JSON.parse(open('../../env/Web/config.web.json'));

export const options = {
  scenarios: {
    ui: configWebLoad.BROWSER,
  },
  thresholds: {
    checks: configWebLoad.THRESHOLDS.checks,
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto(`${configWebLoad.SETTINGS.login}`);
    await page.screenshot({ path: `screenshots/screenshot${Date.now()}.png` });


    const submitButton = page.locator('input[type="submit"]');

    await page.locator('input[name="login"]').type('admin');
    await page.locator('input[name="password"]').type('123');


    await Promise.all([page.waitForNavigation(), submitButton.click()]);

    await page.screenshot({ path: `screenshots/welcomeAdmin${Date.now()}.png` });

    const header = await page.locator('h2').textContent();
    check(header, {
      header: (h) => h == 'Welcome, admin!',
    });



  } finally {
    await page.close();
  }
}

export function handleSummary(data) {
  return {
    "report/WEB/Login.html": htmlReport(data, { debug: false }),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}