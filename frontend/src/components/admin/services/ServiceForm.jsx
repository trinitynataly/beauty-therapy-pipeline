/*
Version: 1.0
ServiceForm component for editing and creating services in the admin panel.
Last Edited by: Natalia Pakhomova
Last Edit Date: 17/10/2024
*/

import { useState, useEffect } from 'react'; // Import useState and useEffect from React
import PropTypes from 'prop-types'; // Import PropTypes for defining component prop types

/**
 * ServiceForm component to create and edit services.
 * @param {Object} service - The service object to edit
 * @param {Function} onSubmit - The function to handle form submission
 * @param {Function} onCancel - The function to handle form cancellation
 * @param {Array} categories - The list of categories to choose from
 * @returns {JSX.Element} - The ServiceForm component
 */
const ServiceForm = ({ service, onSubmit, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    description: '',
    price: '',
    categoryId: '',
    slug: '',
    isPublished: true,
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        image: null,
        description: service.description,
        price: service.price,
        categoryId: service.categoryId,
        slug: service.slug,
        isPublished: service.isPublished,
      });
    } else {
      setFormData({
        name: '',
        image: null,
        description: '',
        price: '',
        categoryId: '',
        slug: '',
        isPublished: true,
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { id, value, files, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create a FormData object
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('price', formData.price);
    formDataToSubmit.append('categoryId', formData.categoryId);
    formDataToSubmit.append('slug', formData.slug);
    formDataToSubmit.append('isPublished', formData.isPublished);
    
    if (formData.image) {
      formDataToSubmit.append('image', formData.image);
    }
  
    onSubmit(formDataToSubmit);
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
      <div className="bg-white p-6 shadow-lg rounded w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">{service ? 'Edit Service' : 'Create New Service'}</h2>

          {/* Name */}
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

          {/* Description */}
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

          {/* Price */}
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

          {/* Category */}
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

          {/* Slug */}
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

          {/* Published */}
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
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
              {service ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ServiceForm.propTypes = {
  service: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ServiceForm;
