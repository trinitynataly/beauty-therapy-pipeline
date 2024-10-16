/*
Version: 1.3
Last edited by: Natalia Pakhomova
Last edit date: 16/10/2024
Main application file for initializing and configuring the Express server.
*/

// Import the Express library
const express = require('express');
// Import the CORS library
const cors = require('cors');
// Import dotenv for environment variable management
const dotenv = require('dotenv');
// Import Helmet for securing HTTP headers
const helmet = require('helmet');
// Import the function to initialize Firebase
const { initializeFirebase } = require('./config/firebase');

// Load environment variables from .env file, if it exists
dotenv.config();

// Initialize Firebase
initializeFirebase();

// Import the authentication routes
const authRoutes = require('./routes/authRoutes');
// Import the user routes
const userRoutes = require('./routes/userRoutes');
// Import the category routes
const categoryRoutes = require('./routes/categoryRoutes');
// Import the admin routes
const adminRoutes = require('./routes/adminRoutes');


// Read the SERVER_NAME environment variable or use 'localhost' as the default
const SERVER_NAME = process.env.SERVER_NAME || 'localhost';

// Define CORS options
const corsOptions = {
  origin: process.env.CORS_ORIGIN, // Allow the frontend to send requests to the server
  credentials: true, // Enable credentials (cookies, authorization headers)
};


// Create an Express application
const app = express();
// Use Helmet to help secure the application by setting various HTTP headers
app.use(helmet());
// Use CORS with the previously defined options
app.use(cors(corsOptions));
// Use middleware to parse JSON requests
app.use(express.json()); 

// Use authentication routes for all /api/auth endpoints
app.use('/api/auth', authRoutes);
// Use user routes for all /api/user endpoints
app.use('/api/user', userRoutes);
// Use admin routes for all /api/admin endpoints
app.use('/api/admin', adminRoutes);
// Use category routes for all /api/categories endpoints
app.use('/api/categories', categoryRoutes);

// Define a simple route for the root URL
app.get('/', (req, res) => {
  // Send a response with the server name
  res.send(`Server is running on ${SERVER_NAME}`); 
});

// Export the app for use in server.js
module.exports = app;
