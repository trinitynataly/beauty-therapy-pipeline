/*
Version: 1.2
Template styles for the footer
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

// Import the style function from vanilla-extract
import { style } from '@vanilla-extract/css';
// Import the theme variables from the theme.css file
import { themeVars } from '../theme.css';

// Define styles for the footer container
export const footerContainer = style({
  marginTop: '2rem',
  backgroundColor: themeVars.color.secondary,
});

// Define styles for the footer menu
export const footerMenu = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

// Define styles for the footer menu items
export const footerMenuItem = style({
  marginBottom: '0.25rem',
  textDecoration: 'none',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: themeVars.color.white,
  ':hover': {
    textDecoration: 'underline',
  },
});
