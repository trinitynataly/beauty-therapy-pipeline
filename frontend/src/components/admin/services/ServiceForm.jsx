/*
Version: 1.1
ServiceForm component for editing and creating services in the admin panel with Joi validation.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

import { useState, useEffect } from 'react'; // Import useState and useEffect from React
import PropTypes from 'prop-types'; // Import PropTypes for defining component prop types
import Joi from 'joi'; // Import Joi for validation

/**
 * ServiceForm component to create and edit services.
 * @param {Object} service - The service object to edit
 * @param {Function} onSubmit - The function to handle form submission
 * @param {Function} onCancel - The function to handle form cancellation
 * @param {Array} categories - The list of categories to choose from
 * @returns {JSX.Element} - The ServiceForm component
 */
const ServiceForm = ({ service, onSubmit, onCancel, categories }) => {
  // State variable to hold form data
  const [formData, setFormData] = useState({
    name: '', // Service name, default empty
    image: null, // Service image, default null
    description: '', // Service description, default empty
    price: '', // Service price, default empty
    categoryId: '', // Service category ID, default empty
    slug: '', // Service slug, default empty  
    isPublished: true, // Published status, default true
  });
  // State variable to hold validation errors
  const [validationErrors, setValidationErrors] = useState({});

  // useEffect to set form data when editing an existing service
  useEffect(() => {
    // If a service is provided, set the form data
    if (service) {
      setFormData({
        name: service.name, // Set service name
        image: null, // Set service image to null
        description: service.description, // Set service description
        price: service.price, // Set service price
        categoryId: service.categoryId, // Set service category ID
        slug: service.slug, // Set service slug
        isPublished: service.isPublished, // Set service published status
      });
    } else {
      // If no service is provided, reset the form data
      setFormData({
        name: '', // Reset service name to empty
        image: null, // Reset service image to null 
        description: '', // Reset service description to empty
        price: '', // Reset service price to empty
        categoryId: '', // Reset service category ID to empty
        slug: '', // Reset service slug to empty
        isPublished: true, // Reset service published status to true
      });
    }
  }, [service]); // Run when service changes

  // Joi schema for form validation
  const schema = Joi.object({
    // Service name is required
    name: Joi.string().required().messages({
      'string.empty': 'Service name is required.',
    }),
    // Service description is required
    description: Joi.string().required().messages({
      'string.empty': 'Service description is required.',
    }),
    // Service price must be a positive number
    price: Joi.number().positive().messages({
      'number.base': 'Price must be a number.',
      'number.positive': 'Price must be a positive number.',
    }),
    // Service category ID is required
    categoryId: Joi.string().required().messages({
      'string.empty': 'Category is required.',
    }),
    // Service slug is optional and will be auto-generated
    slug: Joi.string().optional(),
    // Service published status is a boolean
    isPublished: Joi.boolean(),
  });

  // Function to validate the form data
  const validate = () => {
    // Extract data excluding image for validation
    const { name, description, price, categoryId, slug, isPublished } = formData;
    // Create an object with the data to validate
    const dataToValidate = { name, description, price, categoryId, slug, isPublished };
    // Validate the form data against the schema
    const { error } = schema.validate(dataToValidate, { abortEarly: false });
    // If no errors, return null
    if (!error) return null;

    // Create an errors object from Joi validation errors
    const errors = {};
    // Map Joi validation errors to the errors object
    for (let item of error.details) {
      // Set the error message for the field
      errors[item.path[0]] = item.message;
    }
    // Return the errors object
    return errors;
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    // Destructure the form input fields
    const { id, value, files, type, checked } = e.target;
    // Update the form data based on the input type
    setFormData({
      ...formData, // Spread the existing form data
      [id]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,  // Update the field value
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission
    e.preventDefault();

    // Validate the form data
    const errors = validate();
    // Set the validation errors
    setValidationErrors(errors || {});
    // If there are errors, return
    if (errors) return;

    // Create a FormData object to handle file uploads
    const formDataToSubmit = new FormData();
    // Append the form data to the FormData object
    formDataToSubmit.append('name', formData.name);
    // Append the image to the FormData object
    formDataToSubmit.append('description', formData.description);
    // Append the price to the FormData object
    formDataToSubmit.append('price', formData.price);
    // Append the category ID to the FormData object
    formDataToSubmit.append('categoryId', formData.categoryId);
    // Append the slug to the FormData object
    formDataToSubmit.append('slug', formData.slug);
    // Append the published status to the FormData object
    formDataToSubmit.append('isPublished', formData.isPublished);

    // Check if an image is present
    if (formData.image) {
      // Append the image to the FormData object
      formDataToSubmit.append('image', formData.image);
    }

    // Call the onSubmit function with the form data
    onSubmit(formDataToSubmit);
  };
  
  // Return the ServiceForm component
  return (
    <>
      {/* Service Form Popup */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
        {/* Service Form Container */}
        <div className="bg-white p-6 shadow-lg rounded w-full max-w-lg max-h-[90vh] overflow-y-auto">
          {/* Service Form Component */}
          <form onSubmit={handleSubmit}>
            {/* Service Form Title */}
            <h2 className="text-xl font-bold mb-4">{service ? 'Edit Service' : 'Create New Service'}</h2>

            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="name">Service Name</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              {validationErrors.name && <div className="text-red-500">{validationErrors.name}</div>}
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="description">Service Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              {validationErrors.description && <div className="text-red-500">{validationErrors.description}</div>}
            </div>

            {/* Price Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              {validationErrors.price && <div className="text-red-500">{validationErrors.price}</div>}
            </div>

            {/* Category Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="categoryId">Category</label>
              <select
                id="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              {validationErrors.categoryId && <div className="text-red-500">{validationErrors.categoryId}</div>}
            </div>

            {/* Slug Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="slug">Slug</label>
              <input
                id="slug"
                type="text"
                value={formData.slug}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            {/* Published Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="isPublished">Published</label>
              <input
                id="isPublished"
                type="checkbox"
                checked={formData.isPublished}
                onChange={handleChange}
                className="mr-2"
              />
              <span>{formData.isPublished ? 'Yes' : 'No'}</span>
            </div>

            {/* Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="image">Service Image</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-between">
              {/* Cancel Button */}
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onCancel}>
                Cancel
              </button>
              {/* Submit Button */}
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                {service ? 'Update Service' : 'Create Service'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

// Define the prop types for the ServiceForm component
ServiceForm.propTypes = {
  service: PropTypes.object, // Service object
  onSubmit: PropTypes.func.isRequired, // Function to handle form submission
  onCancel: PropTypes.func.isRequired, // Function to handle form cancellation
  categories: PropTypes.arrayOf( // Array of categories
    PropTypes.shape({ // Shape of each category
      id: PropTypes.string.isRequired, // Category ID
      name: PropTypes.string.isRequired, // Category name
    })
  ).isRequired, // Required
};

// Export the ServiceForm component
export default ServiceForm;
