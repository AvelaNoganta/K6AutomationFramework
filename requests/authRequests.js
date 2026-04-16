import http from 'k6/http';
import { URLS } from '../config/urls.js';
import { HEADERS } from '../config/constants.js';

// Function to perform the login API POST request
export function loginRequest(payload) {

  // Send HTTP POST request to the login endpoint
  return http.post(

    // URL pulled from centralized config (good for environment switching)
    URLS.login,

    // Convert payload object into JSON string (required for application/json)
    JSON.stringify(payload),

    {
      headers: HEADERS.json, // Reusable headers (Content-Type: application/json)
    }
  );
}