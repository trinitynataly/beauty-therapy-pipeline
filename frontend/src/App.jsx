/*
Version: 1.1
App component for the frontend codebase.
Last Edited by: Natalia Pakhomova
Last Edit Date: 03/09/2024
*/

import { BrowserRouter } from 'react-router-dom'; // Import the BrowserRouter component from React Router
import { AuthProvider } from './contexts/AuthContext';  // Import the AuthProvider component from the AuthContext
import Routes from './Routes'; // Import the Routes component

function App() { // Define the App component
  // Return the JSX for the App component with the BrowserRouter and AuthProvider components
  return ( 
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

// Export the App component
export default App;
