/*
Version: 1.0
AdminRoute component for guarding routes that require admin privileges.
Last Edited by: Natalia Pakhomova
Last Edit Date: 03/09/2024
*/

import { Navigate, Outlet } from 'react-router-dom'; // Import the Navigate component from react-router-dom
import useAuth from '../../hooks/useAuth'; // Import your custom useAuth hook

/**
 * AdminRoute component to guard routes that require admin privileges.
 * @returns {JSX.Element} - The child component if authenticated as admin, or a redirect.
 */
const AdminRoute = () => {
  // Destructure the user, isAuthenticated, and loading properties from the useAuth hook
  const { user, isAuthenticated, loading } = useAuth();

  // If the loading state is true, return null
  if (loading) {
    return null;
  }
  // Check if the user is authenticated and if they have the admin role
  return isAuthenticated && user?.isAdmin === true ? (
    // If authenticated and admin, render the child components
    <Outlet />
  ) : (
    // If not authenticated or not an admin, redirect to the login page
    <Navigate to={isAuthenticated ? '/' : '/login'} />
  );
};

// Export the AdminRoute component
export default AdminRoute;
