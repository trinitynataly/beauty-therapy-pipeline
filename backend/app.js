/*
Version: 1.1
Last edited by: Natalia Pakhomova
Last edit date: 0/08/2024
Main application file for initializing and configuring the Express server.
*/

// Import the Express library
const express = require('express');
// Import dotenv for environment variable management
const dotenv = require('dotenv');
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


// Read the SERVER_NAME environment variable or use 'localhost' as the default
const SERVER_NAME = process.env.SERVER_NAME || 'localhost';



// Create an Express application
const app = express();
// Use middleware to parse JSON requests
app.use(express.json()); 

// Use authentication routes for all /api/auth endpoints
app.use('/api/auth', authRoutes);
// Use user routes for all /api/user endpoints
app.use('/api/user', userRoutes);

// Define a simple route for the root URL
app.get('/', (req, res) => {
  // Send a response with the server name
  res.send(`Server is running on ${SERVER_NAME}`); 
});

// Export the app for use in server.js
module.exports = app;
