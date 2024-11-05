/*
Version: 1.2
Displays service details in an e-commerce style with an 'Add to Cart' button.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

// Import necessary libraries
import { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import { Helmet } from 'react-helmet-async'; // Import Helmet component
import { useParams } from 'react-router-dom'; // Import useParams hook
import { apiRequest } from '../utils/api'; // Import apiRequest utility function for performing general requests
import { apiSecureRequest } from '../utils/auth';  // Import apiSecureRequest utility function for performing secure requests
import useToast from '../hooks/useToast'; // Import useToast hook
import useCart from '../hooks/useCart'; // Import useCart hook
import NotFound from './NotFound'; // Import NotFound component

// Import styles
import { sectionTitle } from '../styles/common/texts.css'; // Import text styles
import { secondaryButton } from '../styles/common/buttons.css'; // Import button styles
import { productPageStyle, productImageStyle, productInfoStyle } from '../styles/common/blocks.css'; // Import block styles

/**
 * Service detail page component
 * @returns {JSX.Element} Service page content
 */
const ServiceDetail = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [service, setService] = useState(null); // Service state
  const [loading, setLoading] = useState(true); // Loading state
  const [addingToCart, setAddingToCart] = useState(false); // Adding to cart state
  const { showToast } = useToast(); // Get the showToast function from the useToast hook
  const { reloadCart } = useCart(); // Get the reloadCart function from the useCart hook

  // Fetch service details from the backend
  useEffect(() => {
    // Fetch service details function
    const fetchService = async () => {
      try {
        // Fetch service details from the backend
        const response = await apiRequest(`services/${slug}`, 'GET');
        // Set the service state with the response
        setService(response);
      } catch (error) { // Catch any errors
        // Show an error toast message
        showToast('Error', `Failed to fetch service details: ${error?.message || 'An unknown error has occured'}`, 'error');
      } finally { // Finally, do this regardless of the outcome
        // Set loading to false
        setLoading(false);
      }
    };
    // Call the fetchService function
    fetchService();
  }, [showToast, slug]); // Dependencies for the useEffect hook

  // Function to handle adding a service to the cart
  const handleAddToCart = async () => {
    // Set adding to cart to true
    setAddingToCart(true);
    try {
      // Make a secure request to add the service to the cart
      await apiSecureRequest('cart', 'POST', { serviceId: service.id, quantity: 1 });
      // Show a success toast message
      showToast('Success', 'Service added to cart', 'confirm');
      // Reload the cart
      reloadCart();
    } catch (error) { // Catch any errors
      // Show an error toast message
      showToast('Error', `Failed to add service to cart: ${error?.message || 'An unknown error has occured'}`, 'error'); 
    } finally { // Finally, do this regardless of the outcome
      setAddingToCart(false); // Set adding to cart flag to false
    }
  };

  // If the page is loading, display a loading message
  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  // If the service is not found, show the NotFound component
  if (!service) {
    return <NotFound />;
  }

  // Return the service detail content
  return (
    <>
      {/* Helmet component */}
      <Helmet>
        {/* Page title */}
        <title>{service.name} | Beauty by Gulia</title>
        {/* Meta description */}
        <meta name="description" content={`Discover more about our ${service.name} service. ${service.description}`} />
      </Helmet>

      {/* Service Content */}
      <section className={`py-16 ${productPageStyle}`}>
        {/* Service Detail Container */}
        <div className="container mx-auto">
          {/* Service Detail */}
          <div className="flex flex-col md:flex-row flex-nowrap gap-6 lg:gap-12 items-start justify-start">
            {/* Service Image Container */}
            <div className={`${productImageStyle} flex justify-center items-center w-full md:w-2/5`}>
              {/* Service Image */}
              <img src={service.imageUrl} alt={service.name} className="w-full h-auto object-cover rounded-lg" />
            </div>

            {/* Service Info container */}
            <div className={`${productInfoStyle} flex flex-col justify-center w-full md:w-3/5`}>
              {/* Service Name */}
              <h1 className={`${sectionTitle} text-start`}>{service.name}</h1>
              {/* Service Description */}
              <p className="text-lg mt-4 mb-6">{service.description}</p>
              {/* Service Price */}
              <p className="text-2xl font-bold mb-4">${service.price.toFixed(2)}</p>
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart} // Add to cart button click handler
                className={`${secondaryButton} text-lg font-bold h-12 px-20 py-2 rounded-full mt-4`}
                disabled={addingToCart} // Disable the button if adding to cart
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'} {/* Button text, change to 'Adding...' when adding to cart */}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Export the ServiceDetail component
export default ServiceDetail;
