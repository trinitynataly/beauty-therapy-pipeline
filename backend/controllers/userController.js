/*
Version: 1.0
Last edited by: Natalia Pakhomova
Last edit date: 04/08/2024
Controller functions for managing user data, including fetching the current user's profile.
*/

// Import the User model
const User = require('../models/user');

/**
 * Get the current user's profile data.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The user profile data
 */
const getProfile = async (req, res) => {
  try {
    // Find the user by ID from the request object (set by the protect middleware)
    const user = await User.findById(req.user).select('-password'); // Exclude the password field

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user profile data
    res.json(user);
  } catch (error) {
    // Return an error response
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions
module.exports = { getProfile };
