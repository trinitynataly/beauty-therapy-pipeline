/*
Version: 1.0
Header styles
Last Edited by: Natalia Pakhomova
Last Edit Date: 03/09/2024
*/

// Import the style function from vanilla-extract
import { style } from '@vanilla-extract/css';

// Define styles for the header container
export const headerContainer = style({
  backgroundColor: 'white',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: '1rem 0',
});

// Define styles for the header logo
export const menuItem = style({
  padding: '0.5rem 1rem',
  fontWeight: 600,
  textDecoration: 'none',
  color: '#333',
  ':hover': {
    color: '#0070f3',
  },
});

// Define styles for the header menu
export const specialButton = style({
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  border: '1px solid #0070f3',
  backgroundColor: '#0070f3',
  color: 'white',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'white',
    color: '#0070f3',
  },
});
