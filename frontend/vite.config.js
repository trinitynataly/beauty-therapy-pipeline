/*
Version: 1.0
Vite configuration file for the frontend codebase.
Last Edited by: Natalia Pakhomova
Last Edit Date: 10/09/2024
*/

import { defineConfig } from 'vite'; // Import the defineConfig function from Vite
import react from '@vitejs/plugin-react'; // Import the Vite plugin for React
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'; // Import the Vite plugin for Vanilla Extract

export default defineConfig({ // Export the Vite configuration for the frontend codebase
  plugins: [react(), vanillaExtractPlugin()], // Use the Vite plugins for React and Vanilla Extract
});
