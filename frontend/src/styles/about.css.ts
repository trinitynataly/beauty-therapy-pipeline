/*
Version: 1.0
About page styles
Last Edited by: Natalia Pakhomova
Last Edit Date: 11/10/2024
*/

// Import the style function from vanilla-extract
import { style } from '@vanilla-extract/css';

// Container for the entire About page, reused from the Home page
export const aboutContainer = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem',
  textAlign: 'center',
});

// Style for Gulia's photo container with circular shape
export const guliaPhoto = style({
  width: '250px', // Explicitly set width and height to ensure it's a perfect circle
  height: '250px',
  borderRadius: '50%', // Keep circular shape
  overflow: 'hidden',
  border: '5px solid #8bc34a',
  flexShrink: 0, // Prevent the photo from shrinking on smaller screens
});

// Style for the section title
export const sectionTitle = style({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  marginBottom: '2rem',
});
