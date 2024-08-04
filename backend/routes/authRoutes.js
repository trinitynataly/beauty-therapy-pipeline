/*
Version: 1.0
Last edited by: Natalia Pakhomova
Last edit date: 04/08/2024
Routes for user authentication, including registration, login, and token refresh.
*/

const express = require('express');
const { register, login, refreshToken } = require('../controllers/authController');

const router = express.Router();

// Define the route for user registration
router.post('/register', register);
// Define the route for user login
router.post('/login', login);
// Define the route for token refresh
router.post('/refresh-token', refreshToken);

// Export the router
module.exports = router;
