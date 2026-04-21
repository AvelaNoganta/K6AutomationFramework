import http from 'k6/http';
import { URLS } from '../config/urls.js';
import { HEADERS } from '../config/constants.js';

// Performs a GET against the profile endpoint.
// If an auth `token` is supplied it will be added as `Authorization: Bearer <token>`.
// The raw k6 response is returned for checks or JSON extraction.
export function getProfile(token) {
  // Clone JSON headers and add Authorization when token is present
  const headers = token
    ? { ...HEADERS.json, Authorization: `Bearer ${token}` }
    : HEADERS.json;

  // Execute GET and return the response
  return http.get(URLS.profile, { headers });
}
