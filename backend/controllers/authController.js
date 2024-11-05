/*
Version: 1.3
Last edited by: Natalia Pakhomova
Last edit date: 10/10/2024
Controller functions for user registration and login, including validation and token generation.
*/

// Import the Firestore instance
const admin = require('firebase-admin');
// Create a new Firestore client
const db = admin.firestore();
// Import the authentication helper functions
const { generateTokens, verifyPassword, verifyToken, hashPassword } = require('../utils/auth');
// Import the authentication validation schemas
const { registerSchema, loginSchema } = require('../validations/authValidation');

/**
 * Register a new user with email and password.
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @returns {object} - the success message
*/
const register = async (req, res) => {
  // Validate the request body against the register schema
  const {value, error } = registerSchema.validate(req.body);
  // Check if there are any validation errors
  if (error) {
    // Return an error response
    return res.status(400).json({ error: error.details[0].message });
  }

  // Decompose the request body into individual fields
  const { email, password, firstName, lastName, dob, gender, phone, street, suburb, postcode, state, country } = value;
  // Try for any errors
  try {
    // Check if the email already exists
    const userRef = db.collection('users').doc(email);
    // Get the user document from Firestore
    const userDoc = await userRef.get();
    // If the user exists
    if (userDoc.exists) {
      // Return an error response
      return res.status(400).json({ error: 'Email already exists' });
    }

    // hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user object
    const user = {
      email, // user email
      password: hashedPassword, // hashed password
      firstName, // user first name
      lastName, // user last name
      dob, // user date of birth
      gender, // user gender
      phone, // user phone number
      address: { street, suburb, postcode, state, country }, // user address
      isAdmin: false, // user is not an admin
      isActive: true, // user is active
      stripeToken: '', // user stripe token
      createdAt: new Date().toISOString(), // user creation date
      updatedAt: new Date().toISOString() // user update date
    };

    // Save the user to the database
    await userRef.set(user);
    // Remove the password from the user object
    user.password = undefined;
    // Generate tokens for the user
    const tokens = generateTokens(user);
    // Return created user and tokens
    res.status(201).json(tokens);
  } catch (error) { // Catch any errors
    // Return an error response
    res.status(400).json({ error: error.message });
  }
};

/**
 * Login a user with email and password.
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @returns {object} - the JWT tokens
*/
const login = async (req, res) => {
  // Validate the request body against the login schema
  const { error } = loginSchema.validate(req.body);
  // Check if there are any validation errors
  if (error) {
    // Return an error response
    return res.status(400).json({ error: error.details[0].message });
  }

  // Decompose the request body into individual fields
  const { email, password } = req.body;
  // Try for any errors
  try {
    // Find the user by email
    const userRef = db.collection('users').doc(email);
    // Get the user document from Firestore
    const userDoc = await userRef.get();
    // Check if the user exists and the password matches
    if (!userDoc.exists || !(await verifyPassword(password, userDoc.data().password))) {
      // Return an error response
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Generate tokens for the user
    const tokens = generateTokens(userDoc.data());
    // Return the tokens
    res.json(tokens);
  } catch (error) { // Catch any errors
    // Return an error response
    res.status(500).json({ error: error.message });
  }
};

/**
 * Refresh JWT tokens using a refresh token.
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @returns {object} - the new JWT tokens
*/
const refreshToken = async (req, res) => {
  // Get the refresh token from the request body
  const { refreshToken } = req.body;
  // Check if the refresh token is provided
  if (!refreshToken) {
    // Return an error response
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  // Try for any errors
  try {
    // Verify the refresh token
    const decoded = verifyToken(refreshToken);
    // Check if the token is valid
    if (!decoded) {
      // Return an error response
      return res.status(401).json({ error: 'Refresh token is invalid or expired' });
    }

    // Find the user by the ID in the token (email)
    const userRef = db.collection('users').doc(decoded.user.email);
    // Get the user document from Firestore
    const userDoc = await userRef.get();
    // Check if the user exists and is active
    if (!userDoc.exists || !userDoc.data().isActive) {
      // Return an error response
      return res.status(401).json({ error: 'Refresh token is invalid or expired' });
    }

    // Generate new tokens for the user
    const tokens = generateTokens(userDoc.data());
    // Return the new tokensf
    res.json(tokens);
  } catch (error) { // Catch any errors
    // Return an error response
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions
module.exports = { register, login, refreshToken };
