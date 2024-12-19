import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    toast.warn('Anda harus login terlebih dahulu.');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    toast.warn('Anda tidak bisa mengakses halaman ini.');
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
