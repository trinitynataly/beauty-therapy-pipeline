/*
Version: 1.2
User Profile page for the frontend.
Features forms for updating user profile and changing password.
Last Edited by: Natalia Pakhomova
Last Edit Date: 03/11/2024
*/

// Import necessary libraries
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Joi from 'joi';
import { apiSecureRequest } from '../../utils/auth';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';

// Import styles
import { inputField, errorMessage } from '../../styles/common/forms.css';
import { primaryButton } from '../../styles/common/buttons.css';
import { sectionTitle } from '../../styles/common/texts.css';

// Define Joi schema for profile validation
const profileSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'First name must be at least 2 characters',
  }),
  lastName: Joi.string().min(2).max(30).required().messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name must be at least 2 characters',
  }),
  dob: Joi.date().required().messages({
    'date.base': 'Date of Birth is required',
  }),
  gender: Joi.string().valid('male', 'female', 'not listed').required().messages({
    'any.only': 'Gender must be Male, Female, or not listed',
  }),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).messages({
    'string.pattern.base': 'Phone number must be between 10 and 15 digits',
  }),
  street: Joi.string().messages({
    'string.empty': 'Street is required',
  }),
  suburb: Joi.string().messages({
    'string.empty': 'Suburb is required',
  }),
  postcode: Joi.string().pattern(/^[0-9]{4,6}$/).messages({
    'string.pattern.base': 'Postcode must be between 4 and 6 digits',
  }),
  state: Joi.string().messages({
    'string.empty': 'State is required',
  }),
  country: Joi.string().messages({
    'string.empty': 'Country is required',
  }),
});

// Define Joi schema for password validation
const passwordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'string.empty': 'Current password is required',
  }),
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
  const { setUserFromPofile } = useAuth();
  const { showToast } = useToast();
  const [profile, setProfile] = useState({
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
  });
  const [loading, setLoading] = useState(true);
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch user profile from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiSecureRequest('user', 'GET');
        setProfile({
          firstName: response.firstName || '',
          lastName: response.lastName || '',
          dob: response.dob || '',
          gender: response.gender || '',
          phone: response.phone || '',
          street: response.address?.street || '',
          suburb: response.address?.suburb || '',
          postcode: response.address?.postcode || '',
          state: response.address?.state || '',
          country: response.address?.country || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        showToast('Error', 'Failed to fetch profile', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({ ...prevPasswords, [name]: value }));
  };

  // Validate profile input
  const validateProfile = () => {
    const { error } = profileSchema.validate(profile, { abortEarly: false });
    if (error) {
      const errors = {};
      error.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors({});
    return true;
  };

  // Validate password input
  const validatePasswords = () => {
    const { error } = passwordSchema.validate(passwords, { abortEarly: false });
    if (error) {
      const errors = {};
      error.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors({});
    return true;
  };

  // Handle profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;

    try {
      await apiSecureRequest('user', 'PUT', profile);
      setUserFromPofile(profile);
      showToast('Success', 'Profile updated successfully', 'confirm');
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('Error', `Failed to update profile: ${error?.message || 'An unknown error has occurred'}`, 'error');
    }
  };

  // Handle password form submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    try {
      await apiSecureRequest('user/password', 'PUT', passwords);
      setPasswords({ currentPassword: '', newPassword: '' });
      showToast('Success', 'Password changed successfully', 'confirm');
    } catch (error) {
      console.error('Error changing password:', error);
      showToast('Error', `Failed to change password: ${error?.message || 'An unknown error has occurred'}`, 'error');
    }
  };

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <>
      {/* Helmet component */}
      <Helmet>
        {/* Page title */}
        <title>User Profile | Beauty by Gulia</title>
        {/* Meta description */}
        <meta name="description" content="Update your profile and change your password." />
      </Helmet>

      <div className={`flex flex-col lg:flex-row justify-center items-start gap-10 mt-10`}>
        {/* Update Profile Form */}
        <form onSubmit={handleProfileSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className={`text-center ${sectionTitle}`}>Update My Profile</h2>
          {Object.keys(profile).map((key) => (
            <div className="mb-4" key={key}>
              <label className="block text-sm font-medium mb-1" htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              {key === 'gender' ? (
                <select
                  id={key}
                  name={key}
                  value={profile[key] || ''}
                  onChange={handleProfileChange}
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
                  type={key === 'dob' ? 'date' : 'text'}
                  name={key}
                  value={profile[key] || ''}
                  onChange={handleProfileChange}
                  className={`${inputField} w-full`}
                />
              )}
              {validationErrors[key] && <div className={`text-red-500 ${errorMessage}`}>{validationErrors[key]}</div>}
            </div>
          ))}
          <button type="submit" className={`${primaryButton} w-full`}>Update Profile</button>
        </form>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className={`text-center ${sectionTitle}`}>Change My Password</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              className={`${inputField} w-full`}
            />
            {validationErrors.currentPassword && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.currentPassword}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="newPassword">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className={`${inputField} w-full`}
            />
            {validationErrors.newPassword && <div className={`text-red-500 ${errorMessage}`}>{validationErrors.newPassword}</div>}
          </div>
          <button type="submit" className={`${primaryButton} w-full`}>Change Password</button>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
