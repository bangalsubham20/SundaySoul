import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../common/LoadingSpinner';
import { FiAlertCircle, FiLock } from 'react-icons/fi';

function AdminRoute({ children, requiredRole = 'admin' }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Valid admin accounts with roles
  const adminAccounts = [
    {
      email: 'admin@travelcommunity.com',
      role: 'admin',
      permissions: ['manage_trips', 'manage_bookings', 'manage_users', 'view_analytics']
    },
    {
      email: 'superadmin@travelcommunity.com',
      role: 'superadmin',
      permissions: ['all']
    },
    {
      email: 'moderator@travelcommunity.com',
      role: 'moderator',
      permissions: ['manage_bookings', 'view_analytics']
    }
  ];

  // Check loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Find admin account
  const adminAccount = adminAccounts.find(acc => acc.email === user.email);

  // Check if user is an admin
  if (!adminAccount) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 max-w-md w-full text-center shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FiLock className="text-red-400" size={32} />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-3">Access Denied</h2>
          <p className="text-slate-400 mb-6">
            You don't have permission to access the admin panel. This area is restricted to administrators only.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            ← Go Back Home
          </motion.a>
        </motion.div>
      </motion.div>
    );
  }

  // Check role-based access
  if (requiredRole && requiredRole !== 'any') {
    const hasRequiredRole =
      adminAccount.role === requiredRole ||
      adminAccount.role === 'superadmin';

    if (!hasRequiredRole) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 max-w-md w-full text-center shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-yellow-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiAlertCircle className="text-yellow-400" size={32} />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-3">Insufficient Permissions</h2>
            <p className="text-slate-400 mb-6">
              Your role ({adminAccount.role}) doesn't have access to this section. Required role: {requiredRole}
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/admin/dashboard"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Go to Dashboard
            </motion.a>
          </motion.div>
        </motion.div>
      );
    }
  }

  return children;
}

export default AdminRoute;
