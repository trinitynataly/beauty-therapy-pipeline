/*
Version: 1.1
Validation schema for managing services in the admin dashboard.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

// Import the Joi module for data validation
const Joi = require('joi');

/**
 * Validate service data.
 * @param {object} data - The service data to validate
 * @param {boolean} isUpdate - Whether the validation is for an update operation
 * @returns {object} - The result of the validation
 */
const validateService = (data, isUpdate = false) => {
  // Common schema fields
  const schema = {
    name: Joi.string().min(3).max(100).required(), // Name must be between 3 and 100 characters
    description: Joi.string().min(10).max(1000).required(), // Description must be between 10 and 1000 characters
    price: Joi.number().positive().precision(2).required(), // Price must be a positive number with 2 decimal places
    categoryId: Joi.string().required(), // Category ID is required
    isPublished: Joi.boolean().optional(), // isPublished is optional
    slug: Joi.string().min(3).max(100).optional().allow(''), // Slug is optional and allows to be empty (will be auto-generated)
  };

  // If it's an update, make all fields optional
  const validationSchema = isUpdate
    ? Joi.object(schema).fork(Object.keys(schema), (field) => field.optional())
    : Joi.object(schema);

    // Return the validation result
  return validationSchema.validate(data);
};

// Export the validation function
module.exports = { validateService };
