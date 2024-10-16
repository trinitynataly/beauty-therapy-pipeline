/*
Version: 1.1
Global form styles
Last Edited by: Natalia Pakhomova
Last Edit Date: 16/10/2024
*/

// import the style function from vanilla-extract
import { style } from '@vanilla-extract/css';

// Define styles for the login form container
export const formContainer = style({
  backgroundColor: '#f7f7f7',
  padding: '2rem',
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

// Define styles for table rows
export const tableRow = style({
  borderBottom: '1px solid #e5e7eb',
  ':last-child': {
    borderBottom: 'none',
  },
});
