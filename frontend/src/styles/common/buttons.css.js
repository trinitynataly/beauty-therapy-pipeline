/*
Version: 1.0
Global button styles
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

// Import the style function from vanilla-extract
import { style } from '@vanilla-extract/css';
// Import brand colors from the abstracts folder
import { themeVars } from '../theme.css';

// Define styles for the primary button
export const primaryButton = style({
  padding: '0.5rem 1rem',
  borderRadius: '20px',
  border: '0px none',
  background: `linear-gradient(180deg, ${themeVars.color.primary}, ${themeVars.color.accent3})`,
  color: themeVars.color.white,
  cursor: 'pointer',
  fontFamily: '"Urbanist", sans-serif',
  ':hover': {
    background: `linear-gradient(180deg, ${themeVars.color.accent3}, ${themeVars.color.primary})`,
  },
});

// Define styles for the secondary button
export const secondaryButton = style({
  padding: '0.5rem 1rem',
  borderRadius: '20px',
  border: '0px none',
  background: `linear-gradient(180deg, ${themeVars.color.secondary}, ${themeVars.color.accent1})`,
  color: themeVars.color.white,
  cursor: 'pointer',
  fontFamily: '"Urbanist", sans-serif',
  ':hover': {
    background: `linear-gradient(180deg, ${themeVars.color.accent1}, ${themeVars.color.secondary})`,
  },
});
