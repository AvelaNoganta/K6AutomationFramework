import { check } from 'k6';

// Validate the profile endpoint response. Keep checks lightweight so they
// run quickly under load but still catch obvious failures.
export function validateProfileResponse(response) {
  return check(response, {
    // Expect 200 for a successful profile retrieval
    'status is 200': (r) => r.status === 200,

    // Basic non-empty body assertion to ensure the service returns payload
    'body is not empty': (r) => r.body && r.body.length > 0,
  });
}
