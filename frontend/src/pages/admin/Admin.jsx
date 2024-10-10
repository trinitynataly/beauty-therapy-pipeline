/*
Version: 1.0
Admin component to display the admin dashboard.
Last Edited by: Natalia Pakhomova
Last Edit Date: 10/09/2024
*/

import { Link } from 'react-router-dom'; // Import the Link component from React Router

/**
 * Admin component to display the admin dashboard.
 * @returns {JSX.Element} - Admin dashboard content.
 */
const Admin = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to="/admin/users">Manage Users</Link>
        </li>
      </ul>
    </div>
  );
};

// Export the Admin component
export default Admin;
