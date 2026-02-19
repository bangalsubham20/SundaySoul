import React from 'react';
import { motion } from 'framer-motion';

const RecentActivity = ({ activities }) => {
    // Mock data if none provided
    const items = activities || [
        { id: 1, user: 'Subham Bangal', action: 'booked', target: 'Manali Chill Trip', time: '2 hours ago', avatar: 'https://ui-avatars.com/api/?name=Subham+Bangal&background=0D9488&color=fff' },
        { id: 2, user: 'Sumit Kumar', action: 'registered', target: '', time: '5 hours ago', avatar: 'https://ui-avatars.com/api/?name=Sumit+Kumar&background=0D9488&color=fff' },
        { id: 3, user: 'Priya Sharma', action: 'reviewed', target: 'Kasol Trek', time: '1 day ago', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=0D9488&color=fff' },
        { id: 4, user: 'Rahul Verma', action: 'cancelled', target: 'Goa Beach Party', time: '2 days ago', avatar: 'https://ui-avatars.com/api/?name=Rahul+Verma&background=0D9488&color=fff' },
    ];

    const getActionColor = (action) => {
        switch (action) {
            case 'booked': return 'bg-emerald-500 shadow-emerald-500/50';
            case 'registered': return 'bg-cyan-500 shadow-cyan-500/50';
            case 'reviewed': return 'bg-amber-500 shadow-amber-500/50';
            case 'cancelled': return 'bg-red-500 shadow-red-500/50';
            default: return 'bg-grey-500';
        }
    };

    return (
        <div className="bg-teal-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl h-full shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="relative border-l border-white/10 ml-3 space-y-8">
                {items.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative pl-8"
                    >
                        {/* Timeline Dot */}
                        <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full shadow-[0_0_10px] ${getActionColor(item.action)} ring-4 ring-teal-900`} />

                        <div className="flex items-start gap-4 p-3 -mt-3 rounded-xl hover:bg-white/5 transition-colors duration-300">
                            <div className="w-10 h-10 rounded-full border border-white/10 shadow-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-sm font-bold text-white">
                                {item.user.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm text-white leading-relaxed">
                                    <span className="font-bold hover:text-cyan-400 transition-colors cursor-pointer">{item.user}</span>{' '}
                                    <span className="text-grey-400 text-sm">
                                        {item.action === 'booked' && 'booked a trip to'}
                                        {item.action === 'registered' && 'joined the platform'}
                                        {item.action === 'reviewed' && 'reviewed'}
                                        {item.action === 'cancelled' && 'cancelled booking for'}
                                    </span>{' '}
                                    {item.target && <span className="font-semibold text-cyan-400">{item.target}</span>}
                                </p>
                                <p className="text-xs text-grey-500 mt-1 font-medium">{item.time}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;
