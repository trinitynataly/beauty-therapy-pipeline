/*
Version: 1.1
Last edited by: Natalia Pakhomova
Last edit date: 06/08/2024
Firebase initialization configuration for using Firebase Admin SDK.
*/

// Import the Firebase Admin SDK
const admin = require('firebase-admin');

/**
 * Initialize Firebase with the provided configuration from environment variables.
 */
const initializeFirebase = () => {
  try {
    // Initialize the Firebase app with the credentials and storage bucket
    admin.initializeApp({
      // Set the credentials using a service account
      credential: admin.credential.cert({
        type: process.env.FIREBASE_TYPE, // Type of the service account
        project_id: process.env.FIREBASE_PROJECT_ID, // Firebase project ID
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID, // Private key ID
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Private key (formatted to handle newlines)
        client_email: process.env.FIREBASE_CLIENT_EMAIL, // Client email
        client_id: process.env.FIREBASE_CLIENT_ID, // Client ID
        auth_uri: process.env.FIREBASE_AUTH_URI, // Authentication URI
        token_uri: process.env.FIREBASE_TOKEN_URI, // Token URI
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL, // Auth provider certificate URL
        client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL, // Client certificate URL
      }),
      // Set the storage bucket, using a default if not provided
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "your-project-id.appspot.com"
    });
    // Log a success message if Firebase is initialized successfully
    console.log('Firebase initialized');
  } catch (error) { // Catch any errors during initialization
    // Log the error message to the console
    console.error(`Error initializing Firebase: ${error.message}`);
  }
};

// Export the initializeFirebase function for use in other parts of the application
module.exports = { initializeFirebase };
