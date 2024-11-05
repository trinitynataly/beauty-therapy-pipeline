/*
Version: 1.3
App component for the frontend codebase.
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
*/

import { BrowserRouter } from 'react-router-dom'; // Import the BrowserRouter component from React Router
import { ToastProvider } from './contexts/ToastContext'; // Import the ToastProvider component from the ToastContext
import { AuthProvider } from './contexts/AuthContext';  // Import the AuthProvider component from the AuthContext
import { CartProvider } from './contexts/CartContext'; // Import the CartProvider component from the CartContext
import Routes from './Routes'; // Import the Routes component

function App() { // Define the App component
  // Return the JSX for the App component with the BrowserRouter and AuthProvider components
  return ( 
    // Wrap the application with the BrowserRouter component for routing functionality
    <BrowserRouter>
      {/* Wrap the application with the ToastProvider component for toast notifications */}
      <ToastProvider>
        {/* Wrap the application with the AuthProvider component for authentication */}
        <AuthProvider>
          {/* Wrap the application with the CartProvider component for cart functionality */}
          <CartProvider>
            {/* Render the Routes component */}
            <Routes />
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

// Export the App component
export default App;
