/*
Version: 1.0
ServiceList component for the display of all services in the admin panel.
Last Edited by: Natalia Pakhomova
Last Edit Date: 17/10/2024
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
  return (
    <div className="shadow-lg rounded-lg p-4">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border-b-2 p-2 text-left">Name</th>
            <th className="border-b-2 p-2 text-left">Category</th>
            <th className="border-b-2 p-2 text-left">Image</th>
            <th className="border-b-2 p-2 text-left">Slug</th>
            <th className="border-b-2 p-2 text-left">Price</th>
            <th className="border-b-2 p-2 text-left">Published</th>
            <th className="border-b-2 p-2">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td className="p-2">{service.name}</td>
              <td className="p-2">{service.categoryName}</td>
              <td className="p-2">
                <img src={service.imageUrl} alt={service.name} className="h-16 w-16 object-cover rounded" />
              </td>
              <td className="p-2">{service.slug}</td>
              <td className="p-2">${service.price?service.price.toFixed(2):0.00}</td>
              <td className="p-2">{service.isPublished ? 'Yes' : 'No'}</td>
              <td className="p-2 text-right">
                <button
                  className={`mr-2 bg-primary text-white px-4 py-1 rounded`}
                  onClick={() => onEditService(service)}
                >
                  Edit
                </button>
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
  );
};

ServiceList.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      categoryName: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      isPublished: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onEditService: PropTypes.func.isRequired,
  onDeleteService: PropTypes.func.isRequired,
};

export default ServiceList;
