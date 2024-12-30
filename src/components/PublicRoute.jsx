import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const isAuthenticated = Boolean(localStorage.getItem('token'));
    return isAuthenticated ? <Navigate to="/" /> : children;
  };

export default PublicRoute;
