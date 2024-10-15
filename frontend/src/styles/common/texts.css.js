/*
Version: 1.0
Template styles texts
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

// Import the style function from vanilla-extract
import { style } from '@vanilla-extract/css';
// Import the theme variables
import { themeVars } from '../theme.css';

export const sectionTitle = style({
  fontSize: '2rem',
  fontWeight: '500',
  color: themeVars.color.primary,
  marginBottom: '1rem',
  fontFamily: '"Urbanist", sans-serif',
  textAlign: 'center',
});

export const sectionSubTitle = style({
  fontSize: '1.5rem',
  fontWeight: '400',
  color: themeVars.color.secondary,
  marginBottom: '1rem',
  fontFamily: '"Urbanist", sans-serif',
  textAlign: 'center',
});

export const boxTitle = style({
  fontSize: '1.25rem',
  fontWeight: '500',
  color: themeVars.color.secondary,
  marginBottom: '1rem',
  fontFamily: '"Urbanist", sans-serif',
  textAlign: 'center',
});
