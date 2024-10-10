# Beauty by Gulia

**Beauty by Gulia** is a complete e-commerce solution for beauty and massage home services, built using Node.js, Express, and Firebase on the backend, and React with Vite on the frontend. This project features user management, appointment booking, therapist scheduling, and content management capabilities, providing a seamless and responsive experience for clients and therapists.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Project](#running-the-project)
- [Backend Configuration](#backend-configuration)
- [Frontend Configuration](#frontend-configuration)

## Features

- User Authentication and Authorization (JWT-based)
- Appointment booking with available time slots
- Therapist scheduling and profile management
- Storefront with beauty and massage service listings
- Content management for articles and service descriptions
- Secure and optimized for performance

## Tech Stack

### Backend
- **Node.js**: Backend runtime environment
- **Express**: Backend framework for handling API routes
- **Firebase Firestore**: Database for user and appointment management and storage for images and other media
- **jsonwebtoken**: For authentication and authorization
- **bcrypt**: For password hashing

### Frontend
- **React**: Library for building user interfaces
- **Vite**: Fast frontend build tool and dev server
- **TailwindCSS**: Utility-first CSS framework for custom styles
- **Vanilla Extract**: CSS-in-JS library for scoped styles

## Getting Started

### Prerequisites

- **Node.js** (v16 or later)
- **Firebase Account** (for Firestore and storage configuration)
- **npm** or **yarn** (for managing dependencies)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/trinitynataly/beauty-therapy.git
   ```

2. Navigate to the project directory:

   ```bash
   cd beauty-therapy
   ```

3. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

### Running the Project

#### Backend

1. Create a `.env` file in the `backend` directory and configure the following environment variables:

   ```
   # Server Configuration
   PORT=5000
   SERVER_NAME=localhost

   # Password Hashing Pepper
   PEPPER=your_pepper_string

   # JWT Configuration
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret

   # Firebase Configuration
   FIREBASE_TYPE=service_account
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=your_client_email
   FIREBASE_CLIENT_ID=your_client_id
   FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
   FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
   FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
   FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your_service_account_email
   FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   ```

2. Start the backend server:

   ```bash
   npm run dev
   ```

   The backend server will run at `http://localhost:5000`.

#### Frontend

1. In the `frontend` directory, create a `.env` file and configure the following environment variable:

   ```
   VITE_API_URL=http://localhost:5000
   ```

2. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will run at `http://localhost:3000`.

## Backend Configuration

- **Firebase Firestore**: Configure a Firebase project and enable Firestore for user and appointment data management.
- **Firebase Storage**: Enable Firebase Storage for image and media file uploads.

## Frontend Configuration

The frontend is built using React and styled with TailwindCSS and Vanilla Extract. Ensure that the `VITE_API_BASE_URL` environment variable in the `.env` file is set correctly to communicate with the backend.
