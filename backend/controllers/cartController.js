/*
Version: 1.0
Controller for handling cart-related operations.
Allows users to add, update, and delete items from their cart.
Last Edited by: Natalia Pakhomova
Last Edit Date: 31/10/2024
*/

// Import the Firestore instance
const admin = require('firebase-admin');
// Create a Firestore client instance
const db = admin.firestore();

/**
 * Add or increase an item in the cart.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The added or updated cart item
 */
const addToCart = async (req, res) => {
  // Get the service ID and quantity from the request body
  const { serviceId, quantity = 1 } = req.body;
  // Get the user's email from the request object
  const userEmail = req.user?.email;

  // Check if the user is authenticated
  if (!userEmail) {
    // Return an error if the user is not authenticated
    return res.status(401).json({ error: 'User not authenticated.' });
  }
  // Check if the service ID is provided
  if (!serviceId) {
    // Return an error if the service ID is missing
    return res.status(400).json({ error: 'Service ID is required.' });
  }

  // Ensure the quantity is at least 1
  const validQuantity = quantity < 1 ? 1 : quantity;

  try {
    // Get the service document from Firestore
    const serviceRef = db.collection('services').doc(serviceId);
    // Get the service document data
    const serviceDoc = await serviceRef.get();

    // Verify if the service exists and is published
    if (!serviceDoc.exists || !serviceDoc.data().isPublished) {
      // Return an error if the service is not found or not published
      return res.status(404).json({ error: 'Service not found or not published.' });
    }

    // Get the category document from Firestore
    const categoryRef = db.collection('categories').doc(serviceDoc.data().categoryId);
    // Get the category document data
    const categoryDoc = await categoryRef.get();

    // Verify if the category exists and is published
    if (!categoryDoc.exists || !categoryDoc.data().isPublished) {
      // Return an error if the category is not found or not published
      return res.status(404).json({ error: 'Service category not found or not published.' });
    }

    // Check if the item already exists in the user's cart
    const cartSnapshot = await db.collection('cart')
      .where('userId', '==', userEmail)
      .where('serviceId', '==', serviceId)
      .get();

    // Check if the cart item already exists
    if (!cartSnapshot.empty) {
      // Get the reference to the existing cart item
      const cartItemRef = cartSnapshot.docs[0].ref;
      // Get the existing quantity from the cart item
      const existingQuantity = cartSnapshot.docs[0].data().quantity;
      // Update the cart item with the new quantity
      await cartItemRef.update({
        quantity: existingQuantity + validQuantity, // Increase the quantity
        updatedAt: new Date().toISOString(), // Update the updated timestamp
      });
      // Return a success message
      return res.json({ message: 'Cart item quantity updated.' });
    }

    // Create a new cart item in Firestore
    const newCartItemRef = db.collection('cart').doc();
    // Create a new cart item object
    const newCartItem = {
      userId: userEmail, // User's email
      serviceId, // Service ID
      quantity: validQuantity, // Quantity
      createdAt: new Date().toISOString(), // Created timestamp
      updatedAt: new Date().toISOString(), // Updated timestamp
    };

    // Set the new cart item in Firestore
    await newCartItemRef.set(newCartItem);
    // Return the new cart item data
    res.status(201).json({ id: newCartItemRef.id, ...newCartItem });
  } catch (error) { // Catch any errors
    // Return an error response
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update the quantity of an item in the cart.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The updated cart item
 */
const updateCartItem = async (req, res) => {
  const { serviceId } = req.params; // Get the service ID from the request parameters
  const { quantity } = req.body; // Get the quantity from the request body
  const userEmail = req.user?.email; // Get the user's email from the request object

  // Check if the user is authenticated
  if (!userEmail) {
    // Return an error if the user is not authenticated
    return res.status(401).json({ error: 'User not authenticated.' });
  }
  // Check if the quantity is provided and valid
  if (!quantity || quantity < 1) {
    // Return an error if the quantity is missing or invalid
    return res.status(400).json({ error: 'Quantity must be at least 1.' });
  }

  // Try to update the cart item in Firestore
  try {
    // Find the cart item by user ID and service ID
    const cartSnapshot = await db.collection('cart')
      .where('userId', '==', userEmail) // Filter by user ID
      .where('serviceId', '==', serviceId) // Filter by service ID
      .get(); // Get the cart item

    // Check if the cart item exists
    if (cartSnapshot.empty) {
      // Return an error if the cart item is not found
      return res.status(404).json({ error: 'Cart item not found.' });
    }

    // Get the reference to the cart item
    const cartItemRef = cartSnapshot.docs[0].ref;
    // Update the cart item with the new quantity and updated timestamp
    await cartItemRef.update({
      quantity, // Update the quantity
      updatedAt: new Date().toISOString(), // Update the updated timestamp
    });

    // Return a success message
    res.json({ message: 'Cart item quantity updated.' });
  } catch (error) { // Catch any errors
    // Return an error response
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete an item from the cart.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {string} - Success message
 */
const deleteCartItem = async (req, res) => {
  // Get the service ID from the request parameters
  const { serviceId } = req.params;
  // Get the user's email from the request object
  const userEmail = req.user?.email;

  // Check if the user is authenticated
  if (!userEmail) {
    // Return an error if the user is not authenticated
    return res.status(401).json({ error: 'User not authenticated.' });
  }

  // Try to delete the cart item from Firestore
  try {
    // Find the cart item by user ID and service ID
    const cartSnapshot = await db.collection('cart')
      .where('userId', '==', userEmail) // Filter by user ID
      .where('serviceId', '==', serviceId) // Filter by service ID
      .get(); // Get the cart item

    // Check if the cart item exists
    if (cartSnapshot.empty) {
      // Return an error if the cart item is not found
      return res.status(404).json({ error: 'Cart item not found.' });
    }

    // Get the reference to the cart item
    const cartItemRef = cartSnapshot.docs[0].ref;
    // Delete the cart item from Firestore
    await cartItemRef.delete();
    // Return a success message
    res.json({ message: `Cart item with service ID ${serviceId} has been deleted.` });
  } catch (error) { // Catch any errors
    // Return an error response
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get all items in the cart for a user.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {array} - List of cart items
 */
const getCartItems = async (req, res) => {
  // Get the user's email from the request object
  const userEmail = req.user?.email;

  // Check if the user is authenticated
  if (!userEmail) {
    // Return an error if the user is not authenticated
    return res.status(401).json({ error: 'User not authenticated.' });
  }

  // Try to get the cart items from Firestore
  try {
    // Find all cart items for the user
    const cartSnapshot = await db.collection('cart').where('userId', '==', userEmail).get();
    // Create an array to store the cart items
    const cartItems = [];

    // Loop through each cart item and add it to the array
    cartSnapshot.forEach((doc) => {
      // Add the cart item data to the array
      cartItems.push({ id: doc.id, ...doc.data() });
    });

    // Return the list of cart items
    res.json(cartItems);
  } catch (error) { // Catch any errors
    // Return an error response
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions
module.exports = { addToCart, updateCartItem, deleteCartItem, getCartItems };
