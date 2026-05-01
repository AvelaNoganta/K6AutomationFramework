import { sleep } from 'k6';
import { TEST_CONFIG } from '../config/constants.js';
import { PAYLOADS } from '../data/payloads.js';
import { loginRequest } from '../requests/authRequests.js';
import { validateLoginResponse } from '../checks/authChecks.js';
import { postMyTestimonial } from '../requests/testimonialRequests.js';


// External HTML report generator (k6 reporter library)
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: TEST_CONFIG.vus,
    duration: TEST_CONFIG.duration,
};

export default function () {
    const loginRes = loginRequest(PAYLOADS.login);
    validateLoginResponse(loginRes);

    const body = loginRes.json();
    const token = body.data.token;
    const response = postMyTestimonial(PAYLOADS.postTestimonial, token);

    console.log(`Response status: ${response.status}`);
    console.log(`Response body: ${JSON.stringify(response.json())}`);
    sleep(TEST_CONFIG.sleepTime);
}

export function handleSummary(data) {
    // Generate an HTML report in the reports folder
    return {
        "reports/report.html": htmlReport(data),
    };
}