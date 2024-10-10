/*
Version: 1.1
API functions for handling user authentication.
Last Edited by: Natalia Pakhomova
Last Edit Date: 10/09/2024
*/

import { apiRequest } from '../utils/api';

/**
 * Function to handle user login.
 * Sends a POST request to the `/auth/login` endpoint.
 *
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Returns a promise resolving with the access and refresh tokens.
 * @throws {Error} - Throws an error if the login request fails.
 */
export const ApiLogin = async (email, password) => {
    // Call the apiRequest function with the appropriate parameters
    const response = await apiRequest('auth/login', 'POST', { email, password }, { skipTokens: true });
    // Extract the tokens from the response
    const { accessToken, refreshToken } = response;
    // Return the tokens
    return { accessToken, refreshToken };
};
