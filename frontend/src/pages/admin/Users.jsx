/*
Version: 1.2
Admin user management page for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

import AdminUserManagement from '../../components/admin/users/AdminUserManagement'; // Import the AdminUserManagement component
import { Link } from 'react-router-dom'; // Import the Link component from React Router
import { adminPageContainer, adminPageHeader, linkStyle } from '../../styles/admin.css.js'; // Import the admin page styles

/**
 * Admin user management page component.
 * @returns {JSX.Element} - Admin user management page content.
 */
const AdminUserManagementPage = () => {
  return (
    <div className={`p-8 ${adminPageContainer}`}>
      {/* Page Header */}
      <div className={`flex justify-between items-center ${adminPageHeader}`}>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link to="/" className={`text-blue-500 underline ${linkStyle}`}>
          Back to Home
        </Link>
      </div>

      {/* Page Navigation */}
      <div className="mt-4 mb-8">
        <Link to="/admin/users" className={`mr-4 text-blue-500 underline ${linkStyle}`}>
          User Management
        </Link>
        {/* Add more admin links here as needed */}
      </div>

      {/* Main User Management Component */}
      <AdminUserManagement />
    </div>
  );
};

// Export the AdminUserManagementPage component
export default AdminUserManagementPage;