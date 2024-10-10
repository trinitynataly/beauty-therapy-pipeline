/*
Version: 1.1
Last edited by: Natalia Pakhomova
Last edit date: 04/08/2024
Routes for user-related operations, including fetching the current user's profile.
*/

// Import the Express framework
const express = require('express');
// Import the protect middleware for protecting routes
const { protectMiddleware } = require('../middlewares/authMiddleware');
// Import the user controller functions
const { getProfile } = require('../controllers/userController');

// Create a new router
const router = express.Router();

// Define the route for fetching the current user's profile
router.get('/profile', protectMiddleware, getProfile);

// Export the router
module.exports = router;
