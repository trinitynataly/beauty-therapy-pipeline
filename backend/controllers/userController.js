/*
Version: 1.4
Controller functions for managing user data, including fetching the current user's profile.
Last edited by: Natalia Pakhomova
Last edit date: 05/11/2024
*/

// Import the Firestore instance
const admin = require('firebase-admin');
// Create a new Firestore client
const db = admin.firestore();
// Import the authentication helper functions
const { verifyPassword, hashPassword } = require('../utils/auth');

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

/**
 * Edit the current user's profile data.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The updated user profile data
 */
const editProfile = async (req, res) => {
  try {
    // Get the user's email from the request object
    const userEmail = req.user.email;
    // Get the updated profile fields from the request body
    const { firstName, lastName, dob, gender, phone, street, suburb, postcode, state, country } = req.body;

    // Create an object with the updated fields
    const updatedProfile = {
      firstName, // Update the first name
      lastName, // Update the last name
      dob, // Update the date of birth
      gender, // Update the gender
      phone,  // Update the phone number
      address: { street, suburb, postcode, state, country }, // Update the address object
      updatedAt: new Date().toISOString(), // Update the updated timestamp
    };

    // Remove any undefined fields
    Object.keys(updatedProfile).forEach(key => {
      if (updatedProfile[key] === undefined) { // Check if the field is undefined
        delete updatedProfile[key]; // Delete the field from the object
      }
    });

    // Get the user document from Firestore by email
    const userRef = db.collection('users').doc(userEmail);
    // Update the user profile data in Firestore
    await userRef.update(updatedProfile);

    // Get the updated user profile
    const updatedUserDoc = await userRef.get();
    // Get the updated user profile data
    const updatedUserProfile = updatedUserDoc.data();
    // Remove the password field from the user profile data if it exists
    delete updatedUserProfile.password;

    // Return the updated user profile data
    res.json(updatedUserProfile);
  } catch (error) {
    // Return an error response
    res.status(500).json({ error: error.message });
  }
};

/**
 * Change the current user's password.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Success message
 */
const changePassword = async (req, res) => {
  try {
    // Get the user's email from the request object
    const userEmail = req.user.email;
    // Get the current password and new password from the request body
    const { currentPassword, newPassword } = req.body;

    // Check if both passwords are provided
    if (!currentPassword || !newPassword) {
      // Return an error if either password is missing
      return res.status(400).json({ error: 'Both current and new passwords are required.' });
    }

    // Get the user document from Firestore
    const userRef = db.collection('users').doc(userEmail);
    // Get the user data
    const userDoc = await userRef.get();

    // Check if the user exists
    if (!userDoc.exists) {
      // Return an error if the user is not found
      return res.status(400).json({ error: 'User not found' });
    }

    // Verify the current password
    const user = userDoc.data();
    // Check if the current password is valid
    const isPasswordValid = await verifyPassword(currentPassword, user.password);
    // Return an error if the current password is incorrect
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect.' });
    }

    // Hash the new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update the user's password in Firestore
    await userRef.update({
      password: hashedNewPassword, // Update the password field
      updatedAt: new Date().toISOString(), // Update the updated timestamp
    });

    // Return a success message
    res.json({ message: 'Password has been changed successfully.' });
  } catch (error) {
    // Return an error response
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions
module.exports = { getProfile, editProfile, changePassword };