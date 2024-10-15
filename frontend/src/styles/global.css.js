/*
Version: 1.1
Global styles
Last Edited by: Natalia Pakhomova
Last Edit Date: 15/10/2024
*/

// Import the globalStyle function from vanilla-extract
import { globalStyle } from '@vanilla-extract/css';

// Define global styles for the body, html, and root elements
globalStyle('body, html, #root', {
  margin: 0,
  padding: 0,
  height: '100%',
});

// Define global styles for the root element
globalStyle('*', {
  boxSizing: 'border-box',
});