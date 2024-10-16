/*
Version: 1.4
UserForm component for editing and creating users in the admin panel.
Last Edited by: Natalia Pakhomova
Last Edit Date: 16/10/2024
*/

import { useState, useEffect } from 'react'; // Import the useState and useEffect hooks from React
import PropTypes from 'prop-types'; // Import PropTypes for defining component prop types
import { errorMessage } from '../../../styles/common/forms.css'; // Import the form styles
import Joi from 'joi'; // Import Joi for form validation

// Define the base validation schema for the user form
const baseSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  dob: Joi.date().required(),
  gender: Joi.string().valid('male', 'female', 'not specified').required(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  street: Joi.string().required(),
  suburb: Joi.string().required(),
  postcode: Joi.string().pattern(/^[0-9]{4,6}$/).required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  password: Joi.string().min(6).optional(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).optional(),
  isAdmin: Joi.boolean().optional(),
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
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'not specified',
    phone: '',
    street: '',
    suburb: '',
    state: '',
    postcode: '',
    country: '',
    isAdmin: false,
    isActive: true,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [showPasswordFields, setShowPasswordFields] = useState(!user);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        password: '',
        confirmPassword: '',
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
        gender: user.gender,
        phone: user.phone,
        street: user.address?.street || '',
        suburb: user.address?.suburb || '',
        state: user.address?.state || '',
        postcode: user.address?.postcode || '',
        country: user.address?.country || '',
        isAdmin: user.isAdmin,
        isActive: user.isActive,        
      });
    } else {
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        dob: '',
        gender: 'not specified',
        phone: '',
        street: '',
        suburb: '',
        state: '',
        postcode: '',
        country: '',
        isAdmin: false,
        isActive: true,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({ ...formData, [id]: type === 'checkbox' ? checked : value });
  };

  const validateForm = () => {
    // Create a copy of formData
    const dataToValidate = { ...formData };
  
    // If password fields are not shown, remove password and confirmPassword from dataToValidate
    if (!showPasswordFields) {
      delete dataToValidate.password;
      delete dataToValidate.confirmPassword;
    }
  
    // Adjust validation schema based on whether it's a new user or editing
    const schema = showPasswordFields
      ? baseSchema.keys({
          password: Joi.string().min(6).required(),
          confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        })
      : baseSchema;
  
    const { error } = schema.validate(dataToValidate, { abortEarly: false });
    if (error) {
      const errors = {};
      error.details.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors({});
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
      <div className="bg-white p-6 shadow-lg rounded w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">{user ? 'Edit User' : 'Create New User'}</h2>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded`}
              readOnly={!!user}
            />
            {validationErrors.email && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.email}</div>}
          </div>

          {/* Password and Confirm Password (conditionally shown) */}
          {showPasswordFields && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="password">{user?'New Password':'User Password'}</label>
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
                <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
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

          {/* Show "Change Password" button only for editing a user */}
          {user && !showPasswordFields && (
            <button
              type="button"
              onClick={() => setShowPasswordFields(true)}
              className="text-blue-500 underline"
            >
              Change Password
            </button>
          )}

          <hr className="my-3" />

          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="firstName">First Name</label>
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
              <label className="block text-sm font-medium mb-1" htmlFor="lastName">Last Name</label>
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
              <label className="block text-sm font-medium mb-1" htmlFor="dob">Date of Birth</label>
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
              <label className="block text-sm font-medium mb-1" htmlFor="gender">Gender</label>
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

          {/* Phone */}
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

          {/* Street Address */}
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

          {/* Suburb and Postcode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="suburb">Suburb</label>
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
              <label className="block text-sm font-medium mb-1" htmlFor="postcode">Postcode</label>
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

          {/* State and Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
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
              <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label>
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
            <button type="button" className={`bg-gray-500 text-white px-4 py-2 rounded`} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={`bg-primary text-white px-4 py-2 rounded`}>
              {user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

UserForm.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default UserForm;