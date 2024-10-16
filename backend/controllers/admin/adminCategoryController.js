/*
Version: 1.0
Controller functions for managing categories in the admin dashboard.
Only accessible to users with isAdmin = true.
Last Edited by: Natalia Pakhomova
Last Edit Date: 16/10/2024
*/

const admin = require('firebase-admin');
// Create a Firestore client
const db = admin.firestore();
const bucket = admin.storage().bucket();

/**
 * Get a list of all categories.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {array} - List of category profiles
 */
const getAllCategories = async (req, res) => {
  try {
    const snapshot = await db.collection('categories').get();
    const categories = [];
    snapshot.forEach((doc) => {
      const category = doc.data();
      categories.push({ id: doc.id, ...category });
    });
    res.json(categories);
  } catch (error) {
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
  const { name } = req.body;
  const imageFile = req.file;

  if (!name || !imageFile) {
    return res.status(400).json({ error: 'Name and image are required.' });
  }

  try {
    const newCategoryRef = db.collection('categories').doc();

    // Upload the image to Firebase Storage
    const imageName = `${newCategoryRef.id}_${Date.now()}`;
    const file = bucket.file(`categories/${imageName}`);
    await file.save(imageFile.buffer, {
      metadata: { contentType: imageFile.mimetype },
    });

    // Get public URL for the uploaded image
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/categories/${imageName}`;

    // Create a new category
    const newCategory = {
      name,
      imageUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await newCategoryRef.set(newCategory);
    res.status(201).json({ id: newCategoryRef.id, ...newCategory });
  } catch (error) {
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
  const { id } = req.params;
  const { name } = req.body;
  const imageFile = req.file;

  try {
    const categoryRef = db.collection('categories').doc(id);
    const categoryDoc = await categoryRef.get();

    if (!categoryDoc.exists) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    const updatedData = {
      name,
      updatedAt: new Date().toISOString(),
    };

    if (imageFile) {
      // Upload the new image to Firebase Storage
      const imageName = `${id}_${Date.now()}`;
      const file = bucket.file(`categories/${imageName}`);
      await file.save(imageFile.buffer, {
        metadata: { contentType: imageFile.mimetype },
      });

      // Get public URL for the new image
      updatedData.imageUrl = `https://storage.googleapis.com/${bucket.name}/categories/${imageName}`;
    }

    await categoryRef.update(updatedData);
    res.json({ id, ...updatedData });
  } catch (error) {
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
  const { id } = req.params;

  try {
    const categoryRef = db.collection('categories').doc(id);
    const categoryDoc = await categoryRef.get();

    if (!categoryDoc.exists) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    // Delete the category document
    await categoryRef.delete();
    res.json({ message: `Category with ID ${id} has been deleted.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };
