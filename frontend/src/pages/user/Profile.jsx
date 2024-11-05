/*
Version: 1.3
User Profile page for the frontend.
Features forms for updating user profile and changing password.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

import { useState, useEffect } from 'react'; // Import the useState and useEffect hooks from React
import { Helmet } from 'react-helmet-async'; // Import the Helmet component from React Helmet
import Joi from 'joi'; // Import the Joi library for validation 
import { apiSecureRequest } from '../../utils/auth'; // Import the secured API request utility function
import useAuth from '../../hooks/useAuth'; // Import the useAuth hook
import useToast from '../../hooks/useToast'; // Import the useToast hook

// Import styles
import { inputField, errorMessage } from '../../styles/common/forms.css'; // Import the form styles
import { primaryButton } from '../../styles/common/buttons.css'; // Import the button styles
import { sectionTitle } from '../../styles/common/texts.css'; // Import the text styles

// Define Joi schema for profile validation
const profileSchema = Joi.object({
  // First name field is required, must be a string, and must be between 2 and 30 characters 
  firstName: Joi.string().min(2).max(30).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'First name must be at least 2 characters',
  }),
  // Last name field is required, must be a string, and must be between 2 and 30 characters
  lastName: Joi.string().min(2).max(30).required().messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name must be at least 2 characters',
  }),
  // Date of birth field is required and must be a date
  dob: Joi.date().required().messages({
    'date.base': 'Date of Birth is required',
  }),
  // Gender field is required and must be one of the specified values
  gender: Joi.string().valid('male', 'female', 'not listed').required().messages({
    'any.only': 'Gender must be Male, Female, or not listed',
  }),
  // Phone field is required, must be a string, and must be between 10 and 15 digits
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).messages({
    'string.pattern.base': 'Phone number must be between 10 and 15 digits',
  }),
  // Street field is required and must be a string
  street: Joi.string().messages({
    'string.empty': 'Street is required',
  }),
  // Suburb field is required and must be a string
  suburb: Joi.string().messages({
    'string.empty': 'Suburb is required',
  }),
  // Postcode field is required, must be a string, and must be between 4 and 6 digits
  postcode: Joi.string().pattern(/^[0-9]{4,6}$/).messages({
    'string.pattern.base': 'Postcode must be between 4 and 6 digits',
  }),
  // State field is required and must be a string
  state: Joi.string().messages({
    'string.empty': 'State is required',
  }),
  // Country field is required and must be a string
  country: Joi.string().messages({
    'string.empty': 'Country is required',
  }),
});

// Define Joi schema for password validation
const passwordSchema = Joi.object({
  // Current password field is required and must be a string
  currentPassword: Joi.string().required().messages({
    'string.empty': 'Current password is required',
  }),
  // New password field is required, must be a string, and must be at least 6 characters long
  newPassword: Joi.string().min(6).required().messages({
    'string.empty': 'New password is required',
    'string.min': 'Password must be at least 6 characters long',
  }),
});

/**
 * User Profile page component
 * @returns {JSX.Element} User Profile page content
 */
