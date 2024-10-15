
/*
Version: 1.3
Login page for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

import { Helmet } from 'react-helmet-async'; // Import Helmet component
import { useState } from 'react'; // Import useState from react
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { apiRequest } from '../utils/api'; // Import the apiRequest function
import Logo from '../components/layout/Logo'; // Import the Logo component
import useApiErrorHandler from '../hooks/useApiErrorHandler'; // Import the useApiErrorHandler hook
import Joi from 'joi'; // Import Joi for validation
import { primaryButton } from '../styles/common/buttons.css'; // Import the button styles
import { formContainer, inputField, errorMessage } from '../styles/common/forms.css'; // Import the form styles

// Define Joi schema for form validation
const schema = Joi.object({
  // First name field
  firstName: Joi.string().min(2).max(30).required().messages({ // First name is required and must be between 2 and 30 characters
    'string.empty': 'First name is required', // Error message for empty field
    'string.min': 'First name must be at least 2 characters', // Error message for minimum length
  }),
  // Last name field
  lastName: Joi.string().min(2).max(30).required().messages({ // Last name is required and must be between 2 and 30 characters
    'string.empty': 'Last name is required', // Error message for empty field
    'string.min': 'Last name must be at least 2 characters', // Error message for minimum length
  }),
  // Date of birth field
  dob: Joi.date().required().messages({ // Date of Birth is required
    'date.base': 'Date of Birth is required', // Error message for empty field
  }),
  // Gender field
  gender: Joi.string().valid('male', 'female', 'not listed').required().messages({ // Gender is required and must be one of the specified values
    'any.only': 'Gender must be Male, Female, or not listed', // Error message for invalid value
  }),
  // Email field
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({ // Email is required and must be a valid email address
    'string.empty': 'Email is required', // Error message for empty field
    'string.email': 'Please provide a valid email address', // Error message for invalid email
  }),
  // Password field
  password: Joi.string().min(8).required().messages({ // Password is required and must be at least 8 characters long
    'string.empty': 'Password is required', // Error message for empty field
    'string.min': 'Password must be at least 8 characters long', // Error message for minimum length
  }),
  // Confirm password field
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({ // Confirm password must match the password field
    'any.only': 'Passwords do not match', // Error message for mismatched passwords
    'string.empty': 'Confirm password is required', // Error message for empty field
  }),
  // Phone number field
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({ // Phone number is required and must be between 10 and 15 digits
    'string.empty': 'Phone number is required', // Error message for empty field
    'string.pattern.base': 'Phone number must be between 10 and 15 digits', // Error message for invalid format
  }),
  // Street field
  street: Joi.string().required().messages({ // Street is required
    'string.empty': 'Street is required', // Error message for empty field
  }),
  // Suburb field
  suburb: Joi.string().required().messages({ // Suburb is required
    'string.empty': 'Suburb is required', // Error message for empty field
  }),
  // Postcode field
  postcode: Joi.string().pattern(/^[0-9]{4,6}$/).required().messages({ // Postcode is required and must be between 4 and 6 digits
    'string.empty': 'Postcode is required', // Error message for empty field
    'string.pattern.base': 'Postcode must be between 4 and 6 digits', // Error message for invalid format
  }),
  // State field
  state: Joi.string().required().messages({ // State is required
    'string.empty': 'State is required', // Error message for empty field
  }),
  // Country field
  country: Joi.string().required().messages({ // Country is required
    'string.empty': 'Country is required', // Error message for empty field
  }),
});

/**
 * Register page component.
 * @returns {JSX.Element} - Register page
*/
const Register = () => {
  // Declare state variables for form data, error, and validation errors
  const [formData, setFormData] = useState({
    email: '', // Email field
    password: '', // Password field
    confirmPassword: '', // Confirm password field
    firstName: '', // First name field
    lastName: '', // Last name field
    dob: '', // Date of birth field
    gender: '', // Gender field
    phone: '', // Phone number field
    street: '', // Street field
    suburb: '', // Suburb field
    postcode: '', // Postcode field
    state: '', // State field
    country: '', // Country field
  });

  // Declare state variables for error and validation errors
  const [error, setError] = useState(''); // Error message
  const [validationErrors, setValidationErrors] = useState({}); // Validation errors
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook
  const handleApiError = useApiErrorHandler(); // Get the error handler from the custom hook

  // Function to handle form field changes
  const handleChange = (e) => {
    // Update the form data with the new value
    const { id, value } = e.target;
    // Update the form data with the new value
    setFormData({ ...formData, [id]: value });
  };

  // Function to validate the form data
  const validateForm = () => {
    // Validate the form data against the Joi schema
    const { error } = schema.validate(formData, { abortEarly: false });
    // Check if there are any validation errors
    if (error) {
      // Create an object to store the validation errors
      const errors = {};
      // Map the errors to the validationErrors object
      error.details.forEach((err) => {
        // Set the error message for each field
        errors[err.path[0]] = err.message;
      });
      // Update the validation errors state
      setValidationErrors(errors);
      // Return false to indicate validation failure
      return false;
    }
    // Clear any existing validation errors
    setValidationErrors({});
    // Return true to indicate validation success
    return true;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Validate the form data
    if (!validateForm()) {
      // Return early if validation fails
      return;
    }

    // Try to register the user
    try {
      // Create a copy of the form data
      const postData = { ...formData };
      // Remove the confirmPassword field before sending the data
      delete postData.confirmPassword;
      
      // Make an API request to register the user
      const response = await apiRequest('auth/register', 'POST', postData);
      // Capture the access token and refresh token from the response
      const { accessToken, refreshToken } = response;

      // Check if the tokens are missing
      if (!accessToken || !refreshToken) {
        // Throw an error if the tokens are missing
        throw new Error('Registration failed. Please try again.');
      }

      // Store tokens in local storage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Redirect to the home page after successful registration
      navigate('/');
    } catch (err) {
      // Use the custom error handler
      handleApiError(err);
      // Display the error message in the form
      setError(err.message);
    }
  };

  // Return the Register form
  return (
    <>
      {/* Helmet component */}
      <Helmet>
        {/* Page title */}
        <title>Register new Account | Beauty by Gulia</title>
        {/* Meta description */}
        <meta
          name="description"
          content="Register for a new account with Beauty by Gulia to access exclusive offers and services."
        />
      </Helmet>
      <div className={`flex justify-center items-center min-h-screen ${formContainer}`}>
        {/* Register Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          {/* Logo */}
          <Logo variant='large' />
          {/* Title */}
          <h2 className="text-2xl font-bold mt-4 mb-4 text-center">Register New Account</h2>

          {/* Form Fields in a loop */}
          {Object.entries(formData).map(([key, value]) => (
            <div className="mb-4" key={key}>
              <label className="block text-sm font-medium mb-1" htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              {key === 'gender' ? (
                <select
                  id={key}
                  value={value}
                  onChange={handleChange}
                  className={`${inputField} w-full`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="not listed">Not Listed</option>
                </select>
              ) : (
                <input
                  id={key}
                  type={key === 'password' || key === 'confirmPassword' ? 'password' : key === 'dob' ? 'date' : 'text'}
                  value={value}
                  onChange={handleChange}
                  className={`${inputField} w-full`}
                />
              )}
              {validationErrors[key] && <div className={`text-red-500 ${errorMessage}`}>{validationErrors[key]}</div>}
            </div>
          ))}

          {/* Display General Error Message */}
          {error && <div className={`text-red-500 mb-4 ${errorMessage}`}>{error}</div>}

          {/* Submit Button */}
          <button type="submit" className={`${primaryButton} w-full`}>
            Register new Account
          </button>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

// Export the Register component
export default Register;
