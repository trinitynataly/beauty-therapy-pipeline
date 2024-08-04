/*
Version: 1.0
Last edited by: Natalia Pakhomova
Last edit date: 04/08/2024
A set of validation schemas for the user registration and login requests.
*/

// Import the authentication validation schemas
const { registerSchema, loginSchema } = require('./authValidation');

// Export the schemas
module.exports = {
  registerSchema, // Export the registration schema
  loginSchema, // Export the login schema
};
