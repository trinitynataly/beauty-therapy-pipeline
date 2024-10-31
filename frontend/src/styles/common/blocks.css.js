/*
Version: 1.2
Block styles
Last Edited by: Natalia Pakhomova
Last Edit Date: 29/10/2024
*/

// Import the style function from vanilla-extract
import { style } from '@vanilla-extract/css';
// Import the theme variable raw values for hex manipulation
import { brandColors } from '../abstracts/brandColors';
// Import the theme variables
import { themeVars } from '../theme.css';
// Import hero image from assets
import heroImage from '../../assets/hero-image.jpg';
import aboutImage from '../../assets/about-image.jpg';
import contactImage from '../../assets/contact-us.jpg';

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Hero block style
export const heroStyle = style({
  position: 'relative', // Make the container a positioned element
  backgroundImage: `url(${heroImage})`, // Set the background image
  backgroundSize: 'cover', // Cover the entire container
  backgroundPosition: 'center', // Center the background image
  height: '500px', // Set the height of the container
  overflow: 'hidden', // Ensure the pseudo-element doesn't overflow
  '::before': { // Create a pseudo-element
    content: '""', // Empty content is required to create a pseudo-element
    position: 'absolute', // Position the pseudo-element
    top: 0, // Position it at the top
    left: 0, // Position it at the left
    width: '100%', // Set the width to cover the entire
    height: '100%', // Set the height to cover the entire
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
    zIndex: 1, // Ensure it covers the background image but stays behind the content
  },
});

// About block style
export const aboutStyle = style({
  position: 'relative', // Make the container a positioned element
  backgroundImage: `url(${aboutImage})`, // Set the background image
  backgroundSize: 'cover', // Cover the entire container
  backgroundPosition: 'center', // Center the background image
  height: '500px', // Set the height of the container
  overflow: 'hidden', // Ensure the pseudo-element doesn't overflow
  '::before': { // Create a pseudo-element
    content: '""', // Empty content is required to create a pseudo-element
    position: 'absolute', // Position the pseudo-element
    top: 0, // Position it at the top
    left: 0, // Position it at the left
    width: '100%', // Set the width to cover the entire
    height: '100%', // Set the height to cover the entire
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
    zIndex: 1, // Ensure it covers the background image but stays behind the content
  },
});

// Contact block style
export const contactStyle = style({
  position: 'relative', // Make the container a positioned element
  backgroundImage: `url(${contactImage})`, // Set the background image
  backgroundSize: 'cover', // Cover the entire container
  backgroundPosition: 'center', // Center the background image
  height: '500px', // Set the height of the container
  overflow: 'hidden', // Ensure the pseudo-element doesn't overflow
  '::before': { // Create a pseudo-element
    content: '""', // Empty content is required to create a pseudo-element
    position: 'absolute', // Position the pseudo-element
    top: 0, // Position it at the top
    left: 0, // Position it at the left
    width: '100%', // Set the width to cover the entire
    height: '100%', // Set the height to cover the entire
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
    zIndex: 1, // Ensure it covers the background image but stays behind the content
  },
});

// Section divider style
export const sectionDivider = style({
  boxShadow: `0 5px 5px ${hexToRgba(brandColors.accent3, 0.3)} inset`,
});

// Dotted block style
export const dottedBlock = style({
  border: `2px dotted ${themeVars.color.accent1}`,
  borderRadius: '50px',
  padding: '30px',
});

// Product page style
export const productPageStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

// Product image style
export const productImageStyle = style({
  maxWidth: '100%',
  borderRadius: '15px',
  boxShadow: `0 4px 8px ${hexToRgba(brandColors.accent3, 0.2)}`,
});

// Product info style
export const productInfoStyle = style({
  padding: '20px',
  backgroundColor: themeVars.color.background,
  borderRadius: '10px',
  boxShadow: `0 4px 8px ${hexToRgba(brandColors.accent3, 0.1)}`,
});
