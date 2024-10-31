/*
Version: 1.1
Routes for handling public service-related operations.
Last Edited by: Natalia Pakhomova
Last Edit Date: 29/10/2024
*/

// Import the Express framework
const express = require('express');
// Import the public service controller functions
const { getCategoriesWithServices, getServiceBySlug } = require('../controllers/serviceController');
// Create a new Express router
const router = express.Router();

// Define the route for listing all published categories with their published services
router.get('/', getCategoriesWithServices); // GET /api/services - Get a list of all published categories with their published services

// Define the route for getting a service by its slug
router.get('/:slug', getServiceBySlug); // GET /api/services/:slug - Get a service by its slug

// Export the router
module.exports = router;
