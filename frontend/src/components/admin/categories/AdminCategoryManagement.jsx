/*
Version: 1.1
Admin category management component.
Last Edited by: Natalia Pakhomova
Last Edit Date: 31/10/2024
*/

import { useState, useEffect } from 'react'; // Import useState and useEffect from React
import CategoryList from './CategoryList'; // Import CategoryList component
import CategoryForm from './CategoryForm'; // Import CategoryForm component
import { apiSecureRequest } from '../../../utils/auth'; // Import the apiSecureRequest function
import useToast from '../../../hooks/useToast'; // Import the useToast hook

/**
 * Admin category management component to manage categories.
 * @returns {JSX.Element} - The AdminCategoryManagement component
 */
const AdminCategoryManagement = () => {
  const [categories, setCategories] = useState([]); // List of categories
  const [selectedCategory, setSelectedCategory] = useState(null); // Category selected for editing
  const [isCreating, setIsCreating] = useState(false); // Flag for toggling create form
  const { showToast } = useToast();

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
        showToast('Category Updated', 'Category details have been updated', 'confirm');
      } else {
        await apiSecureRequest('admin/categories', 'POST', formData, true);
        showToast('Category Created', 'A new category has been created', 'confirm');
      }
      fetchCategories();
      setSelectedCategory(null);
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to submit form:', error);
      showToast('Error', `Failed to submit form: ${error.message?error.message:'An unknown error has occured'}`, 'error');
    }
  };

  // Function to handle category deletion
  const handleDeleteCategory = async (id) => {
    try {
      await apiSecureRequest(`admin/categories/${id}`, 'DELETE');
      fetchCategories();
      showToast('Category Deleted', 'The category has been successfully deleted', 'confirm');
    } catch (error) {
      console.error('Failed to delete category:', error);
      showToast('Error', `Failed to delete category: ${error.message?error.message:'An unknown error has occured'}`, 'error');
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
