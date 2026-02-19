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

    return (
        <div className="bg-teal-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl h-full">
            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-6">
                {items.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-4"
                    >
                        <img src={item.avatar} alt={item.user} className="w-10 h-10 rounded-full border border-white/10" />
                        <div>
                            <p className="text-sm text-white">
                                <span className="font-bold">{item.user}</span>{' '}
                                <span className="text-grey-400">
                                    {item.action === 'booked' && 'booked a trip to'}
                                    {item.action === 'registered' && 'joined the platform'}
                                    {item.action === 'reviewed' && 'reviewed'}
                                    {item.action === 'cancelled' && 'cancelled booking for'}
                                </span>{' '}
                                <span className="font-semibold text-cyan-400">{item.target}</span>
                            </p>
                            <p className="text-xs text-grey-500 mt-1">{item.time}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;
