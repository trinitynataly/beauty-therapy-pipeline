/*
Version: 1.1
Main routes for admin-related operations, such as user management.
Only accessible to users with isAdmin = true.
Last Edited by: Natalia Pakhomova
Last Edit Date: 16/10/2024
*/

// Import the Express framework
const express = require('express');
// Import the middleware functions for authentication protection
const { protectMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
// Import the admin user routes
const adminUserRoutes = require('./admin/adminUserRoutes');
// Import the admin category routes
const adminCategoryRoutes = require('./admin/adminCategoryRoutes');

const router = express.Router();

// Protect and restrict all routes to admin users only
router.use(protectMiddleware); // Apply authentication protection to all routes
router.use(adminMiddleware); // Apply admin restriction to all routes

// Use adminUserRoutes for handling user management-related operations
router.use('/users', adminUserRoutes); // Base path will be /api/admin/users
// Use adminCategoryRoutes for handling category management-related operations
router.use('/categories', adminCategoryRoutes); // Base path will be /api/admin/categories

// You can define other admin routes here, such as for managing other resources (e.g., products, categories, etc.)

// Export the router
module.exports = router;
