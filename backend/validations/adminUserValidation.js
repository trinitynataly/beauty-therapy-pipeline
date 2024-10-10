/*
Version: 1.0
Validation schemas for admin user management.
Includes schemas for creating and updating user profiles.
Last Edited by: Natalia Pakhomova
Last Edit Date: 10/09/2024
*/

const Joi = require('joi');

// Define the validation schema for user creation
const adminUserCreateSchema = Joi.object({
  email: Joi.string().email().required(), // Email is required and must be a valid email address
  password: Joi.string().min(6).required(), // Password is required and must be at least 6 characters long
  firstName: Joi.string().min(2).max(50).required(), // First name is required and must be between 2 and 50 characters
  lastName: Joi.string().min(2).max(50).required(), // Last name is required and must be between 2 and 50 characters
  dob: Joi.date().optional(), // Date of birth is optional
  gender: Joi.string().valid('male', 'female', 'other').optional(), // Gender is optional with validation
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional(), // Optional phone number with validation
  street: Joi.string().optional(), // Address Street field is optional
  suburb: Joi.string().optional(), // Address Suburb field is optional
  postcode: Joi.string().pattern(/^[0-9]{4,6}$/).optional(), // Optional postcode with validation
  state: Joi.string().optional(), // Address State field is optional
  country: Joi.string().optional(), // Address Country field is optional
  isAdmin: Joi.boolean().required(), // isAdmin flag is required
  isActive: Joi.boolean().required(), // isActive flag is required
});

// Define the validation schema for user updates
const adminUserUpdateSchema = Joi.object({
  password: Joi.string().min(6).optional(), // Password is optional for updates
  firstName: Joi.string().min(2).max(50).required(), // First name is required and must be between 2 and 50 characters
  lastName: Joi.string().min(2).max(50).required(), // Last name is required and must be between 2 and 50 characters
  dob: Joi.date().optional(), // Date of birth is optional
  gender: Joi.string().valid('male', 'female', 'other').optional(), // Gender is optional with validation
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional(), // Optional phone number with validation
  street: Joi.string().optional(), // Address Street field is optional
  suburb: Joi.string().optional(), // Address Suburb field is optional
  postcode: Joi.string().pattern(/^[0-9]{4,6}$/).optional(), // Optional postcode with validation
  state: Joi.string().optional(), // Address State field is optional
  country: Joi.string().optional(), // Address Country field is optional
  isAdmin: Joi.boolean().required(), // isAdmin flag is required
  isActive: Joi.boolean().required(), // isActive flag is required
});

// Export the schema for use in the admin controllers
module.exports = { adminUserCreateSchema, adminUserUpdateSchema };
