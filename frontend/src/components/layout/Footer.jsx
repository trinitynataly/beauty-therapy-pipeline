/*
Version: 1.1
Template Footer component for the frontend layout.
Last Edited by: Natalia Pakhomova
Last Edit Date: 11/10/2024
*/

// Import the footer styles
import { footerContainer, footerMenu, footerMenuItem } from '../../styles/footer.css';
// Import the Logo component
import Logo from './Logo';

/**
 * Footer component to display the site footer.
 * @returns {JSX.Element} - The Footer component
 */
const Footer = () => {

  const services = [
    { name: 'Body Treatments', url: '/services#body-treatments' },
    { name: 'Facials', url: '/services#facials' },
    { name: 'Face Waxing', url: '/services#face-waxing' },
    { name: 'Body Waxing', url: '/services#body-waxing' },
    { name: 'Tinting', url: '/services#tinting' },
  ];

  // Return the JSX for the Footer component
  return (
    <footer className={`text-white p-6 ${footerContainer}`}>
      <div className="container mx-auto pt-6">
        <Logo variant="white" />
        <div className="flex mt-6 flex-col md:flex-row md:justify-between">
          {/* General info menu */}
          <div>
            <h4 className="font-bold mb-2">General Information</h4>
            <nav className={`flex flex-col ${footerMenu}`}>
              <a href="/" className={footerMenuItem}>Home</a>
              <a href="/about" className={footerMenuItem}>About</a>
              <a href="/contact" className={footerMenuItem}>Contact</a>
            </nav>
          </div>

          {/* Services menu */}
          <nav className={`flex flex-col ${footerMenu}`}>
            <h4 className="font-bold mb-2">Services</h4>
            <nav className={`flex flex-col ${footerMenu}`}>
              {services.map((service, index) => (
                <a key={index} href={service.url} className={footerMenuItem}>{service.name}</a>
              ))}
            </nav>
          </nav>

          {/*Working hours */}
          <div>
            <h4 className="font-bold mb-2">Working Hours</h4>
            <p className="text-sm mb-1"><strong>Monday:</strong> 10:00 AM - 3:00 PM</p>
            <p className="text-sm mb-1"><strong>Tuesday:</strong> 10:00 AM - 3:00 PM</p>
            <p className="text-sm mb-1"><strong>Saturday:</strong> 10:00 AM - 7:00 PM</p>
            <p className="text-sm"><strong>Public Holidays:</strong> Closed</p>
          </div>

          {/*Wor */}
          <div>
            <h4 className="font-bold mb-2">Contacts</h4>
            <p className="text-sm mb-1"><strong>Email:</strong> <a href="mailto:Gulia@beautybygulia.com">Gulia@beautybygulia.com</a></p>
            <p className="text-sm mb-1"><strong>Phone:</strong> <a href="tel:+1234567890">0477 547 398</a></p>
            
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 border-t border-white pt-4">
          <p className="text-xs">&copy; {new Date().getFullYear()} Natalia Pakhomova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Export the Footer component
export default Footer;
