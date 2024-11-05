/*
Version: 1.3
Template Footer component for the frontend layout.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

// Import the footer styles
import { footerContainer, footerMenu, footerMenuItem } from '../../styles/layout/footer.css';
// Import the Logo component
import Logo from './Logo';

/**
 * Footer component to display the site footer.
 * @returns {JSX.Element} - The Footer component
 */
const Footer = () => {

  // Define the services array
  const services = [
    { name: 'Body Treatments', url: '/services#body-treatments' }, // Body Treatments
    { name: 'Facials', url: '/services#facials' }, // Facials
    { name: 'Face Waxing', url: '/services#face-waxing' }, // Face Waxing
    { name: 'Body Waxing', url: '/services#body-waxing' }, // Body Waxing
    { name: 'Tinting', url: '/services#tinting' }, // Tinting
  ];

  // Return the JSX for the Footer component
  return (
    <>
      {/* Footer section */}
      <footer className={`text-white py-6 ${footerContainer}`}>
        {/* Footer container */}
        <div className="container mx-auto pt-6">
          {/* Logo (white variant) */}
          <Logo variant="white" />
          {/* Footer menu container */}
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {/* General info menu */}
            <div>
              {/* General info title */}
              <h4 className="font-bold mb-2">General Information</h4>
              {/* General info menu items */}
              <nav className={`flex flex-col mb-4 ${footerMenu}`}>
                <a href="/" className={footerMenuItem}>Home</a> {/* Home Link */}
                <a href="/about" className={footerMenuItem}>About</a> {/* About Link */}
                <a href="/contact" className={footerMenuItem}>Contact</a> {/* Contact Link */}
              </nav>
            </div>

            {/* Services menu */}
            <nav className={`flex flex-col ${footerMenu}`}>
              {/* Services title */}
              <h4 className="font-bold mb-2">Services</h4>
              {/* Services menu items */}
              <nav className={`flex flex-col mb-4 ${footerMenu}`}>
                {/* Map the services array to create the menu items */}
                {services.map((service, index) => (
                  // Create a menu item for each service
                  <a key={index} href={service.url} className={footerMenuItem}>{service.name}</a>
                ))}
              </nav>
            </nav>

            {/*Working hours menu */}
            <div>
              {/* Working hours title */}
              <h4 className="font-bold mb-2">Working Hours</h4>
              {/* Working hours info */}
              <p className="text-sm mb-1"><strong>Monday:</strong> 10:00 AM - 3:00 PM</p>
              <p className="text-sm mb-1"><strong>Tuesday:</strong> 10:00 AM - 3:00 PM</p>
              <p className="text-sm mb-1"><strong>Saturday:</strong> 10:00 AM - 7:00 PM</p>
              <p className="text-sm mb-4"><strong>Public Holidays:</strong> Closed</p>
            </div>

            {/* Contacts menu */}
            <div>
              {/* Contacts title */}
              <h4 className="font-bold mb-2">Contacts</h4>
              {/* Email */}
              <p className="text-sm mb-1"><strong>Email:</strong> <a href="mailto:Gulia@beautybygulia.com" className="text-white">Gulia@beautybygulia.com</a></p>
              {/* Phone */}
              <p className="text-sm mb-1"><strong>Phone:</strong> <a href="tel:+1234567890" className="text-white">0477 547 398</a></p>
            </div>
          </div>

          {/* Copyright row */}
          <div className="text-center mt-6 border-t border-white pt-4">
            {/* Copyright text */}
            <p className="text-xs">&copy; {new Date().getFullYear()} Natalia Pakhomova. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

// Export the Footer component
export default Footer;
