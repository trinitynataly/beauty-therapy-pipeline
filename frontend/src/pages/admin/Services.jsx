/*
Version: 1.0
Admin service management page for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 16/10/2024
*/

// Import Helmet component
import { Helmet } from 'react-helmet-async';
// Import the AdminServiceManagement component
import AdminServiceManagement from '../../components/admin/services/AdminServiceManagement';
// Import the Link component from React Router
import { Link } from 'react-router-dom';

/**
 * Admin service management page component.
 * @returns {JSX.Element} - Admin service management page content.
 */
const AdminServiceManagementPage = () => {
  return (
    <>
      {/* Helmet component */}
      <Helmet>
        {/* Page title */}
        <title>Services | Admin Section | Beauty by Gulia</title>
        {/* Meta description */}
        <meta name="description" content="Admin page for managing services on the Beauty by Gulia website." />
      </Helmet>
      {/* Admin Page Container */}
      <div className="container mx-auto py-8">
        {/* Page Header */}
        <h1 className="text-3xl font-bold mb-6">
          <Link to="/admin" className="text-primary no-underline">Admin Section</Link> / Services
        </h1>

        {/* Admin Layout */}
        <AdminServiceManagement />
      </div>
    </>
  );
};

// Export the AdminServiceManagementPage component
export default AdminServiceManagementPage;
