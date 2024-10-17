/*
Version: 1.0
Controller for handling public service-related operations.
Allows unauthenticated users to list all services.
Last Edited by: Natalia Pakhomova
Last Edit Date: 17/10/2024
*/

// Import the Firestore instance
const admin = require('firebase-admin');
// Create a Firestore client instance
const db = admin.firestore();

/**
 * Get a list of all services.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {array} - List of services
 */
const getAllServices = async (req, res) => {
  try {
    // Get all services from the Firestore collection
    const snapshot = await db.collection('services').get();
    // Create an array to store the services
    const services = [];
    // Loop through the snapshot and add each service to the array
    snapshot.forEach((doc) => {
      const service = doc.data();
      // Add the service to the array
      services.push({
        id: doc.id, // Add the document ID as the service ID
        name: service.name, // Add the service name
        description: service.description, // Add the service description
        categoryId: service.categoryId, // Add the service category ID
        imageUrl: service.imageUrl, // Add the service image URL
      });
    });
    // Send the array of services as the response
    res.json(services);
  } catch (error) {
    // Catch any errors and send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
};

// Export the controller function
module.exports = { getAllServices };
