/** @type {import('tailwindcss').Config} */
export default { // Export the Tailwind CSS configuration for the frontend codebase 
  content: [ // Set the content for the frontend codebase
    './index.html', // Include your root HTML file
    './src/**/*.{js,jsx,ts,tsx}', // Include all JS/TS/JSX/TSX files in the src directory
  ],
  theme: { // Set the theme for the frontend codebase
    extend: {}, // Extend the default theme
  },
  plugins: [], // Set the plugins for the frontend codebase
}

