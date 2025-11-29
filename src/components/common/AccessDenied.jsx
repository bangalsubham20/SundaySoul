import React from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiAlertCircle } from 'react-icons/fi';

function AccessDenied({ type = 'denied', role, requiredRole }) {
    const isDenied = type === 'denied';

    const content = {
        denied: {
            icon: FiLock,
            color: 'red',
            title: 'Access Denied',
            message: "You don't have permission to access the admin panel. This area is restricted to administrators only.",
            buttonText: '← Go Back Home',
            buttonLink: '/'
        },
        insufficient: {
            icon: FiAlertCircle,
            color: 'yellow',
            title: 'Insufficient Permissions',
            message: `Your role (${role}) doesn't have access to this section. Required role: ${requiredRole}`,
            buttonText: 'Go to Dashboard',
            buttonLink: '/admin/dashboard'
        }
    };

    const config = content[type];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-teal-900 text-white flex items-center justify-center px-4 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-950 via-teal-900 to-black z-0" />

            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="relative z-10 backdrop-blur-xl bg-teal-900/60 border border-white/10 rounded-2xl p-12 max-w-md w-full text-center shadow-2xl"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`w-16 h-16 bg-${config.color}-500/20 border border-${config.color}-500/30 rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                    <Icon className={`text-${config.color}-400`} size={32} />
                </motion.div>

                <h2 className="text-2xl font-display font-bold text-white mb-3">{config.title}</h2>
                <p className="text-grey-400 mb-6">
                    {config.message}
                </p>

                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={config.buttonLink}
                    className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                >
                    {config.buttonText}
                </motion.a>
            </motion.div>
        </motion.div>
    );
}

export default AccessDenied;
