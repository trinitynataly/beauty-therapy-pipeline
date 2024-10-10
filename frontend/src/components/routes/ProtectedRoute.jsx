/*
Version: 1.1
ProtectedRoute component for guarding routes that require authentication.
Last Edited by: Natalia Pakhomova
Last Edit Date: 10/09/2024
*/

import { Navigate, Outlet } from 'react-router-dom'; // Import the Navigate component from react-router-dom
import useAuth from '../../hooks/useAuth'; // Import your custom useAuth hook

/**
 * ProtectedRoute component to guard routes that require authentication.
 * @returns {JSX.Element} - The child component if authenticated, or a redirect to /login.
 */
const ProtectedRoute = () => {
  // Destructure the isAuthenticated and loading properties from the useAuth hook
  const { isAuthenticated, loading } = useAuth();
  // If the loading state is true, return null
  if (loading) {
    return null;
  }
  // Check if the user is authenticated and render the child components if true or redirect to the login page if false
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

// Export the ProtectedRoute component
export default ProtectedRoute;