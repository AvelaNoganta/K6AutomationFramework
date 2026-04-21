import { sleep } from 'k6';
import { TEST_CONFIG } from '../config/constants.js';
import { PAYLOADS } from '../data/payloads.js';
import { loginRequest } from '../requests/authRequests.js';
import { validateLoginResponse } from '../checks/authChecks.js';
import { getProfile } from '../requests/profileRequests.js';
import { validateProfileResponse } from '../checks/profileChecks.js';

// External HTML report generator (k6 reporter library)
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: TEST_CONFIG.vus,
  duration: TEST_CONFIG.duration,
};

export default function () {
  // Perform login to obtain auth token. We reuse the existing login helper
  // so the same credentials and checks are used across tests.
  const loginRes = loginRequest(PAYLOADS.login);
  validateLoginResponse(loginRes);

  // Extract JSON body and attempt common token field names.
  // Adjust these keys if your API returns a different structure.
  const body = loginRes.json();
  const token = body.data.token;

  // Call profile with the extracted token (or without if extraction failed).
  const response = getProfile(token);
  validateProfileResponse(response);

  // Sleep to emulate real user pacing between iterations
  sleep(TEST_CONFIG.sleepTime);
}

export function handleSummary(data) {
  // Generate an HTML report in the reports folder
  return {
    "reports/report.html": htmlReport(data),
  };
}
