/*
Version: 1.2
CategoryList component for the display of all categories in the admin panel.
Last Edited by: Natalia Pakhomova
Last Edit Date: 25/10/2024
*/

import PropTypes from 'prop-types'; // Import the PropTypes library from the prop-types package

/**
 * CategoryList component to display a list of categories.
 * @param {Array} categories - The list of categories to display
 * @param {Function} onEditCategory - The function to handle category editing
 * @param {Function} onDeleteCategory - The function to handle category deletion
 * @returns {JSX.Element} - The CategoryList component
 */
const CategoryList = ({ categories, onEditCategory, onDeleteCategory }) => {
  // Return the JSX for the CategoryList component
  return (
    <>
      {/* Table container */}
      <div className="shadow-lg rounded-lg p-4">
        {/* Table */}
        <table className="w-full table-auto">
          {/* Table header */}
          <thead>
            <tr>
              {/* Name header */}
              <th className="border-b-2 p-2 text-left">Name</th>
              {/* Image header */}
              <th className="border-b-2 p-2 text-left">Image</th>
              {/* Sort order header */}
              <th className="border-b-2 p-2 text-left">Sort Order</th>
              {/* Published header */}
              <th className="border-b-2 p-2 text-left">Published</th>
              {/* Actions header */}
              <th className="border-b-2 p-2">&nbsp;</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {/* Map through each category */}
            {categories.map((category) => (
              <tr key={category.id}>
                {/* Name cell */}
                <td className="p-2">{category.name}</td>
                {/* Image cell */}
                <td className="p-2">
                  <img src={category.imageUrl} alt={category.name} className="h-16 w-16 object-cover rounded" />
                </td>
                {/* Sort order cell */}
                <td className="p-2">{category.sortOrder}</td>
                {/* Published cell */}
                <td className="p-2">{category.isPublished ? 'Yes' : 'No'}</td>
                {/* Actions cell */}
                <td className="p-2 text-right">
                  {/* Edit button */}
                  <button
                    className={`mr-2 bg-primary text-white px-4 py-1 rounded`}
                    onClick={() => onEditCategory(category)}
                  >
                    Edit
                  </button>
                  {/* Delete button */}
                  <button
                    className={`bg-secondary text-white px-4 py-1 rounded`}
                    onClick={() => onDeleteCategory(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Define the prop types for the CategoryList component
CategoryList.propTypes = {
  categories: PropTypes.array.isRequired, // Array of categories
  onEditCategory: PropTypes.func.isRequired, // Function to handle category editing
  onDeleteCategory: PropTypes.func.isRequired, // Function to handle category deletion
};

// Export the CategoryList component
export default CategoryList;
