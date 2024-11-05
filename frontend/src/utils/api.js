/*
Version: 1.3
Utility function to make API requests.
Last Edited by: Natalia Pakhomova
Last Edit Date: 16/10/2024
*/

// Import the Axios library
import axios from 'axios';

/**
 * Function to make an API request.
 * @param {string} endpoint - The API endpoint to make the request to.
 * @param {string} method - The HTTP method for the request.
 * @param {Object} payload - The request payload.
 * @param {Object} headers - The request headers.
 * @param {boolean} isFormData - Whether the payload is form data.
 * @returns {Promise<Object>} - The response data.
 */
export const apiRequest = async (endpoint, method = 'GET', payload = {}, headers = {}) => {
  // Get the base URL from the environment variables or use a default
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
  // Construct the full URL
  const url = `${baseUrl}/${endpoint}`;
  // Make the Axios request with provided headers
  try {
    // Make the request using Axios
    const response = await axios({
      url, // Use the full URL
      method, // Use the provided method
      data: method !== 'GET' ? payload : null, // Set the data as the post body for non-GET requests
      params: method === 'GET' ? payload : null, // Set the data as the params for GET requests
      headers,
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Check if it's an Axios error and has a response
    if (axios.isAxiosError(error) && error.response) {
      // Attach the response data to the error for higher-level handling
      error.message = error.response.data.error || 'An error occurred';
      // Attach the status code to the error
      error.status = error.response.status;
    }
    throw error; // Rethrow the modified error
  }
};
