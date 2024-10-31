/*
Version: 1.1
Services page for the frontend.
Loads services with categories from the API and displays them in blocks.
Added functionality to auto-scroll to a specific service if anchor is provided in URL.
Last Edited by: Natalia Pakhomova
Last Edit Date: 29/10/2024
*/

// Import necessary libraries
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';

// Import apiRequest utility function
import { apiRequest } from '../utils/api';

// Import styles
import { circleImage } from '../styles/common/images.css';
import { sectionTitle, sectionSubTitle } from '../styles/common/texts.css';
import { secondaryButton } from '../styles/common/buttons.css';
import { aboutStyle } from '../styles/common/blocks.css';

/**
 * Services page component
 * @returns {JSX.Element} Services page content
 */
const Services = () => {
  const [categories, setCategories] = useState([]); // Categories state
  const location = useLocation();

  // Fetch categories with services from the backend
  useEffect(() => {
    const fetchCategoriesWithServices = async () => {
      try {
        const response = await apiRequest('services', 'GET'); // Using apiRequest utility function
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories with services:', error);
      }
    };

    fetchCategoriesWithServices();
  }, []);

  // Scroll to service if anchor is in URL
  useEffect(() => {
    if (location.hash) {
      const serviceElement = document.getElementById(location.hash.substring(1));
      if (serviceElement) {
        serviceElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location, categories]);

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
        <div className="text-center relative z-10">
          {/* Hero subtitle */}
          <h1 className="text-2xl font-normal pb-2">Discover our Services</h1>
          {/* Hero title */}
          <h1 className="text-6xl font-bold">Where Passion Meets Care</h1>
        </div>
      </div>

      {/* Services Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Loop through categories */}
          {categories.map((category) => (
            <div key={category.id} className="mt-12">
              {/* Anchor for scrolling */}
              <div id={category.name.replace(/\s+/g, '-').toLowerCase()}></div>
              <h3 className={sectionTitle}>{category.name}</h3>
              {category.services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-6">
                  {/* Loop through services within each category */}
                  {category.services.map((service) => (
                    <div key={service.id} id={service.slug} className="text-center border border-gray-200 rounded-lg p-6">
                      <Link to={`/services/${service.slug}`}>
                        <div className={`${circleImage} mb-3`}>
                          <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className={sectionSubTitle}>{service.name}</h4>
                        <p className="mt-2 text-lg font-semibold">${service.price.toFixed(2)}</p>
                        <button className={`${secondaryButton} mt-4 text-sm font-bold h-10 px-8 py-1 rounded-full`}>View Details</button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
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
