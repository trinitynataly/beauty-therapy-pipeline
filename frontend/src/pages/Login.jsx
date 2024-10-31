/*
Version: 1.4
Login page for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 31/10/2024
*/

import { Helmet } from 'react-helmet-async'; // Import Helmet component
import { useState } from 'react'; // Import the useState hook
import { useNavigate, Link } from 'react-router-dom'; // Import the useNavigate hook from React Router
import { ApiLogin } from '../api/auth'; // Import the ApiLogin function
import useToast from '../hooks/useToast'; // Import the useToast hook
import Logo from '../components/layout/Logo'; // Import the Logo component
import useApiErrorHandler from '../hooks/useApiErrorHandler'; // Import the custom hook
import useAuth from '../hooks/useAuth'; // Import the useAuth hook
import { primaryButton } from '../styles/common/buttons.css'; // Import the button styles
import { formContainer, inputField, errorMessage } from '../styles/common/forms.css'; // Import the form styles

/**
 * Login page component.
 * @returns {JSX.Element} - The Login page.
*/
const Login = () => {
  const [email, setEmail] = useState(''); // Declare the email state variable
  const [password, setPassword] = useState(''); // Declare the password state variable
  const [error, setError] = useState(''); // Declare the error state variable
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook
  const { login } = useAuth(); // Get the login function from the useAuth hook
  const { showToast } = useToast(); // Get the showToast function from the useToast hook

  // Get the error handler from the custom hook
  const handleApiError = useApiErrorHandler();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    try {
      // Call ApiLogin without internal error handling
      const { accessToken, refreshToken } = await ApiLogin(email, password);

      // Check if the access token or refresh token is missing
      if (!accessToken || !refreshToken) {
        // Throw an error if the tokens are missing
        throw new Error('Login failed. Please try again.');
      }

      // Call the login function from the AuthContext
      login(accessToken, refreshToken); 

      // Show a success message
      showToast('Welcome', 'You have been signed in', 'confirm');

      // Redirect to the home page after successful login
      navigate('/');
    } catch (err) {
      // Use the custom error handler
      handleApiError(err);
      // Display the error message in the form
      setError(err.message);
    }
  };

  // Return the Login form
  return (
    <>
      {/* Helmet component */}
      <Helmet>
        {/* Page title */}
        <title>Please Login | Beauty by Gulia</title>
        {/* Meta description */}
        <meta name="description" content="Please sign in to access your account." />
      </Helmet>
      <div className={`flex justify-center items-center min-h-screen ${formContainer}`}>
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          {/* Logo */}
          <Logo variant='large' />
          {/* Title */}
          <h2 className="text-2xl font-bold mt-4 mb-4 text-center">Please Sign In</h2>
          
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputField} w-full`}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputField} w-full`}
            />
          </div>

          {/* Display Error Message */}
          {error && (
            <div className={`text-red-500 mb-4 ${errorMessage}`}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className={`${primaryButton} w-full`}>
            Sign In
          </button>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Do not have an account? </span>
            <Link to="/register">
              Register here
            </Link>
          </div>
        </form>
        {/* Login Link */}
        
      </div>
    </>
  );
};

// Export the Login component
export default Login;
