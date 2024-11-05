/*
Version: 1.5
Template Header component for the frontend layout.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

import { Link } from 'react-router-dom'; // Import the Link component from React Router
import { headerContainer, menuItem } from '../../styles/layout/header.css'; // Import the header styles
import { primaryButton, secondaryButton, menuButton } from '../../styles/common/buttons.css';
import Logo from './Logo'; // Import the Logo component
import useAuth from '../../hooks/useAuth'; // Import the custom useAuth hook
import useCart from '../../hooks/useCart'; // Import the custom useCart hook
import { useState } from 'react'; // Import the useState hook

/**
 * Header component to display the site header.
 * @returns {JSX.Element} - The Header component
 */
const Header = () => {
  const { user, logout } = useAuth(); // Destructure user and logout function from context
  const { cart } = useCart(); // Destructure cart and refreshCart function from context 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State to handle the mobile menu toggle
  const countCart = cart.reduce((acc, item) => acc + item.quantity, 0); // Calculate the total quantity of items in the cart

  // Define the menu items array
  const menuItems = [
    { name: 'Home', url: '/' }, // Home
    { name: 'About', url: '/about' }, // About
    { name: 'Services', url: '/services' }, // Services
    { name: 'Contact', url: '/contact-us' }, // Contact
  ];

  // Check if the user is an admin and add the Admin menu item if needed
  if (user?.isAdmin) {
    menuItems.push({ name: 'Admin', url: '/admin' });
  }

  // Return the JSX for the Header component
  return (
    <>
      {/* Header section */}
      <header className={`bg-white shadow-md py-4 ${headerContainer}`}>
        {/* Header container */}
        <div className="container mx-auto flex items-center justify-between">
          {/* Header left col - logo */}
          <div className="text-2xl font-bold">
            {/* Logo component */}
            <Logo />
          </div>

          {/* Main Menu (Hidden on mobile, visible on lg and above) */}
          <nav className="hidden lg:flex space-x-4">
            {/* Map the menu items array to create the menu links */}
            {menuItems.map((item, index) => (
              // Create a menu item for each item in the array
              <Link to={item.url} key={index} className={menuItem}>
                {item.name}
              </Link>
            ))}
          </nav>
          {/* Header right col - user greeting and buttons */}
          <div className="flex flex-col justify-end items-end">
            {/* Greeting for authenticated users */}
            {user && (
              // Show the greeting message if the user is authenticated
              <div className="text-lg font-medium text-end">
                {/* Greeting message with the user's first name and a link to profile */}
                Hello, <Link to="/profile">{user.firstName}</Link>!
              </div>
            )}
            {/* Buttons contaner */}
            <div className="flex items-end justify-end gap-1 md:gap-2 m-0">
              {/* Hamburger Icon for Mobile, invisible on lg and above */}
              <button
                className={`${menuButton} flex items-center justify-center text-gray-600 whitespace-nowrap min-w-9 lg:hidden`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} // Toggle the mobile menu on click
              >
                <i className="fas fa-bars text-sm"></i>
              </button>
              {user ? (
                // Show logout button and cart icon if user is authenticated
                <>
                  {/* Cart link */}
                  <Link to="/cart">
                    {/* Cart button with the cart icon and the total quantity of items */}
                    <button className={`${primaryButton} flex items-center justify-center text-white whitespace-nowrap min-w-9`}>
                       {/* Cart Icon */}
                      <i className="fas fa-shopping-cart text-sm"></i>
                      {/* Show the total quantity of items in the cart if there are any items in cart */}
                      {countCart > 0 && (
                        <span className="text-white ml-1 md:ml-2 text-sm no-underline">
                          {countCart}
                        </span>
                      )}
                    </button>
                  </Link>
                  {/* Logout button */}
                  <button 
                    className={`${secondaryButton} flex items-center justify-center text-white whitespace-nowrap min-w-9`} 
                    onClick={logout} // Call the logout function on click
                  >
                    {/* Logout Icon */}
                    <i className="fas fa-sign-out-alt text-sm"></i>
                    {/* Logout text, visible on md and above */}
                    <span className="text-white ml-2 text-sm hidden md:inline">
                      Exit
                    </span>
                  </button>
                </>
              ) : (
                // Show Sign Up and Login buttons if no user is authenticated
                <>
                  {/* Sign Up link */}
                  <Link to="/register">
                    {/* Sign Up button */}
                    <button className={`${primaryButton} flex items-center justify-center text-white whitespace-nowrap min-w-9`}>
                      {/* Sign Up Icon */}
                      <i className="fas fa-pencil text-sm"></i>
                      {/* Sign Up text, visible on md and above */}
                      <span className="text-white ml-2 text-sm hidden md:inline">
                        Sign&nbsp;Up
                      </span>
                    </button>
                  </Link>
                  {/* Login link */}
                  <Link to="/login">
                    {/* Login button */}
                    <button className={`${secondaryButton} flex items-center justify-center text-white whitespace-nowrap min-w-9`}>
                      {/* Login Icon */}
                      <i className="fas fa-lock-open text-sm"></i>
                      {/* Login text, visible on md and above */}
                      <span className="text-white ml-2 text-sm hidden md:inline">
                        Login
                      </span>
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu, invisible on lg and above */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4">
            {/* Mobile menu container */}
            <nav className="flex flex-col space-y-2">
              {/* Map the menu items array to create the mobile menu links */}
              {menuItems.map((item, index) => (
                // Create a menu item for each item in the array
                <Link to={item.url} key={index} className={menuItem} onClick={() => setMobileMenuOpen(false)}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

// Export the Header component
export default Header;
