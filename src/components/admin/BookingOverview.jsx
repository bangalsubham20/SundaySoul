import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const BookingOverview = ({ bookings }) => {
    // Process real data if available
    const data = bookings ? [
        { name: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: '#10b981' }, // Emerald-500
        { name: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: '#f59e0b' },   // Amber-500
        { name: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, color: '#ef4444' }, // Red-500
        { name: 'Completed', value: bookings.filter(b => b.status === 'completed').length, color: '#06b6d4' }, // Cyan-500
    ] : [
        { name: 'Confirmed', value: 45, color: '#10b981' },
        { name: 'Pending', value: 25, color: '#f59e0b' },
        { name: 'Cancelled', value: 10, color: '#ef4444' },
        { name: 'Completed', value: 20, color: '#06b6d4' },
    ];

    const activeData = data.filter(d => d.value > 0);
    const totalBookings = activeData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="bg-teal-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl h-[400px] shadow-xl relative">
            <h3 className="text-xl font-bold text-white mb-6">Booking Status</h3>
            <div className="h-[300px] w-full min-w-[300px] relative">
                <ResponsiveContainer width="99%" height="100%">
                    <PieChart>
                        <Pie
                            data={activeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={110}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {activeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#134e4a', borderColor: '#ffffff20', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                    <span className="text-4xl font-black text-white">{totalBookings}</span>
                    <span className="text-xs text-grey-400 uppercase tracking-widest">Total</span>
                </div>
            </div>
        </div>
    );
};

export default BookingOverview;
