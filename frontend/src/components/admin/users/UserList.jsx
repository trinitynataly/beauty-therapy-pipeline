/*
Version: 1.3
UserList component for the display of all users in the admin panel.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

import PropTypes from 'prop-types'; // Import the PropTypes library from the prop-types package
import { tableRow } from '../../../styles/common/forms.css'; // Import the form and table styles

/**
 * UserList component to display a list of users.
 * @param {Array} users - The list of users to display
 * @param {Function} onEditUser - The function to handle user editing
 * @param {Function} onDeleteUser - The function to handle user deletion
 * @returns {JSX.Element} - The UserList component
 */
const UserList = ({ users, onEditUser, onDeleteUser }) => {
  // Return the JSX for the UserList
  return (
    <>
      {/* Table container */}
      <div className="shadow-lg rounded-lg p-4">
        {/* Table */}
        <table className="w-full table-auto">
          {/* Table header */}
          <thead>
            <tr>
              <th className="border-b-2 p-2 text-left">Email</th> {/* Email header */}
              <th className="border-b-2 p-2 text-left">Name</th> {/* Name header */}
              <th className="border-b-2 p-2 text-left">Phone</th> {/* Phone header */}
              <th className="border-b-2 p-2 text-center">Admin</th> {/* Admin header */}
              <th className="border-b-2 p-2 text-center">Active</th> {/* Active header */}
              <th className="border-b-2 p-2">&nbsp;</th> {/* Actions header */}
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {/* Map through each user */}
            {users.map((user) => (
              <tr key={user.email} className={tableRow}>
                <td className="p-2">{user.email}</td> {/* Email cell */}
                <td className="p-2">{`${user.firstName} ${user.lastName}`}</td> {/* Name cell */}
                <td className="p-2">{user.phone}</td> {/* Phone cell */}
                <td className="p-2 text-center">{user.isAdmin ? 'Yes' : 'No'}</td> {/* isAdmin cell */}
                <td className="p-2 text-center">{user.isActive ? 'Yes' : 'No'}</td>  {/* isActive cell */}
                <td className="p-2 text-right"> {/* Actions cell */}
                  {/* Edit button */}
                  <button
                    className={`mr-2 bg-primary text-white px-4 py-1 rounded`}
                    onClick={() => onEditUser(user)}
                  >
                    Edit
                  </button>
                  {/* Delete button */}
                  <button
                    className={`bg-secondary text-white px-4 py-1 rounded`}
                    onClick={() => onDeleteUser(user.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Define the prop types for the UserList component
UserList.propTypes = {
  users: PropTypes.array.isRequired, // Array of users
  onEditUser: PropTypes.func.isRequired, // Function to handle user editing
  onDeleteUser: PropTypes.func.isRequired, // Function to handle user deletion
};

// Export the UserList component
export default UserList;
