import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Add any global test setup here
beforeAll(() => {
  // Setup code that runs before all tests
});

afterAll(() => {
  // Cleanup code that runs after all tests
}); 