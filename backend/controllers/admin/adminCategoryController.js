/*
Version: 1.1
Controller functions for managing categories in the admin dashboard.
Only accessible to users with isAdmin = true.
Last Edited by: Natalia Pakhomova
Last Edit Date: 17/10/2024
*/

const admin = require('firebase-admin');
// Create a Firestore client
const db = admin.firestore();
const bucket = admin.storage().bucket();

/**
 * Get a list of all categories, sorted by sortOrder and then by name.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {array} - List of category profiles
 */
const getAllCategories = async (req, res) => {
  try {
    // Get all categories from the Firestore collection, sorted by sortOrder and then by name
    const snapshot = await db.collection('categories').orderBy('sortOrder').orderBy('name').get();
    // Create an array to store the categories
    const categories = [];
    // Loop through the snapshot and add each category to the array
    snapshot.forEach((doc) => {
      // Add the category to the array
      const category = doc.data();
      // Add the category ID to the object
      categories.push({ id: doc.id, ...category });
    });
    // Send the array of categories as the response
    res.json(categories);
  } catch (error) { // Catch any errors and send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
};

/**
 * Create a new category.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The created category profile
 */
const createCategory = async (req, res) => {
  const { name } = req.body; // Get the name field from the request body
  const imageFile = req.file; // Get the image file from the request
  let { sortOrder, isPublished } = req.body; // Get the sortOrder and isPublished fields from the request body

  // Check if name and image are provided
  if (!name || !imageFile) {
    // Return a 400 response with an error message if name or image are missing
    return res.status(400).json({ error: 'Name and image are required.' });
  }

  // Convert and validate sortOrder
  sortOrder = parseInt(sortOrder, 10);
  // Check if sortOrder is a valid integer
  if (isNaN(sortOrder)) {
    // Return a 400 response with an error message if sortOrder is not a valid integer
    return res.status(400).json({ error: 'Sort order must be an integer.' });
  }

  // Convert and validate isPublished
  if (isPublished !== undefined) {
    // Convert isPublished to lowercase and check if it is 'true'
    isPublished = isPublished.toLowerCase() === 'true';
  } else {
    // Set isPublished to true if it is not provided
    isPublished = true;
  }
  // Check if isPublished is a valid boolean
  if (typeof isPublished !== 'boolean') {
    // Return a 400 response with an error message if isPublished is not a valid boolean
    return res.status(400).json({ error: 'isPublished must be a boolean.' });
  }

  // Create a new category document
  try {
    // Create a new category document reference
    const newCategoryRef = db.collection('categories').doc();

    // Create a new image name with the category ID and current timestamp
    const imageName = `${newCategoryRef.id}_${Date.now()}`;
    // Upload the image to Firebase Storage
    const file = bucket.file(`categories/${imageName}`);
    // Save the image buffer to the file in Firebase Storage
    await file.save(imageFile.buffer, {
      // Set the image metadata with the content type
      metadata: { contentType: imageFile.mimetype },
    });

    // Get public URL for the uploaded image
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/categories/${imageName}`;

    // Create a new category
    const newCategory = {
      name, // Set the category name
      imageUrl, // Set the image URL
      sortOrder, // Set the sort order
      isPublished, // Set the isPublished flag
      createdAt: new Date().toISOString(), // Set the creation timestamp
      updatedAt: new Date().toISOString(), // Set the update timestamp
    };

    // Save the new category document to Firestore
    await newCategoryRef.set(newCategory);
    // Return a 201 response with the created category profile
    res.status(201).json({ id: newCategoryRef.id, ...newCategory });
  } catch (error) { // Catch any errors and send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update an existing category by ID.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The updated category profile
 */
const updateCategory = async (req, res) => {
  const { id } = req.params; // Get the category ID from the request parameters
  const { name } = req.body; // Get the name field from the request body
  let { sortOrder, isPublished } = req.body; // Get the sortOrder and isPublished fields from the request body
  const imageFile = req.file; // Get the image file from the request

  // Check if sortOrder is provided and convert it to an integer
  if (sortOrder !== undefined) {
    // Convert sortOrder to an integer
    sortOrder = parseInt(sortOrder, 10);
    // Check if sortOrder is a valid integer
    if (isNaN(sortOrder)) {
      // Return a 400 response with an error message if sortOrder is not a valid integer
      return res.status(400).json({ error: 'Sort order must be an integer.' });
    }
  }

  // Check if isPublished is provided and convert it to a boolean
  if (isPublished !== undefined) {
    // Convert isPublished to lowercase
    isPublished = isPublished.toLowerCase() === 'true';
    // Check if isPublished is a valid boolean
    if (typeof isPublished !== 'boolean') {
      // Return a 400 response with an error message if isPublished is not a valid boolean
      return res.status(400).json({ error: 'isPublished must be a boolean.' });
    }
  }

  // Update the category document
  try {
    // Get the category document reference
    const categoryRef = db.collection('categories').doc(id);
    // Get the category document
    const categoryDoc = await categoryRef.get();

    // Return a 404 response if the category is not found
    if (!categoryDoc.exists) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    // Create an object to store the updated data
    const updatedData = {
      updatedAt: new Date().toISOString(), // Set the update timestamp
    };

    // If name is provided, update the name
    if (name) updatedData.name = name;
    // If sortOrder is provided, update the sortOrder
    if (sortOrder !== undefined) updatedData.sortOrder = sortOrder;
    // If isPublished is provided, update the isPublished flag
    if (isPublished !== undefined) updatedData.isPublished = isPublished;
    // If an image file is provided, upload the new image
    if (imageFile) {
      // Create a new image name with the category ID and current timestamp
      const imageName = `${id}_${Date.now()}`;
      // Save the image buffer to the file in Firebase Storage
      const file = bucket.file(`categories/${imageName}`);
      // Save the image buffer to the file in Firebase Storage
      await file.save(imageFile.buffer, {
        // Set the image metadata with the content type
        metadata: { contentType: imageFile.mimetype },
      });

      // Get public URL for the new image
      updatedData.imageUrl = `https://storage.googleapis.com/${bucket.name}/categories/${imageName}`;
    }

    // Update the category document with the new data
    await categoryRef.update(updatedData);
    // Return the updated category profile
    res.json({ id, ...updatedData });
  } catch (error) { // Catch any errors and send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a category by ID.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {string} - Success message
 */
const deleteCategory = async (req, res) => {
  const { id } = req.params; // Get the category ID from the request parameters

  // Delete the category document
  try {
    // Get the category document reference
    const categoryRef = db.collection('categories').doc(id);
    // Get the category document
    const categoryDoc = await categoryRef.get();

    // Return a 404 response if the category is not found
    if (!categoryDoc.exists) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    // Delete the category document
    await categoryRef.delete();
    // Return a success message
    res.json({ message: `Category with ID ${id} has been deleted.` });
  } catch (error) {
    // Catch any errors and send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions
module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };
