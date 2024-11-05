/*
Version: 1.6
Admin user management component
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

import { useState, useEffect } from 'react'; // Import the useState and useEffect hooks from React
import UserList from './UserList'; // Import the UserList component
import UserForm from './UserForm'; // Import the UserForm component
import { apiSecureRequest } from '../../../utils/auth'; // Import the apiSecureRequest function
import useToast from '../../../hooks/useToast'; // Import the useToast hook

/**
 * Admin user management component to manage users.
 * @returns {JSX.Element} - The AdminUserManagement component
 */
const AdminUserManagement = () => {
  const [users, setUsers] = useState([]); // List of users
  const [selectedUser, setSelectedUser] = useState(null); // User selected for editing
  const [isCreating, setIsCreating] = useState(false); // Flag for toggling create form
  const { showToast } = useToast(); // Get the showToast function from the useToast hook

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
      // Remove the confirm password field
      delete formData.confirmPassword;
      // Check if the password field is empty
      if (!formData.password) {
        // Remove the password field if it is empty
        delete formData.password;
      }

      // Check if a user is selected
      if (selectedUser) {
        // Remove email field from form data
        delete formData.email;
        // Update user
        await apiSecureRequest(`admin/users/${selectedUser.email}`, 'PUT', formData);
        // Show success message
        showToast('User Updated', 'User details have been updated', 'confirm');
      } else {
        // Create new user
        await apiSecureRequest('admin/users', 'POST', formData);
        // Show success message
        showToast('User Created', 'A new user has been created', 'confirm');
      }
      // Refresh user list
      fetchUsers();
      // Reset selected user and create flag
      setSelectedUser(null);
      // Reset the create flag
      setIsCreating(false);
    } catch (error) { // Catch any errors
      // Log the error in the console
      console.error('Failed to submit form:', error);
      // Show an error message
      showToast('Error', `Failed to submit form: ${error?.message || 'An unknown error has occured'}`, 'error');
    }
  };

  // Function to handle user deletion
  const handleDeleteUser = async (email) => {
    try {
      // Delete the user from the API
      await apiSecureRequest(`admin/users/${email}`, 'DELETE');
      // Fetch users again
      fetchUsers();
      // Show a success message
      showToast('User Deleted', 'The user has been deleted', 'confirm');
    } catch (error) { // Catch any errors
      // Log the error in the console
      console.error('Failed to delete user:', error);
      // Show an error message
      showToast('Error', `Failed to delete user: ${error?.message || 'An unknown error has occured'}`, 'error');
    }
  };

  // Render the component
  return (
    <>
      {/* User List */}
      <UserList users={users} onEditUser={setSelectedUser} onDeleteUser={handleDeleteUser} />
      {/* Conditionally show Create/Edit User Form */}
      {selectedUser || isCreating ? (
        // Show the UserForm component
        <UserForm
          user={selectedUser}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setSelectedUser(null);
            setIsCreating(false);
          }}
        />
      ) : (
        // Show the Create New User button
        <button
          className="mt-4 bg-primary text-white px-4 py-2 rounded"
          onClick={() => setIsCreating(true)}
        >
          Create New User
        </button>
      )}
    </>
  );
};

// Export the AdminUserManagement component
export default AdminUserManagement;
