/*
Version: 1.0
Home page styles
Last Edited by: Natalia Pakhomova
Last Edit Date: 11/10/2024
*/

// Import the style function from vanilla-extract
import { style } from '@vanilla-extract/css';
// Import hero image from assets
import heroImage from '../assets/hero-image.jpg';

// Define vanilla-extract styles for custom use
export const heroStyle = style({
  position: 'relative', // Make the container a positioned element
  backgroundImage: `url(${heroImage})`, // Set the background image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '500px', // Example height, adjust as needed
  overflow: 'hidden', // Ensure the pseudo-element doesn't overflow
  '::before': {
    content: '""', // Required for the pseudo-element
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
    zIndex: 1, // Ensure it covers the background image
  },
});

export const circleImage = style({
  borderRadius: '50%',
  overflow: 'hidden',
  border: '5px solid #8bc34a',
});

export const servicesImage = style({
  borderRadius: '50%',
  overflow: 'hidden',
  border: '5px solid #8bc34a',
  width: '100%',
  maxWidth: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
});