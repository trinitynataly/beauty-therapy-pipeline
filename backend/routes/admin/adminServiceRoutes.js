/*
Version: 1.0
Routes for managing services within the admin dashboard.
Only accessible to admin-enabled users.
Last Edited by: Natalia Pakhomova
Last Edit Date: 17/10/2024
*/

// Import the Express framework
const express = require('express');
// Import the multer middleware for handling file uploads
const multer = require('multer');
// Import the service controller functions
const {
  getAllServices, // Get all services
  createService, // Create a new service
  updateService, // Update a service
  deleteService, // Delete a service
} = require('../../controllers/admin/adminServiceController');

// Create a new Express router
const router = express.Router();
// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Define the routes for admin service management
router.get('/', getAllServices); // GET /api/admin/services - Get a list of all services
router.post('/', upload.single('image'), createService); // POST /api/admin/services - Create a new service
router.put('/:id', upload.single('image'), updateService); // PUT /api/admin/services/:id - Update a service by ID
router.delete('/:id', deleteService); // DELETE /api/admin/services/:id - Delete a service by ID

// Export the router
module.exports = router;
