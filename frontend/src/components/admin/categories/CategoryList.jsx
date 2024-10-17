/*
Version: 1.1
CategoryList component for the display of all categories in the admin panel.
Last Edited by: Natalia Pakhomova
Last Edit Date: 17/10/2024
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
  return (
    <div className="shadow-lg rounded-lg p-4">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border-b-2 p-2 text-left">Name</th>
            <th className="border-b-2 p-2 text-left">Image</th>
            <th className="border-b-2 p-2 text-left">Sort Order</th>
            <th className="border-b-2 p-2 text-left">Published</th>
            <th className="border-b-2 p-2">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="p-2">{category.name}</td>
              <td className="p-2">
                <img src={category.imageUrl} alt={category.name} className="h-16 w-16 object-cover rounded" />
              </td>
              <td className="p-2">{category.sortOrder}</td>
              <td className="p-2">{category.isPublished ? 'Yes' : 'No'}</td>
              <td className="p-2 text-right">
                <button
                  className={`mr-2 bg-primary text-white px-4 py-1 rounded`}
                  onClick={() => onEditCategory(category)}
                >
                  Edit
                </button>
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
  );
};

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  onEditCategory: PropTypes.func.isRequired,
  onDeleteCategory: PropTypes.func.isRequired,
};

export default CategoryList;
