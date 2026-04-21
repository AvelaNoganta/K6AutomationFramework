import http from 'k6/http';
import { URLS } from '../config/urls.js';
import { HEADERS } from '../config/constants.js';

// Performs the login POST request.
// - `payload` should be a plain object (email/password or similar).
// - Returns the raw k6 response so callers can run checks or extract tokens.
export function loginRequest(payload) {
  // Use centralized URL so environments can be switched in one place
  const url = URLS.login;

  // k6 expects a string body when sending JSON; stringify here once
  const body = JSON.stringify(payload);

  // Use shared JSON headers from config (includes Content-Type)
  const params = { headers: HEADERS.json };

  // Execute the POST and return the response for further validation
  return http.post(url, body, params);
}