/*
Version: 1.0
Template styles for the footer
Last Edited by: Natalia Pakhomova
Last Edit Date: 03/09/2024
*/

// Import the style function from vanilla-extract
import { style } from '@vanilla-extract/css';

// Define styles for the footer container
export const footerContainer = style({
  marginTop: '2rem',
});

// Define styles for the footer logo
export const footerLogo = style({
  fontSize: '1.5rem',
  fontWeight: 'bold',
});

// Define styles for the footer menu
export const footerMenu = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

// Define styles for the footer menu items
export const footerMenuItem = style({
  padding: '0.25rem 0',
  textDecoration: 'none',
  color: 'white',
  ':hover': {
    textDecoration: 'underline',
  },
});
