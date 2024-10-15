/*
Version: 1.0
Global form styles
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

// import the style function from vanilla-extract
import { style } from '@vanilla-extract/css';

// Define styles for the login form container
export const formContainer = style({
  backgroundColor: '#f7f7f7',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

// Define styles for the login form title
export const inputField = style({
  fontSize: '14px',
  borderColor: '#ccc',
  borderRadius: '20px',
  border: '1px solid #ccc',
  padding: '0.5rem 1rem',
  selectors: {
    '&:focus': {
      borderColor: '#0070f3',
      outline: 'none',
    },
  },
});

// Define styles for the error message
export const errorMessage = style({
  color: '#ff4d4f',
  fontSize: '12px',
});
