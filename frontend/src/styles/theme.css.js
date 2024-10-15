/*
Version: 1.0
Global theme styles
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

// Import the createGlobalTheme function from vanilla-extract
import { createGlobalTheme } from '@vanilla-extract/css';
// Import brand colors from the abstracts folder
import { brandColors } from './abstracts/brandColors';

// Define the global theme variables
export const themeVars = createGlobalTheme(':root', {
  color: {
    primary: brandColors.primary,
    secondary: brandColors.secondary,
    accent1: brandColors.accent1,
    accent2: brandColors.accent2,
    accent3: brandColors.accent3,
    accent4: brandColors.accent4,
    text: brandColors.text,
    white: brandColors.white,
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
});
