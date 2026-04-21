import { check } from 'k6';

// Validate the login response from the API.
// Returns true when all checks pass; otherwise false. Use this in tests
// to assert that the login succeeded and returned content.
export function validateLoginResponse(response) {
  return check(response, {
    // HTTP 200 indicates a successful login request
    'status is 200': (r) => r.status === 200,

    // Response body should not be empty; this helps surface malformed responses
    'body is not empty': (r) => r.body && r.body.length > 0,
  });
}