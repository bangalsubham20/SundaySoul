import React from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiUsers, FiShoppingBag, FiTrendingUp, FiMapPin } from 'react-icons/fi';

const StatCard = ({ title, value, icon: Icon, trend, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, type: "spring", stiffness: 100 }}
        className="relative overflow-hidden bg-gradient-to-br from-teal-900/40 to-black/20 backdrop-blur-2xl border border-white/5 p-6 rounded-2xl group hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-900/20"
    >
        {/* Background Glow */}
        <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl ${color.replace('text-', 'bg-')}`} />

        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-0" />

        <div className="relative z-10 flex justify-between items-start">
            <div>
                <h3 className="text-grey-400 text-xs font-bold uppercase tracking-wider mb-2">{title}</h3>
                <p className="text-3xl font-display font-black text-white tracking-tight">{value}</p>

                {trend && (
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border ${trend > 0
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>
                            <FiTrendingUp size={10} className={trend < 0 ? 'rotate-180' : ''} />
                            {Math.abs(trend)}%
                        </span>
                        <span className="text-xs text-grey-600 font-medium">vs last month</span>
                    </div>
                )}
            </div>

            <div className={`p-3 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-500 ${color} shadow-lg`}>
                <Icon size={24} />
            </div>
        </div>
    </motion.div>
);

const StatsGrid = ({ stats }) => {
    const cards = [
        { title: 'Total Revenue', value: `₹${(stats.revenue || 0).toLocaleString()}`, icon: FiDollarSign, trend: 12.5, color: 'text-cyan-400' },
        { title: 'Total Bookings', value: stats.bookings || 0, icon: FiShoppingBag, trend: 8.2, color: 'text-purple-400' },
        { title: 'Active Users', value: stats.users || 0, icon: FiUsers, trend: -2.4, color: 'text-pink-400' },
        { title: 'Active Trips', value: stats.trips || 0, icon: FiMapPin, trend: 5.0, color: 'text-amber-400' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card, idx) => (
                <StatCard key={idx} {...card} delay={idx * 0.1} />
            ))}
        </div>
    );
};

export default StatsGrid;
