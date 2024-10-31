/*
Version: 1.1
Service detail page for the frontend.
Displays service details in an e-commerce style with an 'Add to Cart' button.
Last Edited by: Natalia Pakhomova
Last Edit Date: 31/10/2024
*/

// Import necessary libraries
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

// Import apiRequest utility function
import { apiRequest } from '../utils/api';

// Import apiSecuredRequest utility function
import { apiSecureRequest } from '../utils/auth';

// Import useToast hook
import useToast from '../hooks/useToast';
// Import useCart hook
import useCart from '../hooks/useCart';

// Import styles
import { sectionTitle } from '../styles/common/texts.css';
import { secondaryButton } from '../styles/common/buttons.css';
import { productPageStyle, productImageStyle, productInfoStyle } from '../styles/common/blocks.css';

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
    const fetchService = async () => {
      try {
        const response = await apiRequest(`services/${slug}`, 'GET'); // Using apiRequest utility function
        setService(response);
      } catch (error) {
        console.error('Error fetching service details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  // Handle add to cart action
  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await apiSecureRequest('cart', 'POST', { serviceId: service.id, quantity: 1 });
      showToast('Success', 'Service added to cart', 'confirm');
      reloadCart();
    } catch (error) {
      console.error('Error adding service to cart:', error);
      showToast('Error', `Failed to add service to cart: ${error.message?error.message:'An unknown error has occured'}`, 'error');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (!service) {
    return <div className="text-center py-16">Service not found.</div>;
  }

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
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Service Image */}
            <div className={`${productImageStyle} flex justify-center items-center`}>
              <img src={service.imageUrl} alt={service.name} className="w-full h-auto object-cover rounded-lg" />
            </div>

            {/* Service Info */}
            <div className={`${productInfoStyle} flex flex-col justify-center`}>
              <h1 className={sectionTitle}>{service.name}</h1>
              <p className="text-lg mt-4 mb-6">{service.description}</p>
              <p className="text-2xl font-bold mb-4">${service.price.toFixed(2)}</p>
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`${secondaryButton} text-lg font-bold h-12 px-20 py-2 rounded-full mt-4`}
                disabled={addingToCart}
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
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
