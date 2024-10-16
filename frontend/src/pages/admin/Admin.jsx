/*
Version: 1.3
Admin component to display the admin dashboard.
Last Edited by: Natalia Pakhomova
Last Edit Date: 16/10/2024
*/

// Import Helmet component
import { Helmet } from 'react-helmet-async';
// Import necessary libraries and components
import { Link } from 'react-router-dom';
// Import text styles
import { sectionTitle } from '../../styles/common/texts.css';

/**
 * Admin component to display the admin dashboard.
 * @returns {JSX.Element} - Admin dashboard content.
 */
const Admin = () => {
  return (
    <>
      {/* Helmet component */}
      <Helmet>
        {/* Page title */}
        <title>Admin Dashboard | Beauty by Gulia</title>
        {/* Meta description */}
        <meta name="description" content="Admin dashboard for managing users, categories, and services on the Beauty by Gulia website." />
      </Helmet>
      <section className="py-16">
        {/* Container */}
        <div className="container mx-auto px-4 text-center">
          <h1 className={sectionTitle}>Admin Dashboard</h1>
          {/* Admin Links */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
            {/* Manage Users Block */}
            <Link to="/admin/users" className="w-80 h-48 flex flex-col justify-center items-center bg-primary text-white hover:text-white hover:no-underline rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <i className="fas fa-users text-5xl mb-4"></i>
              <span className="text-xl font-semibold">Manage Users</span>
            </Link>
            {/* Manage Categories Block */}
            <Link to="/admin/categories" className="w-80 h-48 flex flex-col justify-center items-center bg-primary text-white hover:text-white hover:no-underline rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <i className="fas fa-tags text-5xl mb-4"></i>
              <span className="text-xl font-semibold">Manage Categories</span>
            </Link>
            {/* Manage Services Block */}
            <Link to="/admin/services" className="w-80 h-48 flex flex-col justify-center items-center bg-primary text-white hover:text-white hover:no-underline rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <i className="fas fa-cogs text-5xl mb-4"></i>
              <span className="text-xl font-semibold">Manage Services</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

// Export the Admin component
export default Admin;
