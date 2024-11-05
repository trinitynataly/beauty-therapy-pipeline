/*
Version: 1.2
Admin service management component.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

import { useState, useEffect } from 'react'; // Import useState and useEffect from React
import ServiceList from './ServiceList'; // Import ServiceList component
import ServiceForm from './ServiceForm'; // Import ServiceForm component
import { apiSecureRequest } from '../../../utils/auth'; // Import the apiSecureRequest function
import useToast from '../../../hooks/useToast'; // Import the useToast hook

/**
 * Admin service management component to manage services.
 * @returns {JSX.Element} - The AdminServiceManagement component
 */
const AdminServiceManagement = () => {
  const [services, setServices] = useState([]); // List of services
  const [categories, setCategories] = useState([]); // List of categories
  const [selectedService, setSelectedService] = useState(null); // Service selected for editing
  const [isCreating, setIsCreating] = useState(false); // Flag for toggling create form
  const { showToast } = useToast(); // Get the showToast function from the useToast hook

  // Function to fetch services from API
  const fetchServices = async () => {
    try {
      // Fetch services from the API
      const response = await apiSecureRequest('admin/services', 'GET');
      // Set the services state
      setServices(response);
    } catch (error) { 
      // Log any errors
      console.error('Failed to fetch services:', error);
    }
  };

  // Function to fetch categories from API
  const fetchCategories = async () => {
    try {
      // Fetch categories from the API
      const response = await apiSecureRequest('admin/categories', 'GET');
      // Set the categories state
      setCategories(response);
    } catch (error) {
      // Log any errors
      console.error('Failed to fetch categories:', error);
    }
  };

  // Load services and categories on component mount
  useEffect(() => {
    // Call the fetchServices function
    fetchServices();
    // Call the fetchCategories function
    fetchCategories();
  }, []);

  // Function to handle form submission (create or update)
  const handleFormSubmit = async (formData) => {
    try {
      // Check if a service is selected
      if (selectedService) {
        // Update the service in the API
        await apiSecureRequest(`admin/services/${selectedService.id}`, 'PUT', formData, true);
        // Show a success message
        showToast('Service Updated', 'Service details have been updated', 'confirm');
      } else {
        // Create a new service in the API
        await apiSecureRequest('admin/services', 'POST', formData, true);
        // Show a success message
        showToast('Service Created', 'A new service has been created', 'confirm');
      }
      // Fetch services again
      fetchServices();
      // Reset the form state
      setSelectedService(null);
      // Reset the create flag
      setIsCreating(false);
    } catch (error) {
      // Log the error in the console
      console.error('Failed to submit form:', error);
      // Show an error message
      showToast('Error', `Failed to submit form: ${error?.message || 'An unknown error has occured'}`, 'error');
    }
  };

  // Function to handle service deletion
  const handleDeleteService = async (id) => {
    try {
      // Delete the service from the API
      await apiSecureRequest(`admin/services/${id}`, 'DELETE');
      // Fetch services again
      fetchServices();
      // Show a success message
      showToast('Service Deleted', 'The service has been successfully deleted', 'confirm');
    } catch (error) {
      // Log any errors
      console.error('Failed to delete service:', error);
      // Show an error message
      showToast('Error', `Failed to delete service:  ${error?.message || 'An unknown error has occured'}`, 'error');
    }
  };

  // Return the AdminServiceManagement component
  return (
    <>
      {/* Service List */}
      <ServiceList services={services} onEditService={setSelectedService} onDeleteService={handleDeleteService} />

      {/* Conditionally dispaly Create/Edit Service Form */}
      {selectedService || isCreating ? (
        <ServiceForm
          service={selectedService}
          categories={categories}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setSelectedService(null);
            setIsCreating(false);
          }}
        />
      ) : (
        // Button to create a new service
        <button
          className="mt-4 bg-primary text-white px-4 py-2 rounded"
          onClick={() => setIsCreating(true)}
        >
          Create New Service
        </button>
      )}
    </>
  );
};

// Export the AdminServiceManagement component
export default AdminServiceManagement;
