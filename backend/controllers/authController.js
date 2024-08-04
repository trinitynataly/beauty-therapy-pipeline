/*
Version: 1.1
Last edited by: Natalia Pakhomova
Last edit date: 04/08/2024
Controller functions for user registration and login, including validation and token generation.
*/

/**
 * Register a new user with email and password.
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @returns {object} - the success message
*/
const User = require('../models/user');
// Import the authentication helper functions
const { generateTokens, verifyPassword, verifyToken } = require('../utils/auth');
// Import the authentication validation schemas
const { registerSchema, loginSchema } = require('../validations');

// Register a new user
const register = async (req, res) => {
  // Validate the request body against the register schema
  const { error } = registerSchema.validate(req.body);
  // Check if there are any validation errors
  if (error) {
    // Return an error response
    return res.status(400).json({ error: error.details[0].message });
  }

  // Decompose the request body into individual fields
  const { email, password, firstName, lastName, dob, gender, phone, street, suburb, postcode, state, country } = req.body;
  // Try for any errors
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    // If the user exists
    if (existingUser) {
      // Return an error response
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a new user object
    const user = new User({
      email, // Assign the email
      password, // Assign the password
      firstName, // Assign the first name
      lastName, // Assign the last name
      dob, // Assign the date of birth
      gender, // Assign the gender
      phone, // Assign the phone number
      address: { street, suburb, postcode, state, country } // Assign the address
    });
    // Save the user to the database
    await user.save();
    // Remove the password from the user object
    user.password = undefined;
    // Generate tokens for the user
    const tokens = generateTokens(user);
    // Return created user and tokens
    res.status(201).json({ user, tokens});
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
    const user = await User.findOne({ email });
    // Check if the user exists and the password matches
    if (!user || !(await verifyPassword(password, user.password))) {
      // Return an error response
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Generate tokens for the user
    const tokens = generateTokens(user);
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
  const { refresh_token } = req.body;
  // Check if the refresh token is provided
  if (!refresh_token) {
    // Return an error response
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  // Try for any errors
  try {
    // Verify the refresh token
    const decoded = verifyToken(refresh_token, process.env.JWT_REFRESH_SECRET);
    // Check if the token is valid
    if (!decoded) {
      // Return an error response
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Find the user by the ID in the token
    const user = await User.findById(decoded.user._id);
    // Check if the user exists and is active
    if (!user || !user.isActive) {
      // Return an error response
      return res.status(401).json({ error: 'Invalid user or user is not active' });
    }

    // Generate new tokens for the user
    const tokens = generateTokens(user);
    // Return the new tokens
    res.json(tokens);
  } catch (error) { // Catch any errors
    // Return an error response
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions
module.exports = { register, login, refreshToken };
