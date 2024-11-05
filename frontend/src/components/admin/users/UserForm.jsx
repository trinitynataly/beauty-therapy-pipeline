/*
Version: 1.5
UserForm component for editing and creating users in the admin panel.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

import { useState, useEffect } from 'react'; // Import the useState and useEffect hooks from React
import PropTypes from 'prop-types'; // Import PropTypes for defining component prop types
import { errorMessage } from '../../../styles/common/forms.css'; // Import the form styles
import Joi from 'joi'; // Import Joi for form validation

// Define the base validation schema for the user form
const baseSchema = Joi.object({
  // Email is required and must be a valid email address
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  // First name is required and must be between 2 and 30 characters
  firstName: Joi.string().min(2).max(30).required(),
  // Last name is required and must be between 2 and 30 characters
  lastName: Joi.string().min(2).max(30).required(),
  // Date of birth is required
  dob: Joi.date().required(),
  // Gender must be one of the specified values
  gender: Joi.string().valid('male', 'female', 'not specified').required(),
  // Phone number must be between 10 and 15 digits
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  // Street address is required
  street: Joi.string().required(),
  // Suburb is required
  suburb: Joi.string().required(),
  // Postcode must be between 4 and 6 digits
  postcode: Joi.string().pattern(/^[0-9]{4,6}$/).required(),
  // State is required
  state: Joi.string().required(),
  // Country is required
  country: Joi.string().required(),
  // Password must be at least 6 characters long
  password: Joi.string().min(6).optional(),
  // Confirm password must match the password
  confirmPassword: Joi.string().valid(Joi.ref('password')).optional(),
  // isAdmin flag is optional
  isAdmin: Joi.boolean().optional(),
  // isActive flag is optional
  isActive: Joi.boolean().optional(),
});

/**
 * UserForm component to create and edit users.
 * @param {Object} user - The user object to edit
 * @param {Function} onSubmit - The function to handle form submission
 * @param {Function} onCancel - The function to handle form cancellation
 * @returns {JSX.Element} - The UserForm component
 */
