import { sleep } from 'k6';
import { TEST_CONFIG } from '../config/constants.js';
import { PAYLOADS } from '../data/payloads.js';
import { loginRequest } from '../requests/authRequests.js';
import { validateLoginResponse } from '../checks/authChecks.js';
import { postMyTestimonial } from '../requests/testimonialRequests.js';
import { getAllPendingTestimonials } from '../requests/getPendingTestimonial.js';
import { validateCreateTestimonialResponse } from '../checks/testimonialChecks.js';

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


    const testimonialResponse = postMyTestimonial(PAYLOADS.postTestimonial, token);
    validateCreateTestimonialResponse(testimonialResponse);
    console.log(`Response status: ${testimonialResponse.status}`);
    console.log(`Response body: ${JSON.stringify(testimonialResponse.json(), null, 2)}`);

const pendingTestimonialsResponse = getAllPendingTestimonials(token);
console.log(`Pending Testimonials Response status: ${pendingTestimonialsResponse.status}`);
console.log(`Pending Testimonials Response body: ${JSON.stringify(pendingTestimonialsResponse.json(), null, 2)}`);
    sleep(TEST_CONFIG.sleepTime);
}

export function handleSummary(data) {
    // Generate an HTML report in the reports folder
    return {
        "reports/report.html": htmlReport(data),
    };
}