/*
Version: 1.0
Main entry point for the frontend codebase.
Last Edited by: Natalia Pakhomova
Last Edit Date: 03/09/2024
*/

import React from 'react'; // Import React
import ReactDOM from 'react-dom/client'; // Import ReactDOM
import App from './App'; // Import the App component
import './styles/tailwind.css';  // Import the Tailwind CSS
import './styles/global.css.ts'; // Import the global CSS

// Render the App component to the root element
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
