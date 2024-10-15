/*
Version: 1.1
Profile page for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/
import useAuth from '../../hooks/useAuth'; // Import your custom useAuth hook

/**
 * Profile component to display user profile details.
 *
 * @returns {JSX.Element} - Profile page content.
 */
const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.firstName || 'User'}</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
};

// Export the Profile component
export default Profile;
