/*
Version: 1.1
Routes for user authentication, including registration, login, and token refresh.
Last edited by: Natalia Pakhomova
Last edit date: 05/11/2024
*/

// Import the Express framework
const express = require('express');
// Import the auth controller functions
const { register, login, refreshToken } = require('../controllers/authController');

// Create a new router instance
const router = express.Router();

// Define the route for user registration
router.post('/register', register);
// Define the route for user login
router.post('/login', login);
// Define the route for token refresh
router.post('/refresh-token', refreshToken);

// Export the router
module.exports = router;
