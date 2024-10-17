/*
Version: 1.0
Routes for handling public service-related operations.
Last Edited by: Natalia Pakhomova
Last Edit Date: 17/10/2024
*/

// Import the Express framework
const express = require('express');
// Import the public service controller functions
const { getAllServices } = require('../controllers/serviceController');
// Create a new Express router
const router = express.Router();

// Define the route for listing all services
router.get('/', getAllServices); // GET /api/services - Get a list of all services

// Export the router
module.exports = router;
