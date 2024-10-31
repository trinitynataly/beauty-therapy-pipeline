/*
Version: 1.0
Custom hook to access the ToastContext.
Last Edited by: Natalia Pakhomova
Last Edit Date: 31/10/2024
*/

import { useContext } from 'react'; // Import the useContext hook from React
import { ToastContext } from '../contexts/ToastContext'; // Import the ToastContext
 
/**
 * Custom hook to access the ToastContext.
 * @returns {Object} - The toast context
 */
const useToast = () => useContext(ToastContext);

// Export the useToast hook
export default useToast;