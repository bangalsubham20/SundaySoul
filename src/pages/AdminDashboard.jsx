import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiBarChart2, FiUsers, FiCalendar, FiDollarSign, FiLogOut, FiSearch, FiFilter, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [trips, setTrips] = useState([
    {
      id: 1,
      name: 'Winter Spiti Valley',
      destination: 'Spiti Valley',
      price: 21150,
      duration: 8,
      startDate: '2025-01-15',
      status: 'active',
      bookings: 12,
      totalSeats: 16,
      revenue: 253800,
      difficulty: 'Moderate'
    },
    {
      id: 2,
      name: 'Leh Ladakh Adventure',
      destination: 'Ladakh',
      price: 34650,
      duration: 7,
      startDate: '2025-02-20',
      status: 'active',
      bookings: 8,
      totalSeats: 14,
      revenue: 277200,
      difficulty: 'Hard'
    },
    {
      id: 3,
      name: 'Kerala Backpacking',
      destination: 'Kerala',
      price: 16650,
      duration: 6,
      startDate: '2025-03-10',
      status: 'draft',
      bookings: 0,
      totalSeats: 20,
      revenue: 0,
      difficulty: 'Easy'
    }
  ]);

  const [bookings, setBookings] = useState([
    { id: 1, userName: 'John Doe', userEmail: 'john@example.com', tripName: 'Winter Spiti Valley', date: '2024-12-01', status: 'confirmed', amount: 42300 },
    { id: 2, userName: 'Jane Smith', userEmail: 'jane@example.com', tripName: 'Leh Ladakh Adventure', date: '2024-11-20', status: 'pending', amount: 34650 },
    { id: 3, userName: 'Mike Johnson', userEmail: 'mike@example.com', tripName: 'Kerala Backpacking', date: '2024-10-15', status: 'completed', amount: 49950 },
    { id: 4, userName: 'Sarah Williams', userEmail: 'sarah@example.com', tripName: 'Winter Spiti Valley', date: '2024-12-05', status: 'confirmed', amount: 42300 },
    { id: 5, userName: 'Tom Brown', userEmail: 'tom@example.com', tripName: 'Leh Ladakh Adventure', date: '2024-11-25', status: 'confirmed', amount: 34650 }
  ]);

  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2024-01-15', bookings: 3, status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2024-02-20', bookings: 2, status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', joinDate: '2024-03-10', bookings: 5, status: 'active' }
  ]);

  const [newTrip, setNewTrip] = useState({
    name: '', destination: '', price: '', duration: '', startDate: '', totalSeats: '', difficulty: 'Moderate'
  });

  const totalTrips = trips.length;
  const activeTrips = trips.filter(t => t.status === 'active').length;
  const totalBookings = bookings.length;
  const totalRevenue = trips.reduce((sum, t) => sum + t.revenue, 0);
  const totalUsers = users.length;

  const handleAddTrip = () => {
    if (newTrip.name && newTrip.destination && newTrip.price) {
      const trip = {
        id: trips.length + 1,
        ...newTrip,
        price: parseInt(newTrip.price),
        duration: parseInt(newTrip.duration),
        totalSeats: parseInt(newTrip.totalSeats),
        status: 'draft',
        bookings: 0,
        revenue: 0
      };
      setTrips([...trips, trip]);
      setNewTrip({ name: '', destination: '', price: '', duration: '', startDate: '', totalSeats: '', difficulty: 'Moderate' });
      setShowModal(null);
    }
  };

  const handleDeleteTrip = (id) => {
    if (window.confirm('Delete this trip?')) {
      setTrips(trips.filter(t => t.id !== id));
    }
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm('Cancel this booking?')) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  const handleUpdateBookingStatus = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'from-green-500/10 to-green-600/10 border-green-500/30 text-green-300',
      draft: 'from-yellow-500/10 to-yellow-600/10 border-yellow-500/30 text-yellow-300',
      pending: 'from-orange-500/10 to-orange-600/10 border-orange-500/30 text-orange-300',
      confirmed: 'from-blue-500/10 to-blue-600/10 border-blue-500/30 text-blue-300',
      completed: 'from-purple-500/10 to-purple-600/10 border-purple-500/30 text-purple-300',
      cancelled: 'from-red-500/10 to-red-600/10 border-red-500/30 text-red-300'
    };
    return colors[status] || colors.pending;
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl hover:border-white/20 transition-all"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm mb-1">{label}</p>
          <p className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${color}`}>
            {value}
          </p>
        </div>
        <Icon size={32} className={`${color.split(' ')[0]}`} />
      </div>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Animated Background */}
      <motion.div className="fixed -top-96 -right-96 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-600/20 via-indigo-600/15 to-transparent blur-3xl -z-10"
        animate={{ y: [0, 60, 0] }}
        transition={{ duration: 12, repeat: Infinity }} />
      <motion.div className="fixed -bottom-96 -left-96 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-transparent blur-3xl -z-10"
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-2xl sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
          >
            ⚙️ Admin Dashboard
          </motion.h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => navigate('/')} className="bg-red-500/20 border border-red-500/30 text-red-300">
              <FiLogOut className="inline mr-2" size={18} />
              Logout
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-6 mb-10 border-b border-white/10 overflow-x-auto"
        >
          {[
            { id: 'dashboard', label: 'Dashboard', icon: FiBarChart2 },
            { id: 'trips', label: 'Trips', icon: FiCalendar },
            { id: 'bookings', label: 'Bookings', icon: FiUsers },
            { id: 'users', label: 'Users', icon: FiUsers }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ y: -2 }}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 font-bold capitalize whitespace-nowrap flex items-center gap-2 transition ${
                  activeTab === tab.id
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 border-b-2 border-purple-500'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <Icon size={18} /> {tab.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Dashboard Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <motion.div
                variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
              >
                <StatCard icon={FiCalendar} label="Total Trips" value={totalTrips} color="from-orange-400 to-pink-400" />
                <StatCard icon={FiEye} label="Active Trips" value={activeTrips} color="from-green-400 to-emerald-400" />
                <StatCard icon={FiUsers} label="Total Bookings" value={totalBookings} color="from-blue-400 to-cyan-400" />
                <StatCard icon={FiUsers} label="Total Users" value={totalUsers} color="from-purple-400 to-indigo-400" />
                <StatCard icon={FiDollarSign} label="Total Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} color="from-yellow-400 to-orange-400" />
              </motion.div>

              {/* Analytics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Recent Bookings</h2>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {bookings.slice(0, 5).map((booking, idx) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.05 }}
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/8 transition-all"
                      >
                        <div className="flex-1">
                          <p className="font-bold text-white text-sm">{booking.userName}</p>
                          <p className="text-slate-400 text-xs">{booking.tripName}</p>
                        </div>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-lg bg-gradient-to-r ${getStatusColor(booking.status)} border`}
                        >
                          {booking.status}
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Top Trips */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Top Performing Trips</h2>
                  <div className="space-y-3">
                    {trips
                      .sort((a, b) => b.revenue - a.revenue)
                      .slice(0, 3)
                      .map((trip, idx) => (
                        <motion.div
                          key={trip.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.05 }}
                          className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/8 transition-all"
                        >
                          <div className="flex-1">
                            <p className="font-bold text-white text-sm">{trip.name}</p>
                            <p className="text-slate-400 text-xs">{trip.bookings} bookings • {trip.totalSeats} seats</p>
                          </div>
                          <p className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
                            ₹{trip.revenue.toLocaleString()}
                          </p>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Trips Tab */}
          {activeTab === 'trips' && (
            <motion.div
              key="trips"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search trips..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal('addTrip')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <FiPlus size={18} /> Add Trip
                </motion.button>
              </div>

              {/* Add Trip Modal */}
              <AnimatePresence>
                {showModal === 'addTrip' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="backdrop-blur-xl bg-slate-900/95 border border-white/10 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl"
                    >
                      <h2 className="text-3xl font-bold text-white mb-6">Add New Trip</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {[
                          { key: 'name', placeholder: 'Trip Name' },
                          { key: 'destination', placeholder: 'Destination' },
                          { key: 'price', placeholder: 'Price (₹)', type: 'number' },
                          { key: 'duration', placeholder: 'Duration (days)', type: 'number' },
                          { key: 'startDate', placeholder: 'Start Date', type: 'date' },
                          { key: 'totalSeats', placeholder: 'Total Seats', type: 'number' }
                        ].map(field => (
                          <input
                            key={field.key}
                            type={field.type || 'text'}
                            placeholder={field.placeholder}
                            value={newTrip[field.key]}
                            onChange={(e) => setNewTrip({ ...newTrip, [field.key]: e.target.value })}
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <Button fullWidth onClick={handleAddTrip}>Add Trip</Button>
                        <Button fullWidth onClick={() => setShowModal(null)} className="bg-white/10 border border-white/20">Cancel</Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Trips Table */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/10 border-b border-white/10">
                      <tr>
                        {['Trip Name', 'Destination', 'Price', 'Start Date', 'Bookings', 'Revenue', 'Status', 'Actions'].map(header => (
                          <th key={header} className="px-6 py-4 text-left text-sm font-bold text-slate-300">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {trips.map((trip, idx) => (
                        <motion.tr
                          key={trip.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-white/5 transition-all"
                        >
                          <td className="px-6 py-4 text-sm font-bold text-white">{trip.name}</td>
                          <td className="px-6 py-4 text-sm text-slate-400">{trip.destination}</td>
                          <td className="px-6 py-4 text-sm font-bold text-white">₹{trip.price.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-slate-400">{trip.startDate}</td>
                          <td className="px-6 py-4 text-sm text-white font-semibold">{trip.bookings}/{trip.totalSeats}</td>
                          <td className="px-6 py-4 text-sm font-bold text-orange-400">₹{trip.revenue.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-lg bg-gradient-to-r ${getStatusColor(trip.status)} border`}
                            >
                              {trip.status}
                            </motion.span>
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={() => setSelectedItem(trip)}
                              className="text-blue-400 hover:text-blue-300 transition"
                            >
                              <FiEdit2 size={18} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={() => handleDeleteTrip(trip.id)}
                              className="text-red-400 hover:text-red-300 transition"
                            >
                              <FiTrash2 size={18} />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">Manage Bookings</h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/10 border-b border-white/10">
                      <tr>
                        {['Booking ID', 'User', 'Email', 'Trip', 'Date', 'Amount', 'Status', 'Actions'].map(header => (
                          <th key={header} className="px-6 py-4 text-left text-sm font-bold text-slate-300">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {bookings.map((booking, idx) => (
                        <motion.tr
                          key={booking.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-white/5 transition-all"
                        >
                          <td className="px-6 py-4 text-sm font-bold text-white">BK{booking.id}</td>
                          <td className="px-6 py-4 text-sm text-white">{booking.userName}</td>
                          <td className="px-6 py-4 text-sm text-slate-400">{booking.userEmail}</td>
                          <td className="px-6 py-4 text-sm text-slate-400">{booking.tripName}</td>
                          <td className="px-6 py-4 text-sm text-slate-400">{booking.date}</td>
                          <td className="px-6 py-4 text-sm font-bold text-orange-400">₹{booking.amount.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <select
                              value={booking.status}
                              onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                              className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-lg bg-gradient-to-r ${getStatusColor(booking.status)} border cursor-pointer`}
                            >
                              {['pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              className="text-blue-400 hover:text-blue-300 transition"
                            >
                              <FiEye size={18} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="text-red-400 hover:text-red-300 transition"
                            >
                              <FiTrash2 size={18} />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">Manage Users</h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {users.map((user, idx) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">
                        {user.name.charAt(0)}
                      </div>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 border border-green-500/30 text-green-300"
                      >
                        {user.status}
                      </motion.span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{user.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{user.email}</p>
                    <div className="flex justify-between text-sm text-slate-400 mb-4">
                      <span>Member: {user.joinDate}</span>
                      <span>Bookings: {user.bookings}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" fullWidth className="bg-white/10 border border-white/20">View</Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AdminDashboard;
