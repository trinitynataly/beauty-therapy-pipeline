/*
Version: 1.1
Template styles for the footer
Last Edited by: Natalia Pakhomova
Last Edit Date: 11/10/2024
*/

// Import the style function from vanilla-extract
import { style } from '@vanilla-extract/css';

// Define styles for the footer container
export const footerContainer = style({
  marginTop: '2rem',
  backgroundColor: '#C7495C'
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
  color: 'white',
  ':hover': {
    textDecoration: 'underline',
  },
});
