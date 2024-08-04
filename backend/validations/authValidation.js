/*
Version: 1.0
Last edited by: Natalia Pakhomova
Last edit date: 04/08/2024
A set of validation schemas for the user registration and login requests.
*/

// Import the Joi library for validation
const Joi = require('joi');

// Define the registration schema
const registerSchema = Joi.object({
  // Define the email field which must be a valid email and is required
  email: Joi.string().email().lowercase().required(),
  // Define the password field which must be at least 6 characters long and is required
  password: Joi.string().min(6).required(),
  // Define the firstName field which is a string
  firstName: Joi.string(),
  // Define the lastName field which is a string
  lastName: Joi.string(),
  // Define the dob field which is a date
  dob: Joi.date(),
  // Define the gender field which must be one of the specified values
  gender: Joi.string().valid('male', 'female', 'not listed'),
  // Define the phone field which is a string
  phone: Joi.string(),
  // Define the address field
  street: Joi.string(),
  // Define the suburb field which is a string
  suburb: Joi.string(),
  // Define the postcode field which is a string
  postcode: Joi.string(),
  // Define the state field which is a string
  state: Joi.string(),
  // Define the country field which is a string
  country: Joi.string(),
});

// Define the login schema
const loginSchema = Joi.object({
  // Define the email field which must be a valid email and is required
  email: Joi.string().email().lowercase().required(),
  // Define the password field which is required
  password: Joi.string().required(),
});

// Export the validation schemas
module.exports = { registerSchema, loginSchema };
