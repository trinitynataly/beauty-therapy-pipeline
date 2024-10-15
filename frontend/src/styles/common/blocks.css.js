/*
Version: 1.0
Block styles
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

// Import the style function from vanilla-extract
import { style } from '@vanilla-extract/css';
// Import hero image from assets
import heroImage from '../../assets/hero-image.jpg';

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
