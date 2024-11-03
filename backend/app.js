/*
Version: 1.5
Main application file for initializing and configuring the Express server.
Last edited by: Natalia Pakhomova
Last edit date: 03/11/2024
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
// Import Morgan for request logging
const morgan = require('morgan');

// Load environment variables from .env file, if it exists
dotenv.config();

// Initialize Firebase
initializeFirebase();

// Import the routes configuration file
const router = require('./routes/routes');

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
// Use Morgan for logging HTTP requests in "combined" format
app.use(morgan('combined'));

// Use the main router for all /api endpoints
app.use('/api', router);

// Define a simple route for the root URL
app.get('/', (req, res) => {
  // Send a response with the server name
  res.send(`Server is running on ${SERVER_NAME}`);
});

// 404 Error Handler - Catch undefined routes and return JSON response
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource could not be found.',
  });
});

// General Error Handler - Handle server errors (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server. Please try again later.',
  });
});

// Export the app for use in server.js
module.exports = app;
