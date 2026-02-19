import React from 'react';
import { motion } from 'framer-motion';
import {
    FiBarChart2, FiCalendar, FiMapPin, FiUsers, FiGift, FiLogOut, FiSettings, FiUser
} from 'react-icons/fi';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Overview', icon: FiBarChart2 },
        { id: 'bookings', label: 'Bookings', icon: FiCalendar },
        { id: 'trips', label: 'Trips Management', icon: FiMapPin },
        { id: 'users', label: 'Users', icon: FiUsers },
        { id: 'offers', label: 'Offers & Promos', icon: FiGift },
    ];

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-teal-950/80 backdrop-blur-2xl border-r border-white/10 flex flex-col z-50 shadow-2xl shadow-black/50"
        >
            <div className="p-8 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                <h1 className="text-3xl font-display font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 tracking-tight">
                    SundaySoul
                </h1>
                <p className="text-xs text-cyan-400/80 mt-2 uppercase tracking-[0.2em] font-bold">Admin Panel</p>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                                ? 'bg-gradient-to-r from-cyan-500/10 to-teal-500/10 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)] border border-cyan-500/20'
                                : 'text-grey-400 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-teal-400 rounded-r-full shadow-[0_0_10px_#22d3ee]"
                                />
                            )}
                            <Icon size={20} className={`transition-colors duration-300 ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-grey-500 group-hover:text-cyan-300'}`} />
                            <span className={`font-medium text-sm tracking-wide ${isActive ? 'text-cyan-50' : ''}`}>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-2 bg-black/20">
                <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-teal-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                        {user.fullName?.charAt(0) || <FiUser />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{user.fullName || 'Admin'}</p>
                        <p className="text-xs text-grey-400 truncate">{user.email || 'admin@sundaysoul.com'}</p>
                    </div>
                </div>

                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20"
                >
                    <FiLogOut size={20} />
                    <span className="font-medium text-sm">Sign Out</span>
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;
