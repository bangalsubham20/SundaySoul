import React from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiUsers, FiShoppingBag, FiTrendingUp, FiMapPin } from 'react-icons/fi';

const StatCard = ({ title, value, icon: Icon, trend, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-teal-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300"
    >
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
            <Icon size={80} />
        </div>

        <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${color} bg-opacity-10 backdrop-blur-md`}>
                    <Icon size={24} className={color.replace('bg-', 'text-')} />
                </div>
                {trend && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${trend > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                        <FiTrendingUp size={12} className={trend < 0 ? 'rotate-180' : ''} />
                        {Math.abs(trend)}%
                    </span>
                )}
            </div>

            <h3 className="text-grey-400 text-sm font-medium mb-1">{title}</h3>
            <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
        </div>
    </motion.div>
);

const StatsGrid = ({ stats }) => {
    const cards = [
        { title: 'Total Revenue', value: `₹${(stats.revenue || 0).toLocaleString()}`, icon: FiDollarSign, trend: 12.5, color: 'text-cyan-400' },
        { title: 'Total Bookings', value: stats.bookings || 0, icon: FiShoppingBag, trend: 8.2, color: 'text-purple-400' },
        { title: 'Active Users', value: stats.users || 0, icon: FiUsers, trend: -2.4, color: 'text-pink-400' },
        { title: 'Active Trips', value: stats.trips || 0, icon: FiMapPin, trend: 5.0, color: 'text-amber-400' }, // Added icon import below if needed
    ];

    // Need to add FiMapPin to imports if not present, let's just use what we imported for now.
    // Actually I missed importing FiMapPin above, fixing it in the file content.

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card, idx) => (
                <StatCard key={idx} {...card} delay={idx * 0.1} />
            ))}
        </div>
    );
};
export default StatsGrid;
