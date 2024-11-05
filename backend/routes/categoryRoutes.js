/*
Version: 1.1
Routes for handling public category-related operations.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

// Import the Express framework
const express = require('express');
// Import the public category controller functions
const { getAllCategories } = require('../controllers/categoryController');

// Create a new Express router
const router = express.Router();

// Define the route for listing all categories
router.get('/', getAllCategories); // GET /api/categories - Get a list of all categories

// Export the router
module.exports = router;
