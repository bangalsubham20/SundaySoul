import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../../pages/AdminLogin';
import AdminDashboard from '../../pages/AdminDashboard';
import AdminRoute from './AdminRoute';

function AdminRoutes() {
  return (
    <Routes>
      {/* Public admin routes */}
      <Route path="/login" element={<AdminLogin />} />
      
      {/* Protected admin routes */}
      <Route
        path="/dashboard"
        element={
          <AdminRoute requiredRole="admin">
            <AdminDashboard />
          </AdminRoute>
        }
      />
      
      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}

export default AdminRoutes;
