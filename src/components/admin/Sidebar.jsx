import React from 'react';
import { motion } from 'framer-motion';
import {
    FiBarChart2, FiCalendar, FiMapPin, FiUsers, FiGift, FiLogOut, FiSettings
} from 'react-icons/fi';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Overview', icon: FiBarChart2 },
        { id: 'bookings', label: 'Bookings', icon: FiCalendar },
        { id: 'trips', label: 'Trips Management', icon: FiMapPin },
        { id: 'users', label: 'Users', icon: FiUsers },
        { id: 'offers', label: 'Offers & Promos', icon: FiGift },
    ];

    return (
        <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-teal-900/40 backdrop-blur-xl border-r border-white/10 flex flex-col z-50 shadow-2xl"
        >
            <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-display font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
                    SundaySoul
                </h1>
                <p className="text-xs text-grey-400 mt-1 uppercase tracking-wider font-bold">Admin Panel</p>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                                    ? 'bg-gradient-to-r from-cyan-600/20 to-teal-600/20 text-white shadow-lg shadow-cyan-900/20'
                                    : 'text-grey-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute left-0 w-1 h-8 bg-cyan-400 rounded-r-full"
                                />
                            )}
                            <Icon size={20} className={isActive ? 'text-cyan-400' : 'text-grey-500 group-hover:text-cyan-400 transition-colors'} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-grey-400 hover:text-white hover:bg-white/5 transition-colors">
                    <FiSettings size={20} />
                    <span className="font-medium text-sm">Settings</span>
                </button>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                    <FiLogOut size={20} />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;
