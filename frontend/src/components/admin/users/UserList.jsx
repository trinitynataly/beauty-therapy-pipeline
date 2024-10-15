/*
Version: 1.1
UserList component for the display of all users in the admin panel.
Last Edited by: Natalia Pakhomova
Last Edit Date: 10/15/2024
*/

import PropTypes from 'prop-types'; // Import the PropTypes library from the prop-types package
import { userListContainer, userItem, actionButton } from '../../../styles/admin.css.js'; // Import the CSS modules

/**
 * UserList component to display a list of users.
 * @param {Array} users - The list of users to display
 * @param {Function} onEditUser - The function to handle user editing
 * @param {Function} onDeleteUser - The function to handle user deletion
 * @returns {JSX.Element} - The UserList component
 */
const UserList = ({ users, onEditUser, onDeleteUser }) => {
  return (
    <div className={`shadow-lg rounded-lg p-4 ${userListContainer}`}>
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border-b-2 p-2 text-left">Email</th>
            <th className="border-b-2 p-2 text-left">Name</th>
            <th className="border-b-2 p-2 text-left">Phone</th>
            <th className="border-b-2 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email} className={userItem}>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{`${user.firstName} ${user.lastName}`}</td>
              <td className="p-2">{user.phone}</td>
              <td className="p-2">
                <button
                  className={`mr-2 bg-green-500 text-white px-4 py-1 rounded ${actionButton}`}
                  onClick={() => onEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className={`bg-red-500 text-white px-4 py-1 rounded ${actionButton}`}
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
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onEditUser: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};

export default UserList;