const UserForm = ({ user, onSubmit, onCancel }) => {
  // Create state variable for form data
  const [formData, setFormData] = useState({
    email: '', // User email is empty by default
    password: '',  // User password is empty by default
    confirmPassword: '', // Confirm password is empty by default
    firstName: '', // User first name is empty by default
    lastName: '', // User last name is empty by default
    dob: '', // User date of birth is empty by default
    gender: 'not specified', // User gender is not specified by default
    phone: '', // User phone number is empty by default
    street: '', // User street address is empty by default
    suburb: '', // User suburb is empty by default
    state: '', // User state is empty by default
    postcode: '', // User postcode is empty by default
    country: '', // User country is empty by default
    isAdmin: false, // User is not an admin by default
    isActive: true, // User is active by default
  });

  // Create state variable for validation errors
  const [validationErrors, setValidationErrors] = useState({});
  // Create state variable for showing password fields
  const [showPasswordFields, setShowPasswordFields] = useState(!user);

  // Set form data when user changes
  useEffect(() => {
    // Check if a user is provided
    if (user) {
      // Set the form data with the user values
      setFormData({
        email: user.email, // Set user email
        password: '', // Set password to empty
        confirmPassword: '', // Set confirm password to empty
        firstName: user.firstName, // Set user first name
        lastName: user.lastName, // Set user last name
        dob: user.dob, // Set user date of birth
        gender: user.gender, // Set user gender
        phone: user.phone, // Set user phone number
        street: user.address?.street || '', // Set user street address
        suburb: user.address?.suburb || '', // Set user suburb
        state: user.address?.state || '', // Set user state
        postcode: user.address?.postcode || '', // Set user postcode
        country: user.address?.country || '', // Set user country
        isAdmin: user.isAdmin, // Set isAdmin flag
        isActive: user.isActive, // Set isActive flag
      });
    } else {
      // Reset form data
      setFormData({
        email: '', // Reset email to empty
        password: '', // Reset password to empty
        confirmPassword: '', // Reset confirm password to empty
        firstName: '', // Reset first name to empty
        lastName: '', // Reset last name to empty
        dob: '', // Reset date of birth to empty
        gender: 'not specified', // Reset gender to not specified
        phone: '', // Reset phone number to empty
        street: '', // Reset street address to empty
        suburb: '', // Reset suburb to empty
        state: '', // Reset state to empty
        postcode: '', // Reset postcode to empty
        country: '', // Reset country to empty
        isAdmin: false, // Reset isAdmin flag to false
        isActive: true, // Reset isActive flag to true
      });
    }
  }, [user]); // Run when user changes

  // Function to handle form field changes
  const handleChange = (e) => {
    // Extract the id, value, type, and checked properties from the event target
    const { id, value, type, checked } = e.target;
    // Update the form data based on the field type
    setFormData({ ...formData, [id]: type === 'checkbox' ? checked : value });
  };

  // Function to validate the form data
  const validateForm = () => {
    // Create a copy of formData
    const dataToValidate = { ...formData };
  
    // Check if password fields should be shown
    if (!showPasswordFields) {
      // Remove password and confirmPassword fields from dataToValidate if not shown
      delete dataToValidate.password;
      delete dataToValidate.confirmPassword;
    }
  
    // Adjust validation schema based on whether password fields are shown
    const schema = showPasswordFields
      ? baseSchema.keys({ // Alter the base schema to include password fields
          password: Joi.string().min(6).required(), // Password is required
          confirmPassword: Joi.string().valid(Joi.ref('password')).required(), // Confirm password is required and must match password
        })
      : baseSchema; // Use the base schema if password fields are not shown
  
    // Validate the data using the schema
    const { error } = schema.validate(dataToValidate, { abortEarly: false });
    // Check if there are any validation errors
    if (error) {
      // Create an errors object
      const errors = {};
      // Loop through each error and add it to the errors object
      error.details.forEach((err) => {
        // Set the error message for the field
        errors[err.path[0]] = err.message;
      });
      // Set the validation errors state
      setValidationErrors(errors);
      // Return false to indicate validation failure
      return false;
    }
    // Reset the validation errors state
    setValidationErrors({});
    // Return true to indicate validation success
    return true;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission
    e.preventDefault();
    // Validate the form data
    if (validateForm()) {
      // Call the onSubmit function with the form data
      onSubmit(formData);
    }
  };

  // Return the UserForm component
  return (
      <>
      {/* UserForm popup */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
        {/* UserForm container */}
        <div className="bg-white p-6 shadow-lg rounded w-full max-w-lg max-h-[90vh] overflow-y-auto">
          {/* UserForm object */}
          <form onSubmit={handleSubmit}>

            {/* UserForm title */}
            <h2 className="text-xl font-bold mb-4">{user ? 'Edit User' : 'Create New User'}</h2>

            {/* Email Input (read only for editing) */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded`}
                readOnly={!!user} // Set read only for editing
              />
              {validationErrors.email && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.email}</div>}
            </div>

            {/* Password and Confirm Password (conditionally shown) */}
            {showPasswordFields && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  {/* New Password label (label changes for editing) */}
                  <label className="block text-sm font-medium mb-1" htmlFor="password">{user?'New Password':'User Password'}</label>
                  {/* New Password input */}
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full border px-3 py-2 rounded`}
                  />
                  {validationErrors.password && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.password}</div>}
                </div>
                <div>
                  {/* Confirm Password label */}
                  <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
                  {/* Confirm Password input */}
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full border px-3 py-2 rounded`}
                  />
                  {validationErrors.confirmPassword && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.confirmPassword}</div>}
                </div>
              </div>
            )}

            {/* "Change Password" button, shown only for editing a user */}
            {user && !showPasswordFields && (
              <button
                type="button"
                onClick={() => setShowPasswordFields(true)}
                className="text-blue-500 underline"
              >
                Change Password
              </button>
            )}

            {/* Divider */}
            <hr className="my-3" />

            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                {/* First Name label */}
                <label className="block text-sm font-medium mb-1" htmlFor="firstName">First Name</label>
                {/* First Name input */}
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded`}
                />
                {validationErrors.firstName && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.firstName}</div>}
              </div>
              <div>
                {/* Last Name label */}
                <label className="block text-sm font-medium mb-1" htmlFor="lastName">Last Name</label>
                {/* Last Name input */}
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded`}
                />
                {validationErrors.lastName && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.lastName}</div>}
              </div>
            </div>

            {/* Date of Birth and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                {/* Date of Birth label */}
                <label className="block text-sm font-medium mb-1" htmlFor="dob">Date of Birth</label>
                {/* Date of Birth input */}
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded`}
                />
                {validationErrors.dob && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.dob}</div>}
              </div>
              <div>
                {/* Gender label */}
                <label className="block text-sm font-medium mb-1" htmlFor="gender">Gender</label>
                {/* Gender select */}
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded`}
                >
                  <option value="not specified">Not Specified</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {validationErrors.gender && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.gender}</div>}
              </div>
            </div>

            {/* Phone Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded`}
              />
              {validationErrors.phone && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.phone}</div>}
            </div>

            {/* Street Address Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="street">Street Address</label>
              <input
                id="street"
                type="text"
                value={formData.street}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded`}
              />
              {validationErrors.street && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.street}</div>}
            </div>

            {/* Suburb and Postcode Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                {/* Suburb label */}
                <label className="block text-sm font-medium mb-1" htmlFor="suburb">Suburb</label>
                {/* Suburb input */}
                <input
                  id="suburb"
                  type="text"
                  value={formData.suburb}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded`}
                />
                {validationErrors.suburb && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.suburb}</div>}
              </div>
              <div>
                {/* Postcode label */}
                <label className="block text-sm font-medium mb-1" htmlFor="postcode">Postcode</label>
                {/* Postcode input */}
                <input
                  id="postcode"
                  type="text"
                  value={formData.postcode}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded`}
                />
                {validationErrors.postcode && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.postcode}</div>}
              </div>
            </div>

            {/* State and Country inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                {/* State label */}
                <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
                {/* State input */}
                <input
                  id="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded`}
                />
                {validationErrors.state && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.state}</div>}
              </div>
              <div>
                {/* Country label */}
                <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label>
                {/* Country input */}
                <input
                  id="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded`}
                />
                {validationErrors.country && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.country}</div>}
              </div>
            </div>

            {/* Is Admin Checkbox */}
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  id="isAdmin"
                  type="checkbox"
                  checked={formData.isAdmin}
                  onChange={handleChange}
                  className="mr-2"
                />
                Is Admin
              </label>
            </div>

            {/* Is Active Checkbox */}
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  id="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="mr-2"
                />
                Is Active
              </label>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-between">
              {/* Cancel button */}
              <button type="button" className={`bg-gray-500 text-white px-4 py-2 rounded`} onClick={onCancel}>
                Cancel
              </button>
              {/* Submit button */}
              <button type="submit" className={`bg-primary text-white px-4 py-2 rounded`}>
                {user ? 'Update User' : 'Create User'} {/* Change button text based on user state */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

// Define the prop types for the UserForm component
UserForm.propTypes = {
  user: PropTypes.object, // User object
  onSubmit: PropTypes.func.isRequired, // Function to handle form submission
  onCancel: PropTypes.func.isRequired, // Function to handle form cancellation
};

// Export the UserForm component
export default UserForm;