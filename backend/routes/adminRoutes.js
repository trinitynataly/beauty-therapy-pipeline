/*
Version: 1.3
Main routes for admin-related operations, such as user management. These routes aree only accessible to users with isAdmin = true.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

// Import the Express framework
const express = require('express');
// Import the middleware functions for authentication protection
const { protectMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
// Import the admin user routes
const adminUserRoutes = require('./admin/adminUserRoutes');
// Import the admin category routes
const adminCategoryRoutes = require('./admin/adminCategoryRoutes');
// Import the admin service routes
const adminServiceRoutes = require('./admin/adminServiceRoutes');

const router = express.Router();

// Protect and restrict all routes to admin users only
router.use(protectMiddleware); // Apply authentication protection to all routes
router.use(adminMiddleware); // Apply admin restriction to all routes

// Use adminUserRoutes for handling user management-related operations
router.use('/users', adminUserRoutes); // Base path will be /api/admin/users
// Use adminCategoryRoutes for handling category management-related operations
router.use('/categories', adminCategoryRoutes); // Base path will be /api/admin/categories
// Use adminServiceRoutes for handling service management-related operations
router.use('/services', adminServiceRoutes); // Base path will be /api/admin/services

// Export the router
module.exports = router;
