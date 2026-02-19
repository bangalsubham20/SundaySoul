import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const RevenueChart = ({ data }) => {
    // Mock data if none provided
    const chartData = data || [
        { name: 'Jan', revenue: 4000 },
        { name: 'Feb', revenue: 3000 },
        { name: 'Mar', revenue: 5000 },
        { name: 'Apr', revenue: 4500 },
        { name: 'May', revenue: 6000 },
        { name: 'Jun', revenue: 7500 },
        { name: 'Jul', revenue: 8000 },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-teal-900 border border-white/10 p-3 rounded-lg shadow-xl">
                    <p className="text-grey-400 text-xs mb-1">{label}</p>
                    <p className="text-cyan-400 font-bold">
                        ₹{payload[0].value.toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-teal-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl h-[400px]">
            <h3 className="text-xl font-bold text-white mb-6">Revenue Overview</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#9ca3af"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#9ca3af"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `₹${value / 1000}k`}
                            dx={-10}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#06b6d4', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#06b6d4"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueChart;
