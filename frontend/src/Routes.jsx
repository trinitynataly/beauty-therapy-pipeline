/*
Version: 1.3
Routes component for the frontend
Last Edited by: Natalia Pakhomova
Last Edit Date: 31/10/2024
*/

import { Routes, Route } from 'react-router-dom'; // Import the Routes and Route components from React Router
import Layout from './components/layout/Layout'; // Import the Layout component
import ProtectedRoute from './components/routes/ProtectedRoute'; // Import ProtectedRoute component
import AdminRoute from './components/routes/AdminRoute'; // Import AdminRoute component
import Home from './pages/Home'; // Import Home component
import About from './pages/About'; // Import About component
import Services from './pages/Services'; // Import Services List component
import Service from './pages/Service'; // Import Service Detail component
import Contact from './pages/Contact'; // Import Contact component
// Import User routes
import Login from './pages/Login'; // Import Login component
import Register from './pages/Register'; // Import Register component
import Profile from './pages/user/Profile'; // Import Profile component

// Import Admin routes
import Admin from './pages/admin/Admin'; // Import Admin component
import Users from './pages/admin/Users'; // Import Users component
import Categories from './pages/admin/Categories'; // Import Categories component
import ServicesAdmin from './pages/admin/Services';

// Import NotFound component
import NotFound from './pages/NotFound'; // Import NotFound component

// Define the AppRoutes component
const AppRoutes = () => {
  // Return the JSX for the AppRoutes component
  return (
    <Routes>
      {/* Unwrapped routes for login and register */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Wrap all other routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<Service />} />
        <Route path="/contact-us" element={<Contact />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* Admin routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/services" element={<ServicesAdmin />} />
        </Route>
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

// Export the AppRoutes component
export default AppRoutes;
