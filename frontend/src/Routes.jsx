/*
Version: 1.5
Routes component for the frontend
Last Edited by: Natalia Pakhomova
Last Edit Date: 05/11/2024
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
import Cart from './pages/user/Cart'; // Import Cart component

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
      <Route path="/login" element={<Login />} /> {/* Login route */}
      <Route path="/register" element={<Register />} /> {/* Register route */}
      {/* Wrap all other routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/about" element={<About />} /> {/* About route */}
        <Route path="/services" element={<Services />} /> {/* Services route */}
        <Route path="/services/:slug" element={<Service />} /> {/* Service detail route */}
        <Route path="/contact-us" element={<Contact />} /> {/* Contact route */}
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}> {/* Protected route wrapper */}
          <Route path="/profile" element={<Profile />} /> {/* Profile route */}
          <Route path="/cart" element={<Cart />} /> {/* Cart route */}
        </Route>
        {/* Admin routes */}
        <Route element={<AdminRoute />}> {/* Admin route wrapper */}
          <Route path="/admin" element={<Admin />} /> {/* Admin dashboard route */}
          <Route path="/admin/users" element={<Users />} /> {/* Users route */}
          <Route path="/admin/categories" element={<Categories />} /> {/* Categories route */}
          <Route path="/admin/services" element={<ServicesAdmin />} /> {/* Services route */}
        </Route>
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

// Export the AppRoutes component
export default AppRoutes;
