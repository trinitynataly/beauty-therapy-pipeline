/*
Version: 1.0
Routes for handling cart-related operations.
Last Edited by: Natalia Pakhomova
Last Edit Date: 31/10/2024
*/

// Import the Express framework
const express = require('express');
// Import the protect middleware for protecting routes
const { protectMiddleware } = require('../middlewares/authMiddleware');
// Import the cart controller functions
const { addToCart, updateCartItem, deleteCartItem, getCartItems } = require('../controllers/cartController');

// Create a new router
const router = express.Router();

// Define the route for getting all items in the user's cart
router.get('/', protectMiddleware, getCartItems); // GET /api/cart - Get all items in the user's cart

// Define the route for adding or increasing an item in the cart
router.post('/', protectMiddleware, addToCart); // POST /api/cart - Add or increase an item in the cart

// Define the route for updating the quantity of an item in the cart
router.put('/:serviceId', protectMiddleware, updateCartItem); // PUT /api/cart/:serviceId - Update the quantity of an item in the cart

// Define the route for deleting an item from the cart
router.delete('/:serviceId', protectMiddleware, deleteCartItem); // DELETE /api/cart/:serviceId - Delete an item from the cart

// Export the router
module.exports = router;
