/*
Version: 1.1
Cart Page component for the frontend layout.
Displays the user's cart with the ability to update quantities or remove items.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

// Import necessary libraries
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import useCart from '../../hooks/useCart'; // Import the custom useCart hook
import useToast from '../../hooks/useToast'; // Import the custom useToast hook
import { primaryButton } from '../../styles/common/buttons.css';
import { apiSecureRequest } from '../../utils/auth'; // Import the secured API request utility function

/**
 * Cart Page component
 * @returns {JSX.Element} Cart Page content
 */
const CartPage = () => {
  const { cart, reloadCart } = useCart(); // Destructure cart and reloadCart function from context
  const [cartItems, setCartItems] = useState([]); // State to store the cart items
  const { showToast } = useToast(); // Destructure the showToast function from the useToast hook

  // Load the cart items into the state
  useEffect(() => {
    // Set the cart items in the state
    setCartItems(cart);
  }, [cart]); // Reload the cart items when the cart changes

  /**
   * Function to handle the quantity change for a cart item
   * @param {string} serviceId - The ID of the service
   * @param {number} newQuantity - The new quantity for the service
   * @returns {Promise<void>} - A promise that resolves when the quantity is updated
   */
  const handleQuantityChange = async (serviceId, newQuantity) => {
    // If the new quantity is less than 1, return
    if (newQuantity < 1) return;
    try {
      // Update the quantity in the backend
      await apiSecureRequest(`cart/${serviceId}`, 'PUT', { quantity: newQuantity });
      // Reload the cart from the backend
      reloadCart();
    } catch (error) { // Catch any errors
      // Show a toast with the error message
      showToast('Cart Error', `Error updating cart item: ${error?.message || 'An unknow error has occurred'}`, 'error');
    }
  };

  /**
   * Function to handle the deletion of a cart item
   * @param {string} serviceId - The ID of the service to delete
   * @returns {Promise<void>} - A promise that resolves when the item is deleted
   */
  const handleDeleteItem = async (serviceId) => {
    try {
      // Delete the item from the backend
      await apiSecureRequest(`cart/${serviceId}`, 'DELETE');
      // Reload the cart from the backend
      reloadCart();
    } catch (error) { // Catch any errors
      // Show a toast with the error message
      showToast('Cart Error', `Error deleting cart item: ${error?.message || 'An unknow error has occurred'}`, 'error');
    }
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Check if the cart is empty
  if (cartItems.length === 0) {
    // Return a page the empty cart message
    return (
      <>
        {/* Helmet component */}
        <Helmet>
          {/* Page title */}
          <title>Your Cart is empty | Beauty by Gulia</title>
          {/* Meta description */}
          <meta name="description" content="View and manage the items in your cart before checking out." />
        </Helmet>
        {/* Empty cart message */}
        <div className="text-center py-16">Your cart is currently empty.</div>
      </>
    );
  }

  // Return the Cart Page content
  return (
    <>
      {/* Helmet component */}
      <Helmet>
        {/* Page title */}
        <title>Your Cart | Beauty by Gulia</title>
        {/* Meta description */}
        <meta name="description" content="View and manage the items in your cart before checking out." />
      </Helmet>

      {/* Cart section */}
      <section className="py-16">
        {/* Cart container */}
        <div className="container mx-auto px-4">
          {/* Cart title */}
          <h2 className="text-3xl font-bold mb-8">Your Cart</h2>
          {/* Cart items table container */}
          <div className="overflow-x-auto">
            {/* Cart items table */}
            <table className="min-w-full bg-white">
              {/* Table header */}
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-start pl-0">Product</th> {/* Product name column */}
                  <th className="py-2 px-4 border-b text-center">Price</th> {/* Price column */}
                  <th className="py-2 px-4 border-b text-center">Quantity</th> {/* Quantity column */}
                  <th className="py-2 px-4 border-b text-end">Total</th> {/* Total column */}
                  <th className="py-2 px-0 border-b">&nbsp;</th> {/* Actions column */}
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {/* Map the cart items to table rows */}
                {cartItems.map((item) => (
                  // Create a table row for each item
                  <tr key={item.serviceId}>
                    {/* Product nanme and image */}
                    <td className="py-4 px-4 border-b text-start pl-0 flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4 justify-start">
                      {/* Product image */}
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                      {/* Product name */}
                      <div>{item.name}</div>
                    </td>
                    {/* Product price formatted to two decimal places */}
                    <td className="py-4 px-4 border-b text-center">${item.price.toFixed(2)}</td>
                    {/* Product quantity input allowing to change the quantity */}
                    <td className="py-4 px-4 border-b text-center">
                      {/* Quantity input */}
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.serviceId, parseInt(e.target.value))} // Handle quantity change
                        className="w-16 p-2 border rounded"
                      />
                    </td>
                    {/* Total price for the product formatted */}
                    <td className="py-4 px-4 border-b text-end">${(item.price * item.quantity).toFixed(2)}</td>
                    {/* Delete button to remove the item from the cart */}
                    <td className="py-4 px-0 border-b text-end">
                      {/* Delete button */}
                      <button 
                        onClick={() => handleDeleteItem(item.serviceId)} // Handle item deletion
                        className="text-red-600 hover:text-red-800"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Cart total and checkout button */}
          <div className="text-right mt-8">
            {/* Cart total */}
            <h3 className="text-2xl font-bold">Cart Total: ${cartTotal.toFixed(2)}</h3>
            {/* Proceed to checkout button */}
            <button className={`${primaryButton} mt-4 text-lg font-bold h-12 px-20 py-2 rounded-full`}>Proceed to Checkout</button>
          </div>
        </div>
      </section>
    </>
  );
};

// Export the Cart Page component
export default CartPage;
