/*
Version: 1.3
Template Header component for the frontend layout.
Last Edited by: Natalia Pakhomova
Last Edit Date: 31/10/2024
*/

import { Link } from 'react-router-dom'; // Import the Link component from React Router
import { headerContainer, menuItem } from '../../styles/layout/header.css'; // Import the header styles
import { primaryButton, secondaryButton } from '../../styles/common/buttons.css';
import Logo from './Logo'; // Import the Logo component
import useAuth from '../../hooks/useAuth'; // Import the custom useAuth hook
import useCart from '../../hooks/useCart'; // Import the custom useCart hook

/**
 * Header component to display the site header.
 * @returns {JSX.Element} - The Header component
 */
const Header = () => {
  const { user, logout } = useAuth(); // Destructure user and logout function from context
  const { cart } = useCart(); // Destructure cart and refreshCart function from context 

  const countCart = cart.reduce((acc, item) => acc + item.quantity, 0);

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
        <div>
          {user ? (
            // Show logout button and cart icon if user is authenticated
            <>
              <div className="text-lg font-medium">Hello, {user.firstName}!</div>
              <div className="flex items-center gap-2 m-0">
                <Link to="/cart">
                  <button className={`${primaryButton} flex flex-row items-center`}>
                    <i className="fas fa-shopping-cart text-sm"></i>
                    {countCart > 0 && (
                      <span className="text-white ml-2 text-md">
                        {countCart}
                      </span>
                    )}
                  </button>
                </Link>
                <button className={primaryButton} onClick={logout}>
                  <i className="fas fa-sign-out-alt mr-1"></i> Exit
                </button>
              </div>
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
