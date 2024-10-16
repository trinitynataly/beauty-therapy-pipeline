/*
Version: 1.0
Admin category management page for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 16/10/2024
*/

// Import Helmet component
import { Helmet } from 'react-helmet-async';
// Import the AdminCategoryManagement component
import AdminCategoryManagement from '../../components/admin/categories/AdminCategoryManagement';
// Import the Link component from React Router
import { Link } from 'react-router-dom';

/**
 * Admin category management page component.
 * @returns {JSX.Element} - Admin category management page content.
 */
const AdminCategoryManagementPage = () => {
  return (
    <>
      {/* Helmet component */}
      <Helmet>
        {/* Page title */}
        <title>Category Management | Admin Section | Beauty by Gulia</title>
        {/* Meta description */}
        <meta name="description" content="Admin page for managing categories on the Beauty by Gulia website." />
      </Helmet>
      {/* Admin Page Container */}
      <div className="container mx-auto py-8">
        {/* Page Header */}
        <h1 className="text-3xl font-bold mb-6">
          <Link to="/admin" className="text-primary no-underline">Admin Section</Link> / Category Management
        </h1>

        {/* Admin Layout */}
        <AdminCategoryManagement />
      </div>
    </>
  );
};

// Export the AdminCategoryManagementPage component
export default AdminCategoryManagementPage;
