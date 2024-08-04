/*
Version: 1.0
Last edited by: Natalia Pakhomova
Last edit date: 04/08/2024
A schema for the user collection in the MongoDB database.
*/

// Import the Mongoose library
const mongoose = require('mongoose');
// Import the password hashing and verification functions
const { hashPassword, verifyPassword } = require('../utils/auth');

// Define the user schema
const userSchema = new mongoose.Schema({
  // Define email field which is required and must be unique
  email: { type: String, required: true, unique: true, lowercase: true },
  // Define password field which is required
  password: { type: String, required: true },
  // Define firstName field
  firstName: { type: String },
  // Define lastName field
  lastName: { type: String },
  // Define dob field
  dob: { type: Date },
  // Define gender field
  gender: { 
    type: String, // Define the field type
    enum: ['male', 'female', 'not listed'] // Define the allowed values
  },
  // Define phone field
  phone: { type: String },
  // Define address field
  address: {
    street: { type: String }, // Street and number
    suburb: { type: String }, // Suburb
    postcode: { type: String }, // Postcode
    state: { type: String }, // State
    country: { type: String }, // Country
  },
  // Define isAdmin field which is a boolean and defaults to false
  isAdmin: { type: Boolean, default: false },
  // Define isActive field which is a boolean and defaults to true
  isActive: { type: Boolean, default: true },
  // Define stripe Token field
  stripeToken: { type: String },
  // Define createdAt field which defaults to the current date
  createdAt: { type: Date, default: Date.now },
  // Define updatedAt field which defaults to the current date
  updatedAt: { type: Date, default: Date.now }
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  // Check if the password has been modified
  if (!this.isModified('password')) {
    // If the password has not been modified, skip the hashing
    return next();
  }
  // Hash the password using the hashPassword function from utils
  this.password = await hashPassword(this.password);
  // Continue with the save operation
  next();
});

// Middleware to update the updatedAt field before saving
userSchema.pre('save', function (next) {
  // Update the updatedAt field to the current date
  this.updatedAt = Date.now();
  // Continue with the save operation
  next();
});

// Method to compare hashed password with plain text password
userSchema.methods.matchPassword = async function (password) {
  // Use the verifyPassword function from utils to compare the passwords and return the result
  return await verifyPassword(password, this.password);
};

// Create a User model from the user schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
