/*
Version: 1.0
Login form styles
Last Edited by: Natalia Pakhomova
Last Edit Date: 03/09/2024
*/

// Import the style function from vanilla-extract
import { style } from '@vanilla-extract/css';

// Define styles for the login form container
export const loginFormContainer = style({
  backgroundColor: '#f7f7f7',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

// Define styles for the login form title
export const inputField = style({
  fontSize: '14px',
  borderColor: '#ccc',
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

// Define styles for the login form button
export const buttonStyle = style({
  backgroundColor: '#0070f3',
  padding: '0.75rem',
  borderRadius: '4px',
  fontSize: '16px',
  fontWeight: 'bold',
  ':hover': {
    backgroundColor: '#005bb5',
  },
});
