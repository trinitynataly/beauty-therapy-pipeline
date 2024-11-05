/*
Version: 1.1
ServiceList component for the display of all services in the admin panel.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

import PropTypes from 'prop-types'; // Import the PropTypes library from the prop-types package

/**
 * ServiceList component to display a list of services.
 * @param {Array} services - The list of services to display
 * @param {Function} onEditService - The function to handle service editing
 * @param {Function} onDeleteService - The function to handle service deletion
 * @returns {JSX.Element} - The ServiceList component
 */
const ServiceList = ({ services, onEditService, onDeleteService }) => {
  // Return the JSX for the ServiceList component
  return (
    <>

      <div className="shadow-lg rounded-lg p-4">
        {/* Table */}
        <table className="w-full table-auto">
          {/* Table header */}
          <thead>
            <tr>
              <th className="border-b-2 p-2 text-left">Name</th> {/* Name header */}
              <th className="border-b-2 p-2 text-left">Category</th> {/* Category header */}
              <th className="border-b-2 p-2 text-left">Image</th> {/* Image header */}
              <th className="border-b-2 p-2 text-left">Slug</th> {/* Slug header */}
              <th className="border-b-2 p-2 text-left">Price</th> {/* Price header */}
              <th className="border-b-2 p-2 text-left">Published</th> {/* Published header */}
              <th className="border-b-2 p-2">&nbsp;</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {/* Map through each service */}
            {services.map((service) => (
              <tr key={service.id}>
                <td className="p-2">{service.name}</td> {/* Name cell */}
                <td className="p-2">{service.categoryName}</td> {/* Category cell */}
                <td className="p-2"> {/* Image cell */}
                  <img src={service.imageUrl} alt={service.name} className="h-16 w-16 object-cover rounded" />
                </td>
                <td className="p-2">{service.slug}</td> {/* Slug cell */}
                <td className="p-2">${service.price?service.price.toFixed(2):0.00}</td> {/* Price cell */}
                <td className="p-2">{service.isPublished ? 'Yes' : 'No'}</td> {/* Published cell */}
                <td className="p-2 text-right"> {/* Actions cell */}
                  {/* Edit button */}
                  <button
                    className={`mr-2 bg-primary text-white px-4 py-1 rounded`}
                    onClick={() => onEditService(service)}
                  >
                    Edit
                  </button>
                  {/* Delete button */}
                  <button
                    className={`bg-secondary text-white px-4 py-1 rounded`}
                    onClick={() => onDeleteService(service.id)}
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

// Define the prop types for the ServiceList component
ServiceList.propTypes = {
  services: PropTypes.arrayOf( // Array of services
    PropTypes.shape({ // Shape of each service
      id: PropTypes.string.isRequired, // Service ID
      name: PropTypes.string.isRequired, // Service name
      categoryName: PropTypes.string.isRequired, // Service category name
      imageUrl: PropTypes.string.isRequired, // Service image URL
      slug: PropTypes.string.isRequired, // Service slug
      price: PropTypes.number.isRequired, // Service price
      isPublished: PropTypes.bool.isRequired, // Service published status
    })
  ).isRequired, // Array of services is required
  onEditService: PropTypes.func.isRequired, // Function to handle service editing
  onDeleteService: PropTypes.func.isRequired, // Function to handle service deletion
};

// Export the ServiceList component
export default ServiceList;
