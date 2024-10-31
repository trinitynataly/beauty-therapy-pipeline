/*
Version: 1.2
App component for the frontend codebase.
Last Edited by: Natalia Pakhomova
Last Edit Date: 31/10/2024
*/

import { BrowserRouter } from 'react-router-dom'; // Import the BrowserRouter component from React Router
import { ToastProvider } from './contexts/ToastContext'; // Import the ToastProvider component from the ToastContext
import { AuthProvider } from './contexts/AuthContext';  // Import the AuthProvider component from the AuthContext
import { CartProvider } from './contexts/CartContext'; // Import the CartProvider component from the CartContext
import Routes from './Routes'; // Import the Routes component

function App() { // Define the App component
  // Return the JSX for the App component with the BrowserRouter and AuthProvider components
  return ( 
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <Routes />
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

// Export the App component
export default App;
