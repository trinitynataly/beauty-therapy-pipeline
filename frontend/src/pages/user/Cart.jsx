/*
Version: 1.0
Cart Page component for the frontend layout.
Displays the user's cart with the ability to update quantities or remove items.
Last Edited by: Natalia Pakhomova
Last Edit Date: 03/11/2024
*/

// Import necessary libraries
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import useCart from '../../hooks/useCart'; // Import the custom useCart hook
import { primaryButton } from '../../styles/common/buttons.css';
import { apiSecureRequest } from '../../utils/auth'; // Import the secured API request utility function

/**
 * Cart Page component
 * @returns {JSX.Element} Cart Page content
 */
const CartPage = () => {
  const { cart, reloadCart } = useCart(); // Destructure cart and reloadCart function from context
  const [cartItems, setCartItems] = useState([]);
  console.log(cart);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  // Handle quantity change
  const handleQuantityChange = async (serviceId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await apiSecureRequest(`cart/${serviceId}`, 'PUT', { quantity: newQuantity }); // Update the quantity in the backend
      reloadCart(); // Reload the cart from the backend
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  // Handle delete item
  const handleDeleteItem = async (serviceId) => {
    try {
      await apiSecureRequest(`cart/${serviceId}`, 'DELETE'); // Delete the item from the backend
      reloadCart(); // Reload the cart from the backend
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <div className="text-center py-16">Your cart is currently empty.</div>;
  }

  return (
    <>
      {/* Helmet component */}
      <Helmet>
        {/* Page title */}
        <title>Cart | Beauty by Gulia</title>
        {/* Meta description */}
        <meta name="description" content="View and manage the items in your cart before checking out." />
      </Helmet>

      {/* Cart Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Your Cart</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-start pl-0">Product</th>
                  <th className="py-2 px-4 border-b text-center">Image</th>
                  <th className="py-2 px-4 border-b text-center">Price</th>
                  <th className="py-2 px-4 border-b text-center">Quantity</th>
                  <th className="py-2 px-4 border-b text-end">Total</th>
                  <th className="py-2 px-4 border-b px-0">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.serviceId}>
                    <td className="py-4 px-4 border-b text-start pl-0">{item.name}</td>
                    <td className="py-4 px-4 border-b text-center">
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg m-auto" />
                    </td>
                    <td className="py-4 px-4 border-b text-center">${item.price.toFixed(2)}</td>
                    <td className="py-4 px-4 border-b text-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.serviceId, parseInt(e.target.value))}
                        className="w-16 p-2 border rounded"
                      />
                    </td>
                    <td className="py-4 px-4 border-b text-end">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="py-4 px-4 border-b text-end px-0">
                      <button onClick={() => handleDeleteItem(item.serviceId)} className="text-red-600 hover:text-red-800">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-right mt-8">
            <h3 className="text-2xl font-bold">Cart Total: ${cartTotal.toFixed(2)}</h3>
            <button className={`${primaryButton} mt-4 text-lg font-bold h-12 px-20 py-2 rounded-full`}>Proceed to Checkout</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
