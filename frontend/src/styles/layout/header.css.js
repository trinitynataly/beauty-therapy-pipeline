/*
Version: 1.1
Header styles
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

// Import the style function from vanilla-extract
import { style } from '@vanilla-extract/css';
import { themeVars } from '../theme.css';

// Define styles for the header container
export const headerContainer = style({
  backgroundColor: themeVars.color.white,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: '1rem 0',
});

// Define styles for the header logo
export const menuItem = style({
  padding: '0.5rem 1rem',
  fontWeight: 600,
  textDecoration: 'none',
  color: themeVars.color.text,
  ':hover': {
    color: themeVars.color.accent1,
  },
});
