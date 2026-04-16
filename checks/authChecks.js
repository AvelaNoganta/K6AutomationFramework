import { check } from 'k6';

// Function to validate the login API response
export function validateLoginResponse(response) {

  // Perform checks (assertions) on the response
  // check() returns true if ALL conditions pass, otherwise false
  return check(response, {

    // Validate that the HTTP status code is 200 (successful request)
    'status is 200': (r) => r.status === 200,

    // Validate that the response body is not empty
    // Ensures API is returning actual data
    'body is not empty': (r) => r.body && r.body.length > 0,

  });
}