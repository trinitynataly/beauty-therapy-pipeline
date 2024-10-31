/*
Version: 1.1
Routes configuration file for importing and managing all application routes.
Last edited by: Natalia Pakhomova
Last edit date: 31/10/2024
*/

// Import the Express framework
const express = require('express');
// Import the authentication routes
const authRoutes = require('./authRoutes');
// Import the user routes
const userRoutes = require('./userRoutes');
// Import the category routes
const categoryRoutes = require('./categoryRoutes');
// Import the service routes
const serviceRoutes = require('./serviceRoutes');
// Import the cart routes
const cartRoutes = require('./cartRoutes');
// Import the admin routes
const adminRoutes = require('./adminRoutes');

// Create a new Express router
const router = express.Router();

// Use authentication routes for all /api/auth endpoints
router.use('/auth', authRoutes);
// Use user routes for all /api/user endpoints
router.use('/user', userRoutes);
// Use category routes for all /api/categories endpoints
router.use('/categories', categoryRoutes);
// Use service routes for all /api/services endpoints
router.use('/services', serviceRoutes);
// Use cart routes for all /api/cart endpoints
router.use('/cart', cartRoutes);
// Use admin routes for all /api/admin endpoints
router.use('/admin', adminRoutes);

// Export the router
module.exports = router;
