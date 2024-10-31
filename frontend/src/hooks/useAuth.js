/*
Version: 1.1
Custom hook to access the AuthContext.
Last Edited by: Natalia Pakhomova
Last Edit Date: 31/10/2024
*/

import { useContext } from 'react'; // Import the useContext hook from React
import { AuthContext } from '../contexts/AuthContext'; // Import the AuthContext

// Custom hook to access the AuthContext
const useAuth = () => {
  return useContext(AuthContext); // Return the useContext hook with the AuthContext
};

// Export the useAuth hook
export default useAuth;