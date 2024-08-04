/*
Version: 1.0
Last edited by: Natalia Pakhomova
Last edit date: 04/08/2024
Database connection configuration for MongoDB using Mongoose.
*/

// Import mongoose for MongoDB interaction
const mongoose = require('mongoose');

/**
 * Connect to the MongoDB database.
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string from environment variables or a default local database
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/massage-store', {
      useNewUrlParser: true, // Use the new URL parser
    });
    // Log a success message if connection is successful
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) { // Catch any errors during connection
    // Log the error message to the console
    console.error(`Error: ${error.message}`);
    // Exit the process with failure
    process.exit(1);
  }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;
