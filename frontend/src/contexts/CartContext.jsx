/*
Version: 1.0
Cart Provider for managing cart state across the application.
Automatically loads the cart if the user is authenticated and provides a function to reload the cart.
Last Edited by: Natalia Pakhomova
Last Edit Date: 29/10/2024
*/

import { createContext, useState, useCallback, useEffect } from 'react'; // Import createContext, useContext, useState, and useEffect from React
import PropTypes from 'prop-types'; // Import PropTypes from prop-types
import { apiSecureRequest } from '../utils/auth'; // Import apiSecureRequest function from auth
import useAuth from '../hooks/useAuth'; // Import useAuth hook from AuthProvider

// Create CartContext
const CartContext = createContext();

/**
 * CartProvider component to provide cart context to the rest of the application.
 * @param {object} props - Props for the CartProvider component
 * @returns {JSX.Element} CartProvider component
 */
const CartProvider = ({ children }) => {
  const { user } = useAuth(); // Get user information from AuthProvider
  const [cart, setCart] = useState([]); // State for storing cart items
  const [loading, setLoading] = useState(true); // Loading state for cart

  // Function to load the cart from the backend
  const loadCart = useCallback(async () => {
    // Check if the user is authenticated
    if (user) {
      // Set loading state to true
      setLoading(true);
      // Fetch cart items from the backend
      try {
        // Make a secure request to the 'cart' endpoint
        const response = await apiSecureRequest('cart', 'GET'); 
        // Set the cart state with the response
        setCart(response);
      } catch (error) { // Handle errors
        // Log an error if loading the cart fails
        console.error('Error loading cart:', error);
      } finally {
        // Set loading state to false
        setLoading(false);
      }
    } else {
      setCart([]); // Clear cart if user is not authenticated
      setLoading(false); // Set loading state to false
    }
  }, [user]);

  // Load cart automatically when the user changes
  useEffect(() => {
    loadCart();
  }, [user, loadCart]);

  // Provide the cart state and functions to the rest of the application
  return (
    <CartContext.Provider value={{ cart, loading, reloadCart: loadCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Define prop types for CartProvider
CartProvider.propTypes = {
  children: PropTypes.node.isRequired, // Children components are required
};

// Export CartProvider and CartContext
export { CartProvider, CartContext };