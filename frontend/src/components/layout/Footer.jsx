/*
Version: 1.0
Template Footer component for the frontend layout.
Last Edited by: Natalia Pakhomova
Last Edit Date: 03/09/2024
*/

// Import the footer styles
import { footerContainer, footerLogo, footerMenu, footerMenuItem } from '../../styles/footer.css';

/**
 * Footer component to display the site footer.
 * @returns {JSX.Element} - The Footer component
 */
const Footer = () => {
  // Return the JSX for the Footer component
  return (
    <footer className={`bg-gray-900 text-white p-6 ${footerContainer}`}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo and Info */}
        <div>
          <div className={footerLogo}>Logo</div>
          <p className="mt-2 text-sm">Some information about the company or additional details can go here.</p>
        </div>

        {/* Menu */}
        <nav className={`flex flex-col ${footerMenu}`}>
          <a href="/" className={footerMenuItem}>Home</a>
          <a href="/about" className={footerMenuItem}>About</a>
          <a href="/services" className={footerMenuItem}>Services</a>
          <a href="/contact-us" className={footerMenuItem}>Contact</a>
        </nav>

        {/* Contact Details */}
        <div>
          <h4 className="font-bold mb-2">Contact Us</h4>
          <p className="text-sm">123 Main Street, Melbourne</p>
          <p className="text-sm">Email: info@site.com</p>
          <p className="text-sm">Phone: 0400 000 000</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 border-t border-gray-700 pt-4">
        <p className="text-xs">&copy; {new Date().getFullYear()} Natalia Pakhomova. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Export the Footer component
export default Footer;
