/*
Version: 1.2
Services page for the frontend.
Loads services with categories from the API and displays them in blocks.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

// Import necessary libraries
import { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import { Helmet } from 'react-helmet-async'; // Import Helmet component
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation hooks
import { apiRequest } from '../utils/api'; // Import apiRequest utility function
import useToast from '../hooks/useToast'; // Import useToast hook

// Import styles
import { circleImage } from '../styles/common/images.css'; // Import image styles
import { sectionTitle, sectionSubTitle } from '../styles/common/texts.css'; // Import text styles
import { secondaryButton } from '../styles/common/buttons.css'; // Import button styles
import { aboutStyle } from '../styles/common/blocks.css'; // Import block styles

/**
 * Services page component
 * @returns {JSX.Element} Services page content
 */
const Services = () => {
  const [categories, setCategories] = useState([]); // Categories state
  const location = useLocation(); // Get the current location
  const { showToast } = useToast(); // Get the showToast function from the useToast hook

  // Fetch categories with services from the backend
  useEffect(() => {
    // Fetch categories with services function
    const fetchCategoriesWithServices = async () => {
      try {
        // Fetch categories with services from the backend
        const response = await apiRequest('services', 'GET');
        // Set the categories state with the response
        setCategories(response);
      } catch (error) {
        // Show an error toast message
        showToast('Error', `Failed to fetch services: ${error?.message || 'An unknown error has occured'}`, 'error');
      }
    };
    // Call the fetchCategoriesWithServices function
    fetchCategoriesWithServices();
  }, [showToast]);

  // Scroll to service if anchor is in URL
  useEffect(() => {
    // Check if there is a hash in the URL
    if (location.hash) {
      // Get the service element by the hash
      const serviceElement = document.getElementById(location.hash.substring(1));
      // If the service element exists, scroll to it
      if (serviceElement) {
        serviceElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location, categories]); // Dependencies for the useEffect hook

  // Return the Services component
  return (
    <>
      {/* Helmet component */}
      <Helmet>
        {/* Page title */}
        <title>Services | Beauty by Gulia</title>
        {/* Meta description */}
        <meta name="description" content="Explore our wide range of beauty services offered by Beauty by Gulia. Find the perfect service to meet your beauty needs and book your spot today!" />
      </Helmet>

      {/* Hero Section */}
      <div className={`${aboutStyle} flex items-center justify-center text-white`}>
        {/* Hero container */}
        <div className="container mx-auto">
          {/* Hero content */}
          <div className="text-center relative z-10">
            {/* Hero subtitle */}
            <h1 className="text-2xl font-normal pb-2">Discover our Services</h1>
            {/* Hero title */}
            <h2 className="text-6xl font-bold">Where Passion Meets Care</h2>
          </div>
        </div>
      </div>

      {/* Services Content */}
      <section className="py-16">
        {/* Services container */}
        <div className="container mx-auto">
          {/* Loop through categories */}
          {categories.map((category) => (
            <div key={category.id} className="mt-12">
              {/* Anchor for scrolling */}
              <div id={category.name.replace(/\s+/g, '-').toLowerCase()}></div>
              {/* Category title */}
              <h3 className={sectionTitle}>{category.name}</h3>
              {/* If the category has services, display them */}
              {category.services.length > 0 ? (
                // Services grid
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-6">
                  {/* Loop through services within each category */}
                  {category.services.map((service) => (
                    // Service block
                    <div key={service.id} id={service.slug} className="text-center border border-gray-200 rounded-lg p-6">
                      {/* Link to the service detail page */}
                      <Link to={`/services/${service.slug}`}>
                        {/* Service image container */}
                        <div className={`${circleImage} mb-3`}>
                          {/* Service image */}
                          <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover" />
                        </div>
                        {/* Service name */}
                        <h4 className={sectionSubTitle}>{service.name}</h4>
                        {/* Service price */}
                        <p className="mt-2 text-lg font-semibold">${service.price.toFixed(2)}</p>
                        {/* View details button */}
                        <button className={`${secondaryButton} mt-4 text-sm font-bold h-10 px-8 py-1 rounded-full`}>View Details</button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                // If the category has no services, display a message
                <p className="mt-4 text-center text-gray-500">This category currently has no services available.</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

// Export the Services component
export default Services;
