/*
Version: 1.2
Admin category management component.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
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
  const { showToast } = useToast(); // Get the showToast function from the useToast hook

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

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to handle form submission (create or update)
  const handleFormSubmit = async (formData) => {
    try {
      // Check if a category is selected
      if (selectedCategory) {
        // Update the category in the API
        await apiSecureRequest(`admin/categories/${selectedCategory.id}`, 'PUT', formData, true);
        // Show a success message
        showToast('Category Updated', 'Category details have been updated', 'confirm');
      } else {
        // Create a new category in the API
        await apiSecureRequest('admin/categories', 'POST', formData, true);
        // Show a success message
        showToast('Category Created', 'A new category has been created', 'confirm');
      }
      // Fetch categories again
      fetchCategories();
      // Reset the form state
      setSelectedCategory(null);
      // Reset the create flag
      setIsCreating(false);
    } catch (error) { // Catch any errors
      // Log the error in the console
      console.error('Failed to submit form:', error);
      // Show an error message
      showToast('Error', `Failed to submit form: ${error?.message || 'An unknown error has occured'}`, 'error');
    }
  };

  // Function to handle category deletion
  const handleDeleteCategory = async (id) => {
    try {
      // Delete the category from the API
      await apiSecureRequest(`admin/categories/${id}`, 'DELETE');
      // Fetch categories again
      fetchCategories();
      // Show a success message
      showToast('Category Deleted', 'The category has been successfully deleted', 'confirm');
    } catch (error) { // Catch any errors
      // Log the error in the console
      console.error('Failed to delete category:', error);
      // Show an error message
      showToast('Error', `Failed to delete category: ${error?.message || 'An unknown error has occured'}`, 'error');
    }
  };

  return (
    <>
      {/* Category List */}
      <CategoryList categories={categories} onEditCategory={setSelectedCategory} onDeleteCategory={handleDeleteCategory} />

      {/* Conditionally show Create/Edit Category Form */}
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
        // Otherwise show create New Category Button
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

// Export the AdminCategoryManagement component
export default AdminCategoryManagement;
