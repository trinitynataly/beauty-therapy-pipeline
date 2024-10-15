/*
Version: 1.2
Template styles for the logo component with variants
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

import '@fontsource/urbanist'; // Import the Urbanist font
import { style, styleVariants, globalStyle } from '@vanilla-extract/css'; // Import the style functions
import { themeVars } from '../theme.css'; // Import the theme variables

// Base styles for the logo container
const baseLogoStyle = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  gap: '10px',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
  },
});

// Create separate styles for the image and text elements
export const logoImageStyle = style({
  width: '30px', // Default width for the image
  height: 'auto',
  border: 0,
  transition: 'width 0.3s ease', // Smooth transition for resizing
});

// Create a style for the text element
export const logoTextStyle = style({
  fontFamily: '"Urbanist", sans-serif',
  fontWeight: 500,
  fontSize: '26px',
  background: `linear-gradient(90deg, ${themeVars.color.primary}, ${themeVars.color.accent3})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  transition: 'font-size 0.3s ease',
  fontStyle: 'italic',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
  },
});

// Variants for the logo based on size
export const logoVariants = styleVariants({
  default: [baseLogoStyle, { maxHeight: '30px' }],
  large: [baseLogoStyle, { maxHeight: '80px', justifyContent: 'center' }],
  white: [baseLogoStyle, { maxHeight: '30px', color: 'white' }],
});

// Global style to modify the image size based on the variant
globalStyle(`${logoVariants.default} img`, {
  width: '50px', // Image width for the default variant
});

globalStyle(`${logoVariants.white} img`, {
  width: '50px', // Image width for the default variant
});

globalStyle(`${logoVariants.large} img`, {
  width: '80px', // Image width for the large variant
});

globalStyle(`${logoVariants.large} span`, {
  fontSize: '40px'
});

globalStyle(`${logoVariants.white} span`, {
  background: themeVars.color.white,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});
