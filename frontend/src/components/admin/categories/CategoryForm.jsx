/*
Version: 1.1
CategoryForm component for editing and creating categories in the admin panel.
Last Edited by: Natalia Pakhomova
Last Edit Date: 17/10/2024
*/

import { useState, useEffect } from 'react'; // Import useState and useEffect from React
import PropTypes from 'prop-types'; // Import PropTypes for defining component prop types

/**
 * CategoryForm component to create and edit categories.
 * @param {Object} category - The category object to edit
 * @param {Function} onSubmit - The function to handle form submission
 * @param {Function} onCancel - The function to handle form cancellation
 * @returns {JSX.Element} - The CategoryForm component
 */
const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    sortOrder: 0,
    isPublished: true,
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        image: null,
        sortOrder: category.sortOrder || 0,
        isPublished: category.isPublished ? category.isPublished : false,
      });
    } else {
      setFormData({
        name: '',
        image: null,
        sortOrder: 0,
        isPublished: true,
      });
    }
  }, [category]);

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
    formDataToSubmit.append('sortOrder', formData.sortOrder);
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
          <h2 className="text-xl font-bold mb-4">{category ? 'Edit Category' : 'Create New Category'}</h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">Category Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {validationErrors.name && <div className="text-red-500">{validationErrors.name}</div>}
          </div>

          {/* Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="image">Category Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Sort Order */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="sortOrder">Sort Order</label>
            <input
              id="sortOrder"
              type="number"
              value={formData.sortOrder}
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

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-between">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
              {category ? 'Update Category' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CategoryForm.propTypes = {
  category: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CategoryForm;
