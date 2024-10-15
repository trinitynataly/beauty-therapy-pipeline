/*
Version: 1.1
Admin section styles
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

import { style } from '@vanilla-extract/css';

// Define styles for admin container
export const adminContainer = style({
  maxWidth: '1200px',
  margin: '0 auto',
});

export const adminPageContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

// Define styles for user list container
export const userListContainer = style({
  marginBottom: '2rem',
});

// Define styles for user item rows
export const userItem = style({
  borderBottom: '1px solid #e5e7eb',
  ':last-child': {
    borderBottom: 'none',
  },
});

// Define styles for form container
export const formContainer = style({
  maxWidth: '600px',
  margin: '0 auto',
});

// Define styles for input fields
export const inputField = style({
  borderColor: '#d1d5db',
  ':focus': {
    outline: 'none',
    borderColor: '#3b82f6',
  },
});

// Define styles for buttons
export const buttonStyle = style({
  transition: 'all 0.3s ease',
  ':hover': {
    transform: 'translateY(-2px)',
  },
});

// Define styles for error messages
export const errorMessage = style({
  marginTop: '0.5rem',
});

export const actionButton = style({
  padding: '0.5rem 1rem',
  borderRadius: '0.25rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    transform: 'translateY(-2px)',
  },
});

export const adminPageHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
});

export const linkStyle = style({
  color: '#3b82f6',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  ':hover': {
    transform: 'translateY(-2px)',
  },
});