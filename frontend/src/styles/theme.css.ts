/*
Version: 1.0
Global theme styles
Last Edited by: Natalia Pakhomova
Last Edit Date: 03/09/2024
*/

// Import the createTheme function from vanilla-extract
import { createTheme } from '@vanilla-extract/css';

// Define the theme variables
export const [themeClass, themeVars] = createTheme({
  color: {
    primary: 'blue',
    secondary: 'green',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
});