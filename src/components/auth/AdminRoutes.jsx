import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../../pages/AdminLogin';
import AdminDashboard from '../../pages/AdminDashboard';
import AdminRoute from './AdminRoute';
import { ADMIN_ROLES } from '../../config/adminConfig';

function AdminRoutes() {
  return (
    <Routes>
      {/* Public admin routes */}
      <Route path="login" element={<AdminLogin />} />

      {/* Protected admin routes */}
      <Route
        path="dashboard"
        element={
          <AdminRoute requiredRole={ADMIN_ROLES.ADMIN}>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* Catch all - redirect to dashboard (which will redirect to login if needed) */}
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}

export default AdminRoutes;
