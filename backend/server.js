/*
Version: 1.0
Last edited by: Natalia Pakhomova
Last edit date: 04/08/2024
Entry point for starting the Express server.
*/

// Import the Express application from app.js
const app = require('./app');

// Set the server port to the value from the environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  // Log a message to indicate that the server is running
  console.log(`Server running on port ${PORT}`);
});
