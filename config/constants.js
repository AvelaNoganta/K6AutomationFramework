// Test configuration settings used to control load and execution behavior
export const TEST_CONFIG = {

  // Number of virtual users (simulated concurrent users)
  vus: 10,

  // Total duration the test will run
  // Example formats: '30s', '2m', '1h'
  duration: '30s',

  // Time (in seconds) each virtual user waits between iterations
  // Helps simulate real user behavior instead of constant hammering
  sleepTime: 1,
};


// Common HTTP headers used across API requests
export const HEADERS = {
  json: {

    // Specifies that the request body is in JSON format
    'Content-Type': 'application/json',

  },
};