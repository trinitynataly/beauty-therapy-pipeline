/*
Version: 1.0
Custom hook to access the AuthContext.
Last Edited by: Natalia Pakhomova
Last Edit Date: 31/10/2024
*/

import { useContext } from 'react'; // Import the useContext hook from React
import { CartContext } from '../contexts/CartContext'; // Import the CartContext

/**
 * Custom hook to access the AuthContext.
 * @returns {Object} - The auth context
 */
const useCart = () => {
  return useContext(CartContext); // Return the useContext hook with the AuthContext
};

// Export the useAuth hook
export default useCart;