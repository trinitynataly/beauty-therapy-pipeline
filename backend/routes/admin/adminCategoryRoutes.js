/*
Version: 1.1
Routes for managing categories within the admin dashboard.
Only accessible to admin-enabled users.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

// Import express library
const express = require('express');
// Import multer library for handling file uploads
const multer = require('multer');
// Import the category controller functions
const {
  getAllCategories, // Get all categories
  createCategory, // Create a new category
  updateCategory, // Update a category by ID
  deleteCategory, // Delete a category by ID
} = require('../../controllers/admin/adminCategoryController');

// Create a new router instance
const router = express.Router();
// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Define the routes for admin category management
router.get('/', getAllCategories); // GET /api/admin/categories - Get a list of all categories
router.post('/', upload.single('image'), createCategory); // POST /api/admin/categories - Create a new category
router.put('/:id', upload.single('image'), updateCategory); // PUT /api/admin/categories/:id - Update a category by ID
router.delete('/:id', deleteCategory); // DELETE /api/admin/categories/:id - Delete a category by ID

// Export the router
module.exports = router;
