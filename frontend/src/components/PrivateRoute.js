// frontend/src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Optional: Show a loading spinner or some placeholder while auth state is being determined
    return <div>Loading authentication status...</div>;
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to so we can send them there after they login.
    // This is a common pattern but requires state in Navigate, which can be complex.
    // For MVP, a simple redirect is fine.
    // Later, could use: return <Navigate to="/login" state={{ from: location }} replace />;
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Renders the child route's element
};

export default PrivateRoute;
