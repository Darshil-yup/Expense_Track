import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ user }) => {
  if (!user) {
    // If no user is logged in, redirect to the landing page
    return <Navigate to="/" replace />; // Changed from "/login" to "/"
  }

  // If a user is logged in, show the page they were trying to access
  return <Outlet />;
};

export default ProtectedRoute;