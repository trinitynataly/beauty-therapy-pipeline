/*
Version: 1.2
Template Header component for the frontend layout.
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

import { Link } from 'react-router-dom'; // Import the Link component from React Router
import { headerContainer, menuItem } from '../../styles/layout/header.css'; // Import the header styles
import { primaryButton, secondaryButton } from '../../styles/common/buttons.css';
import Logo from './Logo'; // Import the Logo component
import useAuth from '../../hooks/useAuth'; // Import the custom useAuth hook

/**
 * Header component to display the site header.
 * @returns {JSX.Element} - The Header component
 */
const Header = () => {
  const { user, logout } = useAuth(); // Destructure user and logout function from context
  // Return the JSX for the Header component
  return (
    <header className={`bg-white shadow-md p-4 ${headerContainer}`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Logo/>
        </div>
        
        {/* Menu */}
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className={menuItem}>Home</Link>
          <Link to="/about" className={menuItem}>About</Link>
          <Link to="/services" className={menuItem}>Services</Link>
          <Link to="/contact-us" className={menuItem}>Contact</Link>
          {user?.isAdmin === true && (
            <Link to="/admin" className={menuItem}>Admin</Link>
          )}
        </nav>

        {/* Special Buttons */}
        <div className="space-x-2">
          {user ? (
            // Show logout button if user is authenticated
            <>
              <div>Hello, { user.firstName }!</div>
              <button className={primaryButton} onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            // Show Sign Up and Login buttons if no user is authenticated
            <>
              <Link to="/register">
                <button className={primaryButton}>Sign Up</button>
              </Link>
              <Link to="/login">
                <button className={secondaryButton}>Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
