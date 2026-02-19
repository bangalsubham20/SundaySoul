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

    // Filter out zero values
    const activeData = data.filter(d => d.value > 0);

    return (
        <div className="bg-teal-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl h-[400px]">
            <h3 className="text-xl font-bold text-white mb-6">Booking Status</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={activeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {activeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BookingOverview;
