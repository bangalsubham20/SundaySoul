import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiArrowRight, FiHeart } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';

function Footer() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  // Don't show footer on admin pages
  if (isAdminPage) {
    return null;
  }

  const currentYear = new Date().getFullYear();

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
    visible: { opacity: 1, y: 0 }
  };

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Explore Trips', path: '/trips' },
    { label: 'Community', path: '/community' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: '#' },
    { label: 'Terms & Conditions', path: '#' },
    { label: 'Contact Us', path: '#' }
  ];

  const contactInfo = [
    { icon: FiPhone, label: '+91 97 97 97 21 75', href: 'tel:+919797972175' },
    { icon: FiMail, label: 'support@sundaysoul.com', href: 'mailto:support@sundaysoul.com' },
    { icon: FiMapPin, label: 'India', href: '#' }
  ];

  const socialLinks = [
    { icon: FaFacebook, label: 'Facebook', href: 'https://facebook.com' },
    { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: FaTwitter, label: 'Twitter', href: 'https://twitter.com' },
    { icon: FaYoutube, label: 'YouTube', href: 'https://youtube.com' },
    { icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com' }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative bg-teal-900 text-grey-400 border-t border-white/10 font-sans"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Top Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-4xl"
              >
                🏔️
              </motion.div>
              <div>
                <p className="text-2xl font-display font-black tracking-tighter text-white">
                  SundaySoul
                </p>
                <p className="text-xs text-cyan-500 font-bold tracking-widest uppercase">Community</p>
              </div>
            </motion.div>
            <p className="text-grey-400 text-sm leading-relaxed">
              India's premier social travel community. Connect with adventurers, discover hidden gems, and create unforgettable memories together.
            </p>
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 cursor-pointer transition text-sm font-bold uppercase tracking-wide"
            >
              Join our community
              <FiArrowRight size={16} />
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-bold text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.path}
                    className="text-grey-400 hover:text-cyan-400 transition-all flex items-center gap-2 group"
                  >
                    <motion.span
                      initial={{ x: -5, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      className="text-cyan-500"
                    >
                      →
                    </motion.span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-bold text-white">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link, idx) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.path}
                    className="text-grey-400 hover:text-cyan-400 transition-all flex items-center gap-2 group"
                  >
                    <motion.span
                      initial={{ x: -5, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      className="text-cyan-500"
                    >
                      →
                    </motion.span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-bold text-white">
              Contact Us
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={idx}
                    href={info.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 text-grey-400 hover:text-white transition-all group"
                  >
                    <motion.div
                      className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-all"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon size={16} className="text-cyan-500" />
                    </motion.div>
                    <span className="text-sm">{info.label}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-8 md:p-10 backdrop-blur-xl bg-gradient-to-r from-cyan-900/20 to-teal-900/20 border border-white/10 rounded-3xl"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Stay Updated!</h3>
              <p className="text-grey-400">Get exclusive deals and travel tips delivered to your inbox</p>
            </div>
            <motion.form
              whileSubmit={{ scale: 0.98 }}
              className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-80 px-5 py-3 rounded-full bg-black/30 border border-white/10 text-white placeholder-grey-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-teal-900 font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-12"
        >
          {socialLinks.map((social, idx) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-all group"
                title={social.label}
              >
                <Icon size={20} className="text-grey-400 group-hover:text-cyan-400 transition-all" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-grey-500 text-sm"
        >
          <motion.p
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            © {currentYear} SundaySoul. All rights reserved.
          </motion.p>

          <motion.div
            className="flex items-center gap-1 text-grey-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Made with
            <FiHeart className="text-red-500" size={16} />
            in India 🇮🇳
          </motion.div>

          <div className="flex gap-2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono"
            >
              v2.0.0
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