const UserProfile = () => {
  const { setUserFromPofile } = useAuth(); // Destructure the setUserFromPofile function from the useAuth hook
  const { showToast } = useToast(); // Destructure the showToast function from the useToast hook
  const [profile, setProfile] = useState({ // State to store the user profile
    firstName: '', // First name
    lastName: '', // Last name
    dob: '', // Date of birth
    gender: 'not listed', // Gender
    phone: '', // Phone number
    street: '', // Street address
    suburb: '', // Suburb
    postcode: '', // Postcode
    state: '', // State
    country: '', // Country
  });
  const [loading, setLoading] = useState(true); // State to store the loading status
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' }); // State to store the passwords
  const [validationErrors, setValidationErrors] = useState({}); // State to store the validation errors

  // Fetch the user profile on component mount
  useEffect(() => {
    // Function to fetch the user profile
    const fetchProfile = async () => {
      try {
        // Fetch the user profile from the backend
        const response = await apiSecureRequest('user', 'GET');
        // Set the profile state with the fetched data
        setProfile({
          firstName: response.firstName || '', // First name
          lastName: response.lastName || '', // Last name
          dob: response.dob || '', // Date of birth
          gender: response.gender || 'not listed', // Gender, default to 'not listed'
          phone: response.phone || '', // Phone number
          street: response.address?.street || '', // Street address
          suburb: response.address?.suburb || '', // Suburb
          postcode: response.address?.postcode || '', // Postcode
          state: response.address?.state || '', // State
          country: response.address?.country || '', // Country
        });
      } catch (error) { // Catch any errors
        // Show a toast with the error message
        showToast('Error', `Failed to fetch profile: ${error?.message || 'An unknown error has occurred'}`, 'error');
      } finally { // Finally do this regardless of success or failure
        // Set the loading state to false
        setLoading(false);
      }
    };
    // Call the fetchProfile function
    fetchProfile();
  }, [showToast]); // Run this effect only once on component mount

  // Function to handle profile form changes
  const handleProfileChange = (e) => {
    // Destructure the name and value from the event target
    const { name, value } = e.target;
    // Update the profile state with the new value
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  // Function to handle password form changes
  const handlePasswordChange = (e) => {
    // Destructure the name and value from the event target
    const { name, value } = e.target;
    // Update the passwords state with the new value
    setPasswords((prevPasswords) => ({ ...prevPasswords, [name]: value }));
  };

  // Function to validate the profile input
  const validateProfile = () => {
    // Validate the profile state with the profile schema
    const { error } = profileSchema.validate(profile, { abortEarly: false });
    // If there are errors
    if (error) {
      // Create an empty errors object
      const errors = {};
      // Loop through the error details
      error.details.forEach((detail) => {
        // Add the error message to the errors object
        errors[detail.path[0]] = detail.message;
      });
      // Set the validation errors state with the errors object
      setValidationErrors(errors);
      // Return false
      return false;
    }
    // Set the validation errors state to an empty object
    setValidationErrors({});
    // Return true
    return true;
  };

  // Validate password input
  const validatePasswords = () => {
    // Validate the passwords state with the password schema
    const { error } = passwordSchema.validate(passwords, { abortEarly: false });
    // If there are errors
    if (error) {
      // Create an empty errors object
      const errors = {};
      // Loop through the error details
      error.details.forEach((detail) => {
        // Add the error message to the errors object
        errors[detail.path[0]] = detail.message;
      });
      // Set the validation errors state with the errors object
      setValidationErrors(errors);
      // Return false
      return false;
    }
    // Set the validation errors state to an empty object
    setValidationErrors({});
    // Return true
    return true;
  };

  // Function to handle profile form submission
  const handleProfileSubmit = async (e) => {
    // Prevent the default form submission
    e.preventDefault();
    // If the profile is not valid return
    if (!validateProfile()) return;

    // Try to update the profile
    try {
      // Update the user profile in the backend
      await apiSecureRequest('user', 'PUT', profile);
      // Set the user profile in the context
      setUserFromPofile(profile);
      // Show a success toast
      showToast('Success', 'Profile updated successfully', 'confirm');
    } catch (error) { // Catch any errors
      // Log the error to the console
      console.error('Error updating profile:', error);
      // Show an error toast
      showToast('Error', `Failed to update profile: ${error?.message || 'An unknown error has occurred'}`, 'error');
    }
  };

  // Function to handle password form submission
  const handlePasswordSubmit = async (e) => {
    // Prevent the default form submission
    e.preventDefault();
    // If the passwords are not valid return
    if (!validatePasswords()) return;

    // Try to update the password
    try {
      // Update the user password in the backend
      await apiSecureRequest('user/password', 'PUT', passwords);
      // Reset the passwords state
      setPasswords({ currentPassword: '', newPassword: '' });
      // Show a success toast
      showToast('Success', 'Password changed successfully', 'confirm');
    } catch (error) {
      // Log the error to the console
      console.error('Error changing password:', error);
      // Show an error toast
      showToast('Error', `Failed to change password: ${error?.message || 'An unknown error has occurred'}`, 'error');
    }
  };

  // Check if the profile is loading
  if (loading) {
    // Return a loading message
    return <div className="text-center py-16">Loading...</div>;
  }

  // Return the User Profile page content
  return (
    <>
      {/* Helmet component */}
      <Helmet>
        {/* Page title */}
        <title>User Profile | Beauty by Gulia</title>
        {/* Meta description */}
        <meta name="description" content="Update your profile and change your password." />
      </Helmet>

      {/* User Profile page container */}
      <div className='container mx-auto'>
        {/* User Profile page grid */}
        <div className={`flex flex-col lg:flex-row justify-center items-start gap-10 mt-10`}>
          {/* Update Profile Form */}
          <form onSubmit={handleProfileSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            {/* Update Profile Form Title */}
            <h2 className={`text-center ${sectionTitle}`}>Update My Profile</h2>
            {/* Map the profile object keys to create form fields */}
            {Object.keys(profile).map((key) => (
              // Create a form field for each key in the profile object
              <div className="mb-4" key={key}>
                {/* Label for the form field */}
                <label className="block text-sm font-medium mb-1" htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                {/* If field is gender - show select, otherwise show input */}
                {key === 'gender' ? (
                  // Select field for gender
                  <select
                    id={key} // Set the id based on the key
                    name={key} // Set the name based on the key
                    value={profile[key] || ''} // Set the value based on the key
                    onChange={handleProfileChange} // Handle change event
                    className={`${inputField} w-full`}
                  >
                    {/* Gender field options */}
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="not listed">Not Listed</option>
                  </select>
                ) : (
                  // Input field for other fields
                  <input
                    id={key} // Set the id based on the key
                    type={key === 'dob' ? 'date' : 'text'} // Set the input type based on the key
                    name={key} // Set the name based on the key
                    value={profile[key] || ''} // Set the value based on the key
                    onChange={handleProfileChange} // Handle change event
                    className={`${inputField} w-full`}
                  />
                )}
                {/* Show validation error if there is one */}
                {validationErrors[key] && <div className={`text-red-500 ${errorMessage}`}>{validationErrors[key]}</div>}
              </div>
            ))}
            {/* Update Profile button */}
            <button type="submit" className={`${primaryButton} w-full`}>Update Profile</button>
          </form>

          {/* Change Password Form */}
          <form onSubmit={handlePasswordSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
          {/* Change Password Form Title */}
          <h2 className={`text-center ${sectionTitle}`}>Change My Password</h2>
            {/* Current Password field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="currentPassword">
                Current Password
              </label>
              {/* Input field for the Current Password */}
              <input
                id="currentPassword"
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange} // Handle password form change event
                className={`${inputField} w-full`}
              />
              {/* Show validation error if there is one */}
              {validationErrors.currentPassword && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.currentPassword}</div>}
            </div>
            {/* New Password field */}
            <div className="mb-4">
              {/* Label for the New Password field */}
              <label className="block text-sm font-medium mb-1" htmlFor="newPassword">
                New Password
              </label>
              {/* Input field for the New Password */}
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange} // Handle password form change event
                className={`${inputField} w-full`}
              />
              {/* Show validation error if there is one */}
              {validationErrors.newPassword && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.newPassword}</div>}
            </div>
            <button type="submit" className={`${primaryButton} w-full`}>Change Password</button>
          </form>
        </div>
      </div>
    </>
  );
};

// Export the UserProfile component
export default UserProfile;
