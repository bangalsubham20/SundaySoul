import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../common/LoadingSpinner';
import AccessDenied from '../common/AccessDenied';
import { adminAccounts, ADMIN_ROLES } from '../../config/adminConfig';

function AdminRoute({ children, requiredRole = 'admin' }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Check loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  // Backend returns role as 'ADMIN' or 'USER'
  const hasRequiredRole = user.role === 'ADMIN';

  if (!hasRequiredRole) {
    return (
      <AccessDenied
        type="insufficient"
        role={user.role}
        requiredRole="ADMIN"
      />
    );
  }

  return children;
}

export default AdminRoute;
