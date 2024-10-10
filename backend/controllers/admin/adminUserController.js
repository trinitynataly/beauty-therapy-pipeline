/*
Version: 1.0
Controller functions for managing users in the admin dashboard.
Only accessible to users with isAdmin = true.
Last Edited by: Natalia Pakhomova
Last Edit Date: 10/09/2024
*/

// Import the Firestore instance
const admin = require('firebase-admin');
// Create a new Firestore client
const db = admin.firestore();
// Import the Joi validation schema
const { adminUserCreateSchema, adminUserUpdateSchema } = require('../../validations/adminUserValidation');
// Import the hashPassword helper function
const { hashPassword } = require('../../utils/auth');

/**
 * Get a list of all users.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {array} - List of user profiles
 */
const getAllUsers = async (req, res) => {
  try {
    // Get all users from the Firestore collection
    const snapshot = await db.collection('users').get();
    // Create an empty array to store the users
    const users = [];
    // Loop through the snapshot and add each user to the array
    snapshot.forEach((doc) => {
      // Get the user data
      const user = doc.data();
      // Remove the password field before adding to the array
      delete user.password;
      // Add the user to the array
      users.push(user);
    });
    // Send the array of users as the response
    res.json(users);
  } catch (error) { // Catch any errors and send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
};

/**
 * Create a new user.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The created user profile
 */
const createUser = async (req, res) => {
  // Validate the request body against the Joi schema
  const { value, error } = adminUserCreateSchema.validate(req.body);
  // Check if there are any validation errors
  if (error) {
    // If there are errors, send a 400 response with the error message
    return res.status(400).json({ error: error.details[0].message });
  }

  // Extract the user profile fields from the request body
  const {
    email, // Email is used as the document ID
    password, // Password will be hashed before storing
    firstName, // First name
    lastName, // Last name
    dob, // Date of birth
    gender, // gender
    phone, // Phone number
    street, // Address fields - street
    suburb, // Address fields - suburb
    postcode, // Address fields - postcode
    state, // Address fields - state
    country, // Address fields - country
    isAdmin, // isAdmin flag
    isActive // isActive flag
  } = value;

  try {
    // Check if the email already exists
    const userRef = db.collection('users').doc(email);
    // Get the user document
    const userDoc = await userRef.get();
    // Check if the user document exists
    if (userDoc.exists) {
      // If the user document exists, send a 400 response with an error message
      return res.status(400).json({ error: 'User with this email already exists.' });
    }
    // Hash the password before storing
    const hashedPassword = await hashPassword(password);

    // Create a new user object with full profile fields
    const newUser = {
      email, // Email is used as the document ID
      password: hashedPassword, // hashed password
      firstName, // First name
      lastName, // Last name
      dob, // Date of birth
      gender, // gender
      phone, // Phone number
      address: { street, suburb, postcode, state, country }, // Address object
      isAdmin: isAdmin || false, // Default to non-admin
      isActive: isActive || true, // Default to active
      createdAt: new Date().toISOString(), // Created timestamp
      updatedAt: new Date().toISOString(), // Updated timestamp
    };

    // Save the user to Firestore
    await userRef.set(newUser);

    // Remove password before returning the response
    newUser.password = undefined;
    // Send a 201 response with the created user profile
    res.status(201).json(newUser);
  } catch (error) { // Catch any errors and send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update an existing user by ID (email).
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The updated user profile
 */
const updateUser = async (req, res) => {
  // Extract the email parameter from the request URL
  const { email } = req.params;

  // Validate the request body against the Joi schema
  const { value, error } = adminUserUpdateSchema.validate(req.body);

  // Check if there are any validation errors
  if (error) {
    // If there are errors, send a 400 response with the error message
    return res.status(400).json({ error: error.details[0].message });
  }

  // Extract the user profile fields from the request body
  const {
    password, // Password
    firstName, // First name
    lastName, // Last name
    dob, // Date of birth
    gender, // Gender
    phone, // Phone number
    street, // Address fields - street
    suburb, // Address fields - suburb
    postcode, // Address fields - postcode
    state, // Address fields - state
    country, // Address fields - country
    isAdmin, // isAdmin flag
    isActive // isActive flag
  } = value;

  try {
    // Find the user by email
    const userRef = db.collection('users').doc(email);
    // Get the user document
    const userDoc = await userRef.get();
    // Check if the user document exists
    if (!userDoc.exists) {
      // If the user document does not exist, send a 404 response with an error message
      return res.status(404).json({ error: 'User not found.' });
    }

    // Prepare the updated user data
    const updatedUser = {
      firstName, // First name
      lastName, // Last name
      dob, // Date of birth
      gender, // Gender
      phone, // Phone number
      address: { street, suburb, postcode, state, country }, // Address object
      isAdmin: isAdmin, // Is admin flag
      isActive: isActive, // Is active flag
      updatedAt: new Date().toISOString(), // Updated timestamp
    };

    // If a new password is provided, hash it before updating
    if (password) {
      updatedUser.password = await hashPassword(password);
    }

    // Update the user document in Firestore
    await userRef.update(updatedUser);
    // Remove password before returning
    updatedUser.password = undefined; 
    // Send a 200 response with the updated user profile
    res.json({ email, ...updatedUser });
    // Catch any errors and send a 500 response with the error message
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a user by ID.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {string} - Success message
 */
const deleteUser = async (req, res) => {
  // Extract the email parameter from the request URL
  const { email } = req.params;

  try {
    // Find the user by email
    const userRef = db.collection('users').doc(email);
    // Get the user document
    const userDoc = await userRef.get();
    // Check if the user document exists
    if (!userDoc.exists) {
      // If the user document does not exist, send a 404 response with an error message
      return res.status(404).json({ error: 'User not found.' });
    }
    // check if user is currently logged in
    if (req.user.email === email) {
      // If the user is currently logged in, send a 403 response with an error message
      return res.status(403).json({ error: 'Cannot delete yourself!' });
    }

    // Delete the user document from Firestore
    await userRef.delete();
    // Send a 200 response with a success message
    res.json({ message: `User with email ${email} has been deleted.` });
  } catch (error) {
    // Catch any errors and send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions
module.exports = { getAllUsers, createUser, updateUser, deleteUser };