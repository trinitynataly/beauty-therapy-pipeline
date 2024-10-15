/*
Version: 1.3
UserForm component for editing and creating users in the admin panel.
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

import { useState, useEffect } from 'react'; // Import the useState and useEffect hooks from React
import PropTypes from 'prop-types'; // Import PropTypes for defining component prop types
import { inputField, formContainer, buttonStyle, errorMessage } from '../../../styles/admin.css.js'; // Import styles
import Joi from 'joi'; // Import Joi for form validation

// Define validation schema for the user form
const schema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  dob: Joi.date().required(),
  gender: Joi.string().valid('male', 'female', 'not listed').required(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  street: Joi.string().required(),
  suburb: Joi.string().required(),
  postcode: Joi.string().pattern(/^[0-9]{4,6}$/).required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  password: Joi.string().min(8).optional(),
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
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    phone: '',
    street: '',
    suburb: '',
    postcode: '',
    state: '',
    country: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
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
    <form onSubmit={handleSubmit} className={`bg-white p-4 shadow-md rounded ${formContainer}`}>
      <h2 className="text-xl font-bold mb-4">{user ? 'Edit User' : 'Create New User'}</h2>

      {/* Form Fields */}
      {Object.keys(formData).map((key) => (
        <div className="mb-4" key={key}>
          <label className="block text-sm font-medium mb-1" htmlFor={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            id={key}
            type={key === 'dob' ? 'date' : key === 'password' ? 'password' : 'text'}
            value={formData[key]}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${inputField}`}
          />
          {validationErrors[key] && <div className={`text-red-500 ${errorMessage}`}>{validationErrors[key]}</div>}
        </div>
      ))}

      {/* Submit and Cancel Buttons */}
      <div className="flex justify-between">
        <button type="submit" className={`bg-blue-500 text-white px-4 py-2 rounded ${buttonStyle}`}>
          {user ? 'Update User' : 'Create User'}
        </button>
        <button type="button" className={`bg-gray-500 text-white px-4 py-2 rounded ${buttonStyle}`} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

UserForm.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default UserForm;