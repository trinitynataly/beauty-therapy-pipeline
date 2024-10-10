/*
Version: 1.0
Template Layout component for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 03/09/2024
*/

import { Outlet } from 'react-router-dom'; // Import the Outlet component from React Router
import Header from './Header'; // Import the Header component
import Footer from './Footer'; // Import the Footer component

/**
 * Layout component to wrap the main content of the site.
 * @returns {JSX.Element} - The Layout component
 */
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Export the Layout component
export default Layout;

