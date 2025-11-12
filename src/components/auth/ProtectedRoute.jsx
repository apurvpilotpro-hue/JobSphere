import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useUser();
  
  // Always redirect to login if not authenticated
  if (!isAuthenticated) {
    // Force a clean authentication state
    localStorage.removeItem('userId');
    return <Navigate to="/login" replace />;
  }

  return children;
};