/*
Version: 1.2
Last edited by: Natalia Pakhomova
Last edit date: 10/10/2024
Controller functions for managing user data, including fetching the current user's profile.
*/

// Import the Firestore instance
const admin = require('firebase-admin');
// Create a new Firestore client
const db = admin.firestore();

/**
 * Get the current user's profile data.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The user profile data
 */
const getProfile = async (req, res) => {
  try {
    // Find the user by ID from the request object (set by the protect middleware)
    const userRef = db.collection('users').doc(req.user.email);
    // Get the user document from Firestore
    const userDoc = await userRef.get();
    // Check if the user exists
    if (!userDoc.exists) {
      // Return a 404 error if the user is not found
      return res.status(404).json({ error: 'User not found' });
    }
    // Get the user profile data
    const userProfile = userDoc.data();
    // Remove the password field from the user profile data if it exists
    delete userProfile.password;
    // Return the user profile data without the password field
    res.json(userProfile);
  } catch (error) {
    // Return an error response
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions
module.exports = { getProfile };
