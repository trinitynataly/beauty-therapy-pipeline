/*
Version: 1.3
Admin user management component
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

import { useState, useEffect } from 'react'; // Import the useState and useEffect hooks from React
import UserList from './UserList'; // Import the UserList component
import UserForm from './UserForm'; // Import the UserForm component
import { apiSecureRequest } from '../../../utils/auth'; // Import the apiSecureRequest function
import { adminContainer } from '../../../styles/admin.css.js'; // Import the adminContainer class

/**
 * Admin user management component to manage users.
 * @returns {JSX.Element} - The AdminUserManagement component
 */
const AdminUserManagement = () => {
  const [users, setUsers] = useState([]); // List of users
  const [selectedUser, setSelectedUser] = useState(null); // User selected for editing
  const [isCreating, setIsCreating] = useState(false); // Flag for toggling create form

  // Function to fetch users from API
  const fetchUsers = async () => {
    try {
      // Fetch users from the API
      const response = await apiSecureRequest('admin/users', 'GET');
      // Set the users state
      setUsers(response);
    } catch (error) {
      // Log an error if the request fails
      console.error('Failed to fetch users:', error);
    }
  };

  // Load users on component mount
  useEffect(() => {
    // Call the fetchUsers function
    fetchUsers();
  }, []);

  // Function to handle form submission (create or update)
  const handleFormSubmit = async (formData) => {
    try {
      if (selectedUser) {
        // Update user
        await apiSecureRequest(`admin/users/${selectedUser.email}`, 'PUT', formData);
      } else {
        // Create new user
        await apiSecureRequest('admin/users', 'POST', formData);
      }
      // Refresh user list and reset form state
      fetchUsers();
      setSelectedUser(null);
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  // Function to handle user deletion
  const handleDeleteUser = async (email) => {
    try {
      await apiSecureRequest(`admin/users/${email}`, 'DELETE');
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div className={`p-8 ${adminContainer}`}>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* User List */}
      <UserList users={users} onEditUser={setSelectedUser} onDeleteUser={handleDeleteUser} />

      {/* Create/Edit User Form */}
      {selectedUser || isCreating ? (
        <UserForm
          user={selectedUser}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setSelectedUser(null);
            setIsCreating(false);
          }}
        />
      ) : (
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsCreating(true)}
        >
          Create New User
        </button>
      )}
    </div>
  );
};

export default AdminUserManagement;
