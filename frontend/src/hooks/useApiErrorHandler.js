/*
Version: 1.0
Custom hook to handle API errors and navigate based on error type.
Last Edited by: Natalia Pakhomova
Last Edit Date: 03/09/2024
*/

import { useCallback } from 'react'; // Import the useCallback hook from React
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook from React Router

/**
 * Custom hook to handle API errors and navigate based on error type.
 * @returns {function} handleApiError - A function to handle API errors.
 */
const useApiErrorHandler = () => {
  const navigate = useNavigate();

  /**
   * Function to handle specific API errors.
   * @param {Error} err - The error object thrown by the API call.
   */
  const handleApiError = useCallback(
    (err) => {
      // Check if it's an AuthError and handle specific types
      if (err.name === 'AuthError') {
        if (err.type === 'REFRESH_FAILED' || err.type === 'UNAUTHORIZED') {
          // Redirect to login if refresh failed or unauthorized
          navigate('/login');
        }
      }
    },
    [navigate] // Add navigate to the dependencies array
  );

  // Return the handleApiError function
  return handleApiError;
};

// Export the useApiErrorHandler hook
export default useApiErrorHandler;
