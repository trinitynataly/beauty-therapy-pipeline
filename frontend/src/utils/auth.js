/*
Version: 1.4
Utility functions for authentication and secure API requests.
Last Edited by: Natalia Pakhomova
Last Edit Date: 16/10/2024
*/

import { jwtDecode } from "jwt-decode"; // Import the jwtDecode function from the jwt-decode library
import { apiRequest } from './api'; // Import the apiRequest function from the api file

// Custom error class for authentication-related errors
class AuthError extends Error {
  constructor(message, type) { // Add a type parameter to the constructor
    super(message); // Call the super() method with the message
    this.name = 'AuthError'; // Set the error name
    this.type = type; // Set the error type e.g., 'REFRESH_FAILED', 'UNAUTHORIZED'
  }
}

// Storage key constants
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// Token change callback function
let tokenChangeCallback = null;

/**
 * Helper function to set the token change callback function.
 * @param {*} callback = The callback function to set.
 */
export const setTokenChangeCallback = (callback) => {
  // Set the token change callback function
  tokenChangeCallback = callback;
};

/**
 * Helper function to get stored tokens from local storage.
 * @returns {Object} - The stored tokens
 */
const getStoredTokens = () => {
  try {
    // Get the Access and Refresh tokens from local storage
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    // Return the tokens as an object
    return { accessToken, refreshToken };
  } catch (error) {
    // Handle errors when retrieving tokens
    console.error('Failed to get stored tokens:', error);
    return null;
  }
};

/**
 * Helper function to store tokens in local storage.
 * @param {Object} tokens - The tokens to store
 * @returns {Object} - The stored tokens
 */
const storeTokens = (tokens) => {
  try {
    // Store the Access and Refresh tokens in local storage
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    // Check if a token change callback function is set
    if (tokenChangeCallback) {
      // Call the token change callback function
      tokenChangeCallback(); 
    }
  } catch (error) {
    // Handle errors when storing tokens
    console.error('Failed to store tokens:', error);
  }
};

/**
 * Helper function to clear tokens from local storage.
 * @returns {void}
 */
const clearTokens = () => {
  try {
    // Clear the Access and Refresh tokens from local storage
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    // Check if a token change callback function is set
    if (tokenChangeCallback) {
      // Call the token change callback function
      tokenChangeCallback(); 
    }
  } catch (error) {
    // Handle errors when clearing tokens
    console.error('Failed to clear tokens:', error);
  }
};

/**
 * Helper function to check if a token is expiring soon.
 * @param {string} token - The token to check
 * @returns {boolean} - Whether the token is expiring soon
 */
const isTokenExpiringSoon = (token) => {
  try {
    // Decode the token to get the expiration time
    const decoded = jwtDecode(token);
    // Get the current time in seconds
    const currentTime = Date.now() / 1000;
    // Check if the token expires in less than 60 seconds and return the result
    return decoded.exp - currentTime < 60; 
  } catch (error) {
    // Handle errors when decoding tokens
    console.error('Error decoding token:', error);
    return true; // If there's an error decoding, consider the token expired/invalid
  }
};

/**
 * Function to automatically refresh the access token using the refresh token.
 * @param {string} token - The refresh token to use
 * @returns {Object} - The new access and refresh tokens
 */
export const ApiRefreshToken = async (token) => {
  // Check if the refresh token is missing and return null if so
  if (!token) return null;
  try {
    // Use the apiRequest function to refresh tokens
    const data = await apiRequest('auth/refresh-token', 'POST', { refreshToken: token });
    // Extract the new tokens from the response data
    const { accessToken, refreshToken } = data;
    // Check if the tokens exist
    if (!accessToken || !refreshToken) {
      // Clear tokens if missing
      clearTokens();
    } else {
      // Store the new tokens if they exist
      storeTokens({ accessToken, refreshToken });
    }
    // Return the new tokens
    return { accessToken, refreshToken };
  } catch (error) {
    // Handle errors when refreshing tokens
    console.error('Token refresh failed:', error);
    clearTokens(); // Clear tokens on error
    return null; // Return null if token refresh fails
  }
};

/**
 * Function to make a secure API request with automatic token handling.
 * @param {string} endpoint - The API endpoint to request
 * @param {string} method - The HTTP method for the request
 * @param {Object} payload - The request payload
 * @returns {Object} - The response data
 */

export const apiSecureRequest = async (endpoint, method = 'GET', payload = {}, isFormData = false) => {
  try {
    // Retrieve tokens using the helper function
    let { accessToken, refreshToken } = getStoredTokens();
    // Check if accessToken is near expiration or expired
    if (accessToken && isTokenExpiringSoon(accessToken)) {
      // Attempt to refresh the access token
      const newTokens = await ApiRefreshToken(refreshToken);
      // Check if new tokens were returned
      if (newTokens) {
        // Update the access token with the new token
        accessToken = newTokens.accessToken;
      } else {
        // Throw an error if token refresh failed
        throw new AuthError('Failed to refresh access token.', 'REFRESH_FAILED');
      }
    }

    // Include Authorization header if accessToken exists
    const headers = {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }), // If FormData, do not set Content-Type
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    // Call the base apiRequest function with the new headers
    return await apiRequest(endpoint, method, payload, headers);
  } catch (error) {
    // Handle authorization errors
    if (error.response && error.response.status === 401) {
      clearTokens(); // Clear tokens on unauthorized error
      throw new AuthError('Unauthorized access. Please log in again.', 'UNAUTHORIZED');
    }
    throw error; // Re-throw other errors for generic handling
  }
};

// Export the storage functions for external use in the context provider
export { getStoredTokens, storeTokens, clearTokens };
