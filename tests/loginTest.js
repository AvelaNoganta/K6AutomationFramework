import { sleep } from 'k6';
import { TEST_CONFIG } from '../config/constants.js';
import { PAYLOADS } from '../data/payloads.js';
import { loginRequest } from '../requests/authRequests.js';
import { validateLoginResponse } from '../checks/authChecks.js';

// External HTML report generator (k6 reporter library)
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


// k6 execution configuration (load settings)
export const options = {
  vus: TEST_CONFIG.vus,          // Number of virtual users
  duration: TEST_CONFIG.duration, // Total test duration
  thresholds: TEST_CONFIG.thresholds, // Performance thresholds (from config)
};


// Main test function (executed by each virtual user)
export default function () {

  // Call login API using reusable request function. This returns the raw
  // k6 response which may contain the authentication token in JSON.
  const response = loginRequest(PAYLOADS.login);

  console.log(`Response status: ${response}`);
  console.log(`Response body: ${response.body}`);

  // Validate response using reusable checks. If this check fails the
  // subsequent token extraction may also fail, so keeping assertions helps.
  validateLoginResponse(response);

  // Pause between iterations to simulate real user behavior
  sleep(TEST_CONFIG.sleepTime);
}


// Custom summary function (runs once after test completes)
export function handleSummary(data) {
  return {
    "reports/report.html": htmlReport(data),
  };
}