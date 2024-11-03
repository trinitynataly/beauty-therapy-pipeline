/*
Version: 1.6
AuthContext component for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 03/11/2024
*/

import { createContext, useState, useEffect, useCallback } from 'react'; // Import createContext, useState, useEffect, and useCallback from React
import PropTypes from 'prop-types'; // Import PropTypes from prop-types
import { jwtDecode } from "jwt-decode"; // Import jwtDecode from jwt-decode
import { getStoredTokens, storeTokens, clearTokens, setTokenChangeCallback } from '../utils/auth'; // Use auth utility functions

// Create an AuthContext with default values
const AuthContext = createContext({
  user: null, // User information
  loading: true, // Loading state to show spinner while checking auth
  isAuthenticated: false, // Boolean to check if user is authenticated
  setUser: () => {}, // Function to set user information
  login: () => {}, // Function to log in
  logout: () => {}, // Function to log out
});

/**
 * AuthProvider component to provide authentication context to child components.
 * @param {Object} children - The child components to render.
 * @returns {JSX.Element} - The AuthContext.Provider component with the child components.
 */
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state to store user information
  const [loading, setLoading] = useState(true); // Loading state to show spinner while checking auth

  /**
   * Callback function to decode a token and set user information.
   * @param {string} token - The token to decode.
   * @returns {void}
  */
  const decodeTokenAndSetUser = useCallback((token) => {
    try {
      const decoded = jwtDecode(token); // Decode the token
      const { user } = decoded; // Extract user information from the decoded token
      setUser(user); // Set user information in state
    } catch (error) {
      // Log an error if decoding fails
      console.error('Failed to decode token:', error);
      // Clear tokens and log out user if decoding fails
      setUser(null);
    }
  }, []);

  // Initialize auth state when the component mounts
  useEffect(() => {
    // Retrieve tokens using getStoredTokens
    const { accessToken } = getStoredTokens();

    // Check if an access token exists
    if (accessToken) {
      decodeTokenAndSetUser(accessToken); // Decode token and set user data
    }
    // Set loading to false once the auth state is initialized
    setLoading(false);

    // Set up a callback to handle token changes (e.g., on login, logout, refresh)
    setTokenChangeCallback(() => {
      const { accessToken: newAccessToken } = getStoredTokens(); // Retrieve new access token
      if (newAccessToken) { // Check if a new access token exists
        decodeTokenAndSetUser(newAccessToken); // Decode token and set user data
      } else { // If no new access token exists
        setUser(null); // Clear user data
      }
    });
  }, [decodeTokenAndSetUser]); // Run this effect only once on component mount

  /**
   * Login function that stores tokens and sets user data.
   * @param {string} accessToken - The access token to store.
   * @param {string} refreshToken - The refresh token to store.
   * @returns {void}
  */
  const login = (accessToken, refreshToken) => {
    storeTokens({ accessToken, refreshToken }); // Store tokens
  };

  /**
  * Logout function that clears tokens and logs out the user.
  * @returns {void}
  */
  const logout = () => {
    clearTokens(); // Clear tokens
  };

  /**
   * Update user firstName and lastName from profile data.
   * @param {object} profile - The user profile data.
   * @returns {void}
   */
  const setUserFromPofile = (profile) => {
    setUser((prevUser) => ({ ...prevUser, firstName: profile.firstName, lastName: profile.lastName }));
  }

  // Create the context value object
  const contextValue = {
    user, // User information
    loading, // Loading state
    isAuthenticated: !!user, // Boolean to check if user is authenticated
    setUser, // Function to set user information,
    setUserFromPofile,
    login, // Function to log in
    logout, // Function to log out

  };

  // Return the AuthContext.Provider with the context value and child components
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Define prop types for the AuthProvider component
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Children nodes are required
};

// Export the AuthContext and AuthProvider
export { AuthContext, AuthProvider };
