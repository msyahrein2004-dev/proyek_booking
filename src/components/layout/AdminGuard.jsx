import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const AdminGuard = ({ children }) => {
  const { adminAuth } = useApp();
  const location = useLocation();

  if (!adminAuth?.isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};
