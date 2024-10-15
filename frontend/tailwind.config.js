/*
Version: 1.1
Tailwind CSS configuration for the frontend.
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

/** @type {import('tailwindcss').Config} */

// Import the brand colors from the abstracts folder
import { brandColors } from './src/styles/abstracts/brandColors';

export default { // Export the Tailwind CSS configuration for the frontend codebase 
  content: [ // Set the content for the frontend codebase
    './index.html', // Include your root HTML file
    './src/**/*.{js,jsx,ts,tsx}', // Include all JS/TS/JSX/TSX files in the src directory
  ],
  theme: { // Set the theme for the frontend codebase
    fontFamily: {
      sans: ['"Open Sans"', 'Times New Roman', 'sans-serif'],
    },
    extend: { // Extend the theme for the frontend codebase
      colors: { // Set the colors for the frontend codebase
        primary: brandColors.primary, // Set the primary color to the brand primary color
        secondary: brandColors.secondary, // Set the secondary color to the brand secondary color
        accent1: brandColors.accent1, // Set the accent1 color to the brand accent1 color
        accent2: brandColors.accent2, // Set the accent2 color to the brand accent2 color
        accent3: brandColors.accent3, // Set the accent3 color to the brand accent3 color
        accent4: brandColors.accent4, // Set the accent4 color to the brand accent4 color
        text: brandColors.text, // Set the text color to the brand text color
        white: brandColors.white, // Set the white color to the brand white color
        link: brandColors.secondary, // Set the link color to the brand secondary color
      },
      container: {
        center: true, // Center the container by default
        padding: '1rem', // Set default padding for the container
        screens: {
          sm: '600px', // Custom width for small screens
          md: '728px', // Custom width for medium screens
          lg: '984px', // Custom width for large screens
          xl: '1100px', // Custom width for extra large screens
        },
      },
      fontFamily: {
        // Override default sans font family to use Open Sans
        sans: ['"Open Sans"', 'Times New Roman', 'sans-serif'],
      },
      fontSize: {
        base: '14px', // Set default base font size to 14px
      },
      lineHeight: {
        normal: '1.5', // Set default line height to 1.5
      },
    },
  },
  plugins: [], // Set the plugins for the frontend codebase
}

