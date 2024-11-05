/*
Version: 1.2
Template for 404 - Not Found page.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

// Import Helmet component
import { Helmet } from 'react-helmet-async';
// Import text styles
import { sectionTitle } from '../styles/common/texts.css';
// Import Link from react-router-dom
import { Link } from 'react-router-dom';
// Import the NotFound image
import notFound from '../assets/not-found.jpg';

/**
 * Template for 404 - Not Found page.
 * @returns {JSX.Element} 404 - Page Not Found component
 */
const NotFound = () => (
  <>
    {/* Helmet component */}
    <Helmet>
      {/* Page title */}
      <title>404 - Not Found | Beauty by Gulia</title>
      {/* Meta description */}
      <meta name="description" content="Oops! It looks like the page you're looking for doesn't exist. But here's a cute starfish to brighten your day!" />
    </Helmet>
    {/* 404 - Not Found page container */}
    <div className="container mx-auto mt-6">
      {/* 404 - Not Found image */}
      <img src={notFound} alt="404 - Not Found" className="w-full"/>
      {/* 404 - Not Found title */}
      <h1 className={`${sectionTitle} text-left mt-3`}>404 - Page Not Found</h1>
      {/* 404 - Not Found text */}
      <p>Oops! It looks like the page you&apos;re looking for doesn&apos;t exist. But here&apos;s a cute starfish to brighten your day!</p>
      <p className="mt-3">Feel free to click below to return to the home page and keep exploring.</p>
      {/* Return to Home Page link */}
      <p className="mt-3">
        {/* Link to the Home Page */}
        <Link to="/">Return to Home Page &gt;&gt;</Link></p>
    </div>
  </>
);

// Export the NotFound component
export default NotFound;