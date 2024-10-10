/*
Version: 1.2
Last edited by: Natalia Pakhomova
Last edit date: 09/10/2024
Middlewares for protecting routes and restricting access to admin-only functions by verifying JWT tokens.
*/

// Import the verifyToken function from the auth utility module
const { verifyToken } = require('../utils/auth');

/**
 * Middleware to protect routes by verifying JWT tokens.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @returns {object} - The response object or calls the next middleware
*/
const protectMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1];
  // Check if the token is present
  if (!token) {
    // Return a 401 Unauthorized response if the token is missing
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Try to verify the token
  try {
    // Verify the token using the verifyToken function from the auth utility module
    const decoded = verifyToken(token);
    // Attach the decoded user ID to the request object
    req.user = decoded.user;
    // Call the next middleware function
    next();
  } catch (error) { // Catch any errors
    // Return a 401 Unauthorized response if the token is invalid
    res.status(401).json({ error: 'Unauthorized' });
  }
};

/**
 * Middleware to protect routes by verifying admin status.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @returns {object} - The response object or calls the next middleware
*/ 
const adminMiddleware = (req, res, next) => {
  // Check if the user exists and is an admin
  if (req.user && req.user.isAdmin) {
    return next(); // Proceed to the next middleware or route handler
  }
  
  // Return an error response if the user is not an admin
  return res.status(403).json({ error: 'Unauthorized' });
}

// Export the protect and admin middleware function
module.exports = { protectMiddleware, adminMiddleware };
