/*
Version: 1.4
Admin user management page for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 17/10/2024
*/

// Import Helmet component
import { Helmet } from 'react-helmet-async';
// Import the AdminUserManagement component
import AdminUserManagement from '../../components/admin/users/AdminUserManagement';
// Import the Link component from React Router
import { Link } from 'react-router-dom';

/**
 * Admin user management page component.
 * @returns {JSX.Element} - Admin user management page content.
 */
const AdminUserManagementPage = () => {
  return (
    <>
      {/* Helmet component */}
      <Helmet>
        {/* Page title */}
        <title>Users | Admin Section | Beauty by Gulia</title>
        {/* Meta description */}
        <meta name="description" content="Admin page for managing users on the Beauty by Gulia website." />
      </Helmet>
      {/* Admin Page Container */}
      <div className="container mx-auto py-8">
        {/* Page Header */}
        <h1 className="text-3xl font-bold mb-6">
          <Link to="/admin" className="text-primary no-underline">Admin Section</Link> / Users
        </h1>

        {/* Admin Layout */}
        <AdminUserManagement />
      </div>
    </>
  );
};

// Export the AdminUserManagementPage component
export default AdminUserManagementPage;