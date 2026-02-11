import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiPhone, FiCheck, FiEye, FiEyeOff } from 'react-icons/fi';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
    agree: false
  });
  const [showPw, setShowPw] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!form.fullName.trim()) return 'Name required';
    if (!/^[A-Za-z ]{3,}$/.test(form.fullName)) return 'Name must be at least 3 letters';
    if (!/^[\w-.]+@[\w-]+\.\w{2,}$/.test(form.email)) return 'Valid email required';
    if (!/^\d{10}$/.test(form.phone)) return 'Valid 10-digit phone required';
    if (form.password.length < 6) return 'Password at least 6 chars';
    if (!/[A-Z]/.test(form.password)) return 'Password: one uppercase required';
    if (!/[a-z]/.test(form.password)) return 'Password: one lowercase required';
    if (!/\d/.test(form.password)) return 'Password: one number required';
    if (form.password !== form.confirm) return 'Passwords do not match';
    if (!form.agree) return 'You must agree to terms';
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setLoading(true);
    try {
      await register(form.fullName, form.email, form.password, form.phone);
      setSubmitted(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center bg-teal-900 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-teal-900/60 shadow-2xl rounded-3xl p-12 backdrop-blur-xl border border-white/10 flex flex-col items-center text-center"
      >
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-500/20 text-green-400 mb-6 border border-green-500/30">
          <FiCheck size={40} />
        </div>
        <h2 className="text-3xl font-display font-black text-white mb-2">Account Created!</h2>
        <p className="text-grey-400 mb-8">Welcome to SundaySoul.</p>
        <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Redirecting to home...
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-900 relative overflow-hidden font-sans py-12 selection:bg-cyan-500 selection:text-teal-900">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-950 via-teal-900 to-black z-0" />

      {/* Animated Orbs */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl z-0"
      />
      <motion.div
        animate={{ x: [0, -120, 0], y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-24 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl z-0"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-teal-900/60 shadow-2xl rounded-3xl p-8 md:p-12 backdrop-blur-xl border border-white/10 relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-display font-black text-white mb-2 tracking-tight">Create Account</h2>
          <p className="text-grey-400">Join our community of travelers</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              key="register-error"
              exit={{ opacity: 0, y: -8 }}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2"
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-grey-300 font-semibold text-sm">Full Name</label>
            <div className="relative group">
              <FiUser className="absolute left-4 top-3.5 text-grey-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
              <input
                className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none text-white placeholder-grey-600 transition-all"
                placeholder="John Doe"
                name="fullName"
                value={form.fullName}
                onChange={e => setForm({ ...form, fullName: e.target.value })}
                autoFocus required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-grey-300 font-semibold text-sm">Email Address</label>
            <div className="relative group">
              <FiMail className="absolute left-4 top-3.5 text-grey-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
              <input
                className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none text-white placeholder-grey-600 transition-all"
                placeholder="you@email.com"
                type="email"
                name="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-grey-300 font-semibold text-sm">Phone Number</label>
            <div className="relative group">
              <FiPhone className="absolute left-4 top-3.5 text-grey-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
              <input
                className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none text-white placeholder-grey-600 transition-all"
                placeholder="1234567890"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-grey-300 font-semibold text-sm">Password</label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-3.5 text-grey-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
              <input
                className="w-full pl-12 pr-12 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none text-white placeholder-grey-600 transition-all"
                placeholder="••••••••"
                type={showPw ? 'text' : 'password'}
                name="password"
                value={form.password}
                autoComplete="new-password"
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-3.5 text-grey-500 hover:text-white focus:outline-none transition-colors"
                tabIndex={-1}
                onClick={() => setShowPw(v => !v)}
              >
                {showPw ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-grey-300 font-semibold text-sm">Confirm Password</label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-3.5 text-grey-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
              <input
                className="w-full pl-12 pr-12 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none text-white placeholder-grey-600 transition-all"
                placeholder="••••••••"
                type={showConf ? 'text' : 'password'}
                name="confirm"
                value={form.confirm}
                onChange={e => setForm({ ...form, confirm: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-3.5 text-grey-500 hover:text-white focus:outline-none transition-colors"
                tabIndex={-1}
                onClick={() => setShowConf(v => !v)}
              >
                {showConf ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              checked={form.agree}
              id="terms"
              type="checkbox"
              className="w-4 h-4 rounded bg-black/40 border-white/10 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-teal-900"
              onChange={e => setForm({ ...form, agree: e.target.checked })}
            />
            <label htmlFor="terms" className="text-grey-400 text-sm">
              I agree to&nbsp;
              <a href="#" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">terms & privacy</a>
            </label>
          </div>

          <button
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold text-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating...
              </span>
            ) : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-grey-400 mt-8">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors"
          >
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
