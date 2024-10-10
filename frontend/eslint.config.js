/*
Version: 1.1
ESLint configuration for the frontend codebase.
Last Edited by: Natalia Pakhomova
Last Edit Date: 10/09/2024
*/

import js from '@eslint/js' // Import the base ESLint configuration for JavaScript
import globals from 'globals' // Import the browser globals for the frontend codebase
import react from 'eslint-plugin-react' // Import the ESLint plugin for React
import reactHooks from 'eslint-plugin-react-hooks' // Import the ESLint plugin for React hooks
import reactRefresh from 'eslint-plugin-react-refresh' // Import the ESLint plugin for React Refresh

// Export the ESLint configuration for the frontend codebase
export default [
  { ignores: ['dist'] }, // Ignore the dist directory from linting
  {
    files: ['**/*.{js,jsx}'], // Set the file extensions to lint for JavaScript and JSX
    languageOptions: { // Set the language options for the frontend codebase
      ecmaVersion: 2020, // Use ECMAScript 2020
      globals: globals.browser, // Use the browser globals for the frontend codebase
      parserOptions: { // Set the parser options for the frontend codebase
        ecmaVersion: 'latest', // Use the latest ECMAScript version
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
        sourceType: 'module', // Use ECMAScript modules
      },
    },
    settings: { react: { version: '18.3' } }, // Set the React version to 18.3
    plugins: { // Set the ESLint plugins for the frontend codebase
      react, // Use the ESLint plugin for React
      'react-hooks': reactHooks, // Use the ESLint plugin for React hooks
      'react-refresh': reactRefresh, // Use the ESLint plugin for React Refresh
    },
    rules: { // Set the ESLint rules for the frontend codebase
      ...js.configs.recommended.rules, // Use the recommended ESLint rules for JavaScript
      ...react.configs.recommended.rules, // Use the recommended ESLint rules for React
      ...react.configs['jsx-runtime'].rules, // Use the recommended ESLint rules for JSX runtime
      ...reactHooks.configs.recommended.rules, // Use the recommended ESLint rules for React hooks
      'react/jsx-no-target-blank': 'off', // Disable the rule for target="_blank" links
      'react-refresh/only-export-components': [ // Enable the rule for exporting components
        'warn', // Set the rule to warn
        { allowConstantExport: true }, // Allow constant exports
      ],
    },
  },
]
