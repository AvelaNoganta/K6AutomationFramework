import http from 'k6/http';
import { URLS } from '../config/urls.js';
import { HEADERS } from '../config/constants.js';

export function postMyTestimonial(payload, token) {

   const headers = token
    ? { ...HEADERS.json, Authorization: `Bearer ${token}` }
    : HEADERS.json;
  
  return http.post(URLS.testimonials, JSON.stringify(payload),{ headers });
}