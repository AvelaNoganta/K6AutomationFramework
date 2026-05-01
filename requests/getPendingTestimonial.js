import http from 'k6/http';
import { URLS } from '../config/urls.js';
import { HEADERS } from '../config/constants.js';



export function getAllPendingTestimonials(token) {
  // Clone JSON headers and add Authorization when token is present
  const headers = token
    ? { ...HEADERS.json, Authorization: `Bearer ${token}` }
    : HEADERS.json;

  // Execute GET and return the response
  return http.get(URLS.getPendingTestimonials, { headers });
}