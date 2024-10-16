/*
Version: 1.0
Admin category management component.
Last Edited by: Natalia Pakhomova
Last Edit Date: 16/10/2024
*/

import { useState, useEffect } from 'react'; // Import useState and useEffect from React
import CategoryList from './CategoryList'; // Import CategoryList component
import CategoryForm from './CategoryForm'; // Import CategoryForm component
import { apiSecureRequest } from '../../../utils/auth'; // Import the apiSecureRequest function

/**
 * Admin category management component to manage categories.
 * @returns {JSX.Element} - The AdminCategoryManagement component
 */
const AdminCategoryManagement = () => {
  const [categories, setCategories] = useState([]); // List of categories
  const [selectedCategory, setSelectedCategory] = useState(null); // Category selected for editing
  const [isCreating, setIsCreating] = useState(false); // Flag for toggling create form

  // Function to fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await apiSecureRequest('admin/categories', 'GET');
      setCategories(response);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to handle form submission (create or update)
  const handleFormSubmit = async (formData) => {
    try {
      if (selectedCategory) {
        await apiSecureRequest(`admin/categories/${selectedCategory.id}`, 'PUT', formData, true);
      } else {
        await apiSecureRequest('admin/categories', 'POST', formData, true);
      }
      fetchCategories();
      setSelectedCategory(null);
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  // Function to handle category deletion
  const handleDeleteCategory = async (id) => {
    try {
      await apiSecureRequest(`admin/categories/${id}`, 'DELETE');
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <>
      {/* Category List */}
      <CategoryList categories={categories} onEditCategory={setSelectedCategory} onDeleteCategory={handleDeleteCategory} />

      {/* Create/Edit Category Form */}
      {selectedCategory || isCreating ? (
        <CategoryForm
          category={selectedCategory}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setSelectedCategory(null);
            setIsCreating(false);
          }}
        />
      ) : (
        <button
          className="mt-4 bg-primary text-white px-4 py-2 rounded"
          onClick={() => setIsCreating(true)}
        >
          Create New Category
        </button>
      )}
    </>
  );
};

export default AdminCategoryManagement;
