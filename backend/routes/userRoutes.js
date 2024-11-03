/*
Version: 1.2
Routes for user-related operations, including fetching the current user's profile.
Last edited by: Natalia Pakhomova
Last edit date: 03/11/2024
*/

// Import the Express framework
const express = require('express');
// Import the protect middleware for protecting routes
const { protectMiddleware } = require('../middlewares/authMiddleware');
// Import the user controller functions
const { getProfile, editProfile, changePassword } = require('../controllers/userController');

// Create a new router
const router = express.Router();

// Define the route for fetching the current user's profile
router.get('/', protectMiddleware, getProfile);
// Define the route for updating the current user's profile
router.put('/', protectMiddleware, editProfile);
// Define the route for changing the current user's password
router.put('/password', protectMiddleware, changePassword);

// Export the router
module.exports = router;
