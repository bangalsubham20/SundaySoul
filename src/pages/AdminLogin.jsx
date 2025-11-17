import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import { FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff, FiCheck, FiArrowRight } from 'react-icons/fi';

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showDemo, setShowDemo] = useState(true);

  const [formData, setFormData] = useState({
    email: localStorage.getItem('rememberedAdminEmail') || '',
    password: ''
  });

  // Valid admin accounts with roles and permissions
  const adminAccounts = [
    {
      email: 'admin@wravelcommunity.com',
      password: 'Admin@123456',
      role: 'admin',
      name: 'Admin User',
      permissions: ['manage_trips', 'manage_bookings', 'manage_users', 'view_analytics']
    },
    {
      email: 'superadmin@wravelcommunity.com',
      password: 'SuperAdmin@12345',
      role: 'superadmin',
      name: 'Super Admin',
      permissions: ['all']
    },
    {
      email: 'moderator@wravelcommunity.com',
      password: 'Moderator@12345',
      role: 'moderator',
      name: 'Moderator',
      permissions: ['manage_bookings', 'view_analytics']
    }
  ];

  // Auto-fill demo email if coming from home
  useEffect(() => {
    if (location.state?.demo) {
      setFormData(prev => ({
        ...prev,
        email: 'admin@wravelcommunity.com'
      }));
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate inputs
      if (!formData.email.trim() || !formData.password.trim()) {
        setError('Please enter both email and password');
        setLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Simulate API call (replace with actual backend call)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Verify credentials
      const validAdmin = adminAccounts.find(
        acc => acc.email === formData.email.toLowerCase() && acc.password === formData.password
      );

      if (!validAdmin) {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
        return;
      }

      // Store admin session
      localStorage.setItem('adminToken', `admin_token_${Date.now()}_${Math.random()}`);
      localStorage.setItem('adminRole', validAdmin.role);
      localStorage.setItem('adminEmail', validAdmin.email);
      localStorage.setItem('adminName', validAdmin.name);
      localStorage.setItem('adminPermissions', JSON.stringify(validAdmin.permissions));

      // Remember email if checked
      if (rememberMe) {
        localStorage.setItem('rememberedAdminEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedAdminEmail');
      }

      // Show success animation
      setSuccess(true);
      
      // Redirect after success animation
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleDemoLogin = (email) => {
    const adminAccount = adminAccounts.find(acc => acc.email === email);
    setFormData({
      email: adminAccount.email,
      password: adminAccount.password
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Animated Background */}
      <motion.div
        className="fixed -top-96 -right-96 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-600/20 via-indigo-600/15 to-transparent blur-3xl -z-10"
        animate={{ y: [0, 60, 0], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="fixed -bottom-96 -left-96 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-transparent blur-3xl -z-10"
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      {/* Success Animation Overlay */}
      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl"
            >
              <FiCheck className="text-white" size={40} />
            </motion.div>
            <p className="text-2xl font-bold text-white">Welcome back! 🎉</p>
            <p className="text-slate-300 mt-2">Redirecting to dashboard...</p>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <h1 className="text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
              ⚙️ Admin Portal
            </h1>
          </motion.div>
          <motion.p variants={itemVariants} className="text-slate-400 text-lg">
            Secure access for administrators only
          </motion.p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl hover:border-white/20 transition-all"
        >
          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl flex items-start gap-3 backdrop-blur-lg"
            >
              <FiAlertCircle className="flex-shrink-0 mt-0.5" size={20} />
              <span className="text-sm font-semibold">{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Admin Email
              </label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 transition" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@wravelcommunity.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/10 transition-all"
                  required
                  disabled={loading}
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Password
              </label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 transition" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/10 transition-all"
                  required
                  disabled={loading}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </motion.button>
              </div>
            </motion.div>

            {/* Remember Me */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-purple-500 cursor-pointer rounded"
                disabled={loading}
              />
              <label htmlFor="rememberMe" className="text-sm text-slate-400 cursor-pointer hover:text-slate-300 transition">
                Remember email
              </label>
            </motion.div>

            {/* Login Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Login to Admin Panel
                    <FiArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8 }}
            className="my-6 relative"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-white/10 to-white/5 text-slate-400">Demo Credentials</span>
            </div>
          </motion.div>

          {/* Demo Accounts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className={`space-y-2 transition-all duration-300 ${showDemo ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}
          >
            {adminAccounts.map((account, idx) => (
              <motion.button
                key={account.email}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={() => handleDemoLogin(account.email)}
                disabled={loading}
                className="w-full text-left p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white group-hover:text-purple-300 transition">{account.name}</p>
                    <p className="text-xs text-slate-500 group-hover:text-slate-400 transition">{account.email}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                    {account.role}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Toggle Demo Accounts */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={() => setShowDemo(!showDemo)}
            className="w-full text-center text-sm text-slate-400 hover:text-slate-300 py-2 transition"
          >
            {showDemo ? '▼ Hide' : '▶ Show'} Demo Accounts
          </motion.button>

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            onClick={() => navigate('/')}
            className="w-full mt-4 text-slate-400 hover:text-slate-300 text-sm font-semibold transition py-2"
          >
            ← Back to Website
          </motion.button>
        </motion.div>

        {/* Security Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center text-xs text-slate-500 mt-6 px-4"
        >
          🔒 This is a secure admin portal. Please change your password after your first login.
        </motion.p>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
