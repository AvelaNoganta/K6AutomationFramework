// Test configuration settings used to control load and execution behavior
export const TEST_CONFIG = {

  // Number of virtual users (simulated concurrent users)
  vus: 10,

  // Total duration the test will run
  // Example formats: '30s', '2m', '1h'
  duration: '3s',

  // // Performance thresholds to define acceptable response times and failure rates
  thresholds: {
    // 95% of HTTP requests should complete in under 500 milliseconds
    // This helps ensure the API is responsive under load
    // 'http_req_duration' is a built-in k6 metric that measures the time taken for each HTTP request
    http_req_duration: ['p(95)<500'], // 95% of requests should complete in under 500ms

  },
  // Time (in seconds) each virtual user waits between iterations
  // Helps simulate real user behavior instead of constant hammering
  sleepTime: 1,
};


// Common HTTP headers used across API requests
export const HEADERS = {
  json: {
    // Specifies that the request body is in JSON format
    'Content-Type': 'application/json',
    // When an auth token is required, tests add an `Authorization` header
    // dynamically (see requests/profileRequests.js).

  },
};