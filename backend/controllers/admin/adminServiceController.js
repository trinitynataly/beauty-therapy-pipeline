/*
Version: 1.2
Controller functions for managing services in the admin dashboard.
Only accessible to users with isAdmin = true.
Last Edited by: Natalia Pakhomova
Last Edit Date: 31/10/2024
*/

// Import the Firebase Admin SDK
const admin = require('firebase-admin');
// Import the Joi module for input validation
const Joi = require('joi');
// Import the slugify module for generating slugs
const { validateService } = require('../../validations/adminServiceValidation');
// Import the slugify module for generating slugs
const slugify = require('slugify');
// Init a Firestore client
const db = admin.firestore();
// Init a Firebase Storage client
const bucket = admin.storage().bucket();

/**
 * Get a list of all services.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {array} - List of service profiles
 */
const getAllServices = async (req, res) => {
  try {
    // Get all services from the Firestore collection
    const servicesSnapshot = await db.collection('services').get();
    // Get all categories from the Firestore collection
    const categoriesSnapshot = await db.collection('categories').get();

    // Create a map of category IDs to category names
    const categoriesMap = {};
    // Loop through the categories and add each category to the map
    categoriesSnapshot.forEach((doc) => {
      // Add the category to the map
      categoriesMap[doc.id] = doc.data().name;
    });

    // Create an array to store the services
    const services = [];
    // Loop through the services and add each service to the array
    servicesSnapshot.forEach((doc) => {
      // Add the service to the array
      const service = doc.data();
      // Populate the service with the data
      services.push({
        id: doc.id, // Add the document ID as the service ID
        ...service, // Add the rest of the service data
        categoryName: categoriesMap[service.categoryId] || 'Unknown Category', // Add the category name
      });
    });

    // Send the array of services as the response
    res.json(services);
  } catch (error) {
    // Catch any errors and send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
};

/**
 * Create a new service.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The created service profile
 */
const createService = async (req, res) => {
  // Validate the request body using Joi schema
  const { error } = validateService(req.body);
  // Return a 400 response if validation fails
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Destructure the request body
  let { name, description, price, categoryId, isPublished = true, slug } = req.body;
  // Get the image file from the request
  const imageFile = req.file;

  // Check if the image file is provided
  if (!imageFile) {
    // Return a 400 response with an error message if the image is missing
    return res.status(400).json({ error: 'Image is required.' });
  }

  // Check if price is a string and convert it to a number
  if (typeof price === 'string') {
    price = parseFloat(price);
  }
  // Check if isPublished is a string and convert it to a boolean
  if (typeof isPublished === 'string') {
    isPublished = isPublished.toLowerCase() === 'true';
  }
  // Save the new service to Firestore
  try {
    // Create a new service document reference
    const newServiceRef = db.collection('services').doc();

    // Create a new image name
    const imageName = `${newServiceRef.id}_${Date.now()}`;
    // Upload the image to Firebase Storage
    const file = bucket.file(`services/${imageName}`);
    // Save the image buffer to the file in Firebase Storage
    await file.save(imageFile.buffer, {
      // Set the image metadata
      metadata: { contentType: imageFile.mimetype },
    });

    // Get public URL for the uploaded image
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/services/${imageName}`;

    // Generate slug if not provided
    const serviceSlug = slug ? slug : slugify(name, { lower: true, strict: true });

    // Create a new service
    const newService = {
      name, // Add the service name
      description, // Add the service description
      price, // Add the service price
      categoryId, // Add the service category ID
      imageUrl, // Add the service image URL
      isPublished, // Add the service published status
      slug: serviceSlug, // Add the service slug
      createdAt: new Date().toISOString(), // Add the creation timestamp
      updatedAt: new Date().toISOString(), // Add the update timestamp
    };

    // Save the new service document to Firestore
    await newServiceRef.set(newService);
    // Send the new service as the response
    res.status(201).json({ id: newServiceRef.id, ...newService });
  } catch (error) {
    // Catch any errors and send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update an existing service by ID.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The updated service profile
 */
const updateService = async (req, res) => {
  const { id } = req.params; // Get the service ID from the request parameters
  const { error } = validateService(req.body, true); // Validate the request body using Joi schema
  if (error) { // Return a 400 response if validation fails
    return res.status(400).json({ error: error.details[0].message });
  }

  // Destructure the request body
  let { name, description, price, categoryId, isPublished, slug } = req.body;
  // Get the image file from the request
  const imageFile = req.file;

  // Check if price is a string and convert it to a number
  if (typeof price === 'string') {
    // Convert the price to a float
    price = parseFloat(price);
  }

  // Check if isPublished is a string and convert it to a boolean
  if (typeof isPublished === 'string') {
    // Convert isPublished to lowercase
    isPublished = isPublished.toLowerCase() === 'true';
  }

  // Update the service document
  try {
    // Get the service document reference
    const serviceRef = db.collection('services').doc(id);
    // Get the service document
    const serviceDoc = await serviceRef.get();

    // Return a 404 response if the service is not found
    if (!serviceDoc.exists) {
      return res.status(404).json({ error: 'Service not found.' });
    }

    // Create an object to store the updated data
    const updatedData = {
      // Set the update timestamp
      updatedAt: new Date().toISOString(),
    };

    // Update the service data if provided
    if (name) updatedData.name = name;
    // Update the service description if provided
    if (description) updatedData.description = description;
    // Update the service price if provided
    if (price !== undefined) updatedData.price = price;
    // Update the service category ID if provided
    if (categoryId) updatedData.categoryId = categoryId;
    // Update the service published status if provided
    if (isPublished !== undefined) updatedData.isPublished = isPublished;
    // Update the service slug if provided
    if (slug) {
      updatedData.slug = slug;
    } else if (name) { 
      // Otherwise, generate a new slug from the name
      updatedData.slug = slugify(name, { lower: true, strict: true });
    }

    // Update the service image if provided
    if (imageFile) {
      // Create a new image name
      const imageName = `${id}_${Date.now()}`;
      // Upload the new image to Firebase Storage
      const file = bucket.file(`services/${imageName}`);
      // Save the new image buffer to the file in Firebase
      await file.save(imageFile.buffer, {
        // Set the image metadata with the content type
        metadata: { contentType: imageFile.mimetype },
      });

      // Get public URL for the new image
      updatedData.imageUrl = `https://storage.googleapis.com/${bucket.name}/services/${imageName}`;
    }

    // Update the service document with the new data
    await serviceRef.update(updatedData);
    // Return the updated service profile
    res.json({ id, ...updatedData });
  } catch (error) {
    // Catch any errors and send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a service by ID.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {string} - Success message
 */
const deleteService = async (req, res) => {
  const { id } = req.params; // Get the service ID from the request parameters

  // Delete the service document
  try {
    // Get the service document reference
    const serviceRef = db.collection('services').doc(id);
    // Get the service document
    const serviceDoc = await serviceRef.get();

    // Return a 404 response if the service is not found
    if (!serviceDoc.exists) {
      return res.status(404).json({ error: 'Service not found.' });
    }

    // Delete the service document
    await serviceRef.delete();
    // Return a success message
    res.json({ message: `Service with ID ${id} has been deleted.` });
  } catch (error) {
    // Catch any errors and send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions
module.exports = { getAllServices, createService, updateService, deleteService };
