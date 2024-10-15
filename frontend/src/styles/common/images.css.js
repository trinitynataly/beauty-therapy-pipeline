/*
Version: 1.0
Template styles images
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

// Import the style function from vanilla-extract
import { style } from '@vanilla-extract/css';
// Import the theme variables
import { themeVars } from '../theme.css';

export const circleImage = style({
  borderRadius: '50%',
  overflow: 'hidden',
  border: `5px solid ${themeVars.color.accent3}`,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
});