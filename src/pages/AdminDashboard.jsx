import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { 
  FiEdit2, FiTrash2, FiPlus, FiEye, FiBarChart2, FiUsers, FiCalendar, 
  FiDollarSign, FiLogOut, FiSearch, FiFilter, FiX, FiCheck, FiAlertCircle,
  FiDownload, FiMail, FiPhone, FiMapPin, FiTag, FiPercent, FiGift
} from 'react-icons/fi';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // ========== TRIPS DATA ==========
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
    }
  ]);

  // ========== BOOKINGS DATA ==========
  const [bookings, setBookings] = useState([
    {
      id: 1,
      bookingId: 'BK001',
      userName: 'Rahul Sharma',
      userEmail: 'rahul@example.com',
      userPhone: '+91 98765 43210',
      tripName: 'Winter Spiti Valley',
      tripId: 1,
      numberOfTravelers: 2,
      bookingDate: '2024-12-01',
      tripDate: '2025-01-15',
      status: 'confirmed',
      amount: 42300,
      paidAmount: 42300,
      paymentMethod: 'full',
      promoCode: 'FIRST10',
      discount: 4700,
      specialRequirements: 'Vegetarian meals',
      emergencyContact: '+91 98765 00000',
      emergencyName: 'Priya Sharma'
    },
    {
      id: 2,
      bookingId: 'BK002',
      userName: 'Priya Mehta',
      userEmail: 'priya@example.com',
      userPhone: '+91 98765 43211',
      tripName: 'Leh Ladakh Adventure',
      tripId: 2,
      numberOfTravelers: 1,
      bookingDate: '2024-11-20',
      tripDate: '2025-02-20',
      status: 'pending',
      amount: 34650,
      paidAmount: 17325,
      paymentMethod: 'partial',
      promoCode: null,
      discount: 0,
      specialRequirements: null,
      emergencyContact: '+91 98765 00001',
      emergencyName: 'Amit Mehta'
    },
    {
      id: 3,
      bookingId: 'BK003',
      userName: 'Amit Patel',
      userEmail: 'amit@example.com',
      userPhone: '+91 98765 43212',
      tripName: 'Kerala Backpacking',
      tripId: 3,
      numberOfTravelers: 3,
      bookingDate: '2024-10-15',
      tripDate: '2024-11-10',
      status: 'completed',
      amount: 49950,
      paidAmount: 49950,
      paymentMethod: 'full',
      promoCode: 'SAVE2000',
      discount: 2000,
      specialRequirements: 'Need wheelchair access',
      emergencyContact: '+91 98765 00002',
      emergencyName: 'Neha Patel'
    }
  ]);

  // ========== OFFERS/PROMO CODES DATA ==========
  const [offers, setOffers] = useState([
    {
      id: 1,
      code: 'FIRST10',
      description: 'Get 10% off on your first booking',
      discount: 10,
      type: 'percentage',
      minAmount: 10000,
      maxDiscount: 5000,
      validFrom: '2025-01-01',
      validUntil: '2025-12-31',
      usageLimit: 100,
      usedCount: 23,
      active: true,
      applicableTrips: 'all'
    },
    {
      id: 2,
      code: 'EARLY15',
      description: '15% off for early bird bookings',
      discount: 15,
      type: 'percentage',
      minAmount: 20000,
      maxDiscount: 8000,
      validFrom: '2025-01-01',
      validUntil: '2025-03-31',
      usageLimit: 50,
      usedCount: 12,
      active: true,
      applicableTrips: 'all'
    },
    {
      id: 3,
      code: 'SAVE2000',
      description: 'Flat ₹2000 discount',
      discount: 2000,
      type: 'fixed',
      minAmount: 15000,
      maxDiscount: 2000,
      validFrom: '2025-01-01',
      validUntil: '2025-12-31',
      usageLimit: 200,
      usedCount: 67,
      active: true,
      applicableTrips: 'all'
    },
    {
      id: 4,
      code: 'WINTER25',
      description: '25% off on winter trips',
      discount: 25,
      type: 'percentage',
      minAmount: 25000,
      maxDiscount: 10000,
      validFrom: '2024-12-01',
      validUntil: '2025-02-28',
      usageLimit: 30,
      usedCount: 18,
      active: true,
      applicableTrips: 'selected'
    }
  ]);

  const [newOffer, setNewOffer] = useState({
    code: '',
    description: '',
    discount: '',
    type: 'percentage',
    minAmount: '',
    maxDiscount: '',
    validFrom: '',
    validUntil: '',
    usageLimit: '',
    applicableTrips: 'all'
  });

  // Calculate stats
  const totalTrips = trips.length;
  const activeTrips = trips.filter(t => t.status === 'active').length;
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const totalOffers = offers.filter(o => o.active).length;

  // ========== BOOKING HANDLERS ==========
  const handleViewBooking = (booking) => {
    setSelectedItem(booking);
    setShowModal('viewBooking');
  };

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, status: newStatus } : b
    ));
  };

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.filter(b => b.id !== bookingId));
    }
  };

  const handleExportBookings = () => {
    // Export to CSV
    const headers = ['Booking ID', 'Customer', 'Trip', 'Date', 'Travelers', 'Amount', 'Status'];
    const csvData = bookings.map(b => [
      b.bookingId,
      b.userName,
      b.tripName,
      b.bookingDate,
      b.numberOfTravelers,
      b.amount,
      b.status
    ]);
    
    const csv = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // ========== OFFER HANDLERS ==========
  const handleAddOffer = () => {
    if (newOffer.code && newOffer.description && newOffer.discount) {
      const offer = {
        id: offers.length + 1,
        ...newOffer,
        discount: parseFloat(newOffer.discount),
        minAmount: parseInt(newOffer.minAmount) || 0,
        maxDiscount: parseInt(newOffer.maxDiscount) || 0,
        usageLimit: parseInt(newOffer.usageLimit) || 999,
        usedCount: 0,
        active: true
      };
      setOffers([...offers, offer]);
      setNewOffer({
        code: '',
        description: '',
        discount: '',
        type: 'percentage',
        minAmount: '',
        maxDiscount: '',
        validFrom: '',
        validUntil: '',
        usageLimit: '',
        applicableTrips: 'all'
      });
      setShowModal(null);
    }
  };

  const handleToggleOffer = (offerId) => {
    setOffers(offers.map(o => 
      o.id === offerId ? { ...o, active: !o.active } : o
    ));
  };

  const handleDeleteOffer = (offerId) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      setOffers(offers.filter(o => o.id !== offerId));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'from-green-500/10 to-green-600/10 border-green-500/30 text-green-300',
      pending: 'from-yellow-500/10 to-yellow-600/10 border-yellow-500/30 text-yellow-300',
      confirmed: 'from-blue-500/10 to-blue-600/10 border-blue-500/30 text-blue-300',
      completed: 'from-purple-500/10 to-purple-600/10 border-purple-500/30 text-purple-300',
      cancelled: 'from-red-500/10 to-red-600/10 border-red-500/30 text-red-300'
    };
    return colors[status] || colors.pending;
  };

  const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl hover:border-white/20 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <Icon size={32} className={`${color}`} />
        {trend && (
          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">
            +{trend}%
          </span>
        )}
      </div>
      <p className="text-slate-400 text-sm mb-1">{label}</p>
      <p className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${color}`}>
        {value}
      </p>
    </motion.div>
  );

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.tripName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            ⚙️ Admin Dashboard
          </h1>
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
          className="flex gap-6 mb-10 border-b border-white/10 overflow-x-auto"
        >
          {[
            { id: 'dashboard', label: 'Dashboard', icon: FiBarChart2 },
            { id: 'bookings', label: 'Bookings', icon: FiCalendar },
            { id: 'offers', label: 'Offers & Promo', icon: FiGift },
            { id: 'trips', label: 'Trips', icon: FiMapPin },
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={FiCalendar} label="Total Bookings" value={totalBookings} color="from-orange-400 to-pink-400" trend={12} />
                <StatCard icon={FiCheck} label="Confirmed" value={confirmedBookings} color="from-green-400 to-emerald-400" />
                <StatCard icon={FiDollarSign} label="Total Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} color="from-yellow-400 to-orange-400" trend={8} />
                <StatCard icon={FiTag} label="Active Offers" value={totalOffers} color="from-purple-400 to-indigo-400" />
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <Card variant="elevated" className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Recent Bookings</h2>
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((booking, idx) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/8 transition-all"
                      >
                        <div>
                          <p className="font-bold text-white">{booking.userName}</p>
                          <p className="text-slate-400 text-sm">{booking.tripName}</p>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-lg bg-gradient-to-r ${getStatusColor(booking.status)} border`}>
                          {booking.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </Card>

                {/* Revenue Chart Placeholder */}
                <Card variant="gradient" className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Revenue Overview</h2>
                  <div className="h-64 flex items-center justify-center bg-white/5 rounded-lg">
                    <p className="text-slate-400">Chart visualization here</p>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* ========== BOOKINGS TAB ========== */}
          {activeTab === 'bookings' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Search & Filters */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <Button onClick={handleExportBookings} variant="secondary">
                    <FiDownload className="inline mr-2" size={18} />
                    Export
                  </Button>
                </div>
              </div>

              {/* Bookings Table */}
              <Card variant="elevated" className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/10 border-b border-white/10">
                      <tr>
                        {['Booking ID', 'Customer', 'Trip', 'Travelers', 'Date', 'Amount', 'Status', 'Actions'].map(header => (
                          <th key={header} className="px-6 py-4 text-left text-sm font-bold text-slate-300">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredBookings.map((booking, idx) => (
                        <motion.tr
                          key={booking.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-white/5 transition-all"
                        >
                          <td className="px-6 py-4 text-sm font-bold text-purple-400">{booking.bookingId}</td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-white">{booking.userName}</p>
                            <p className="text-xs text-slate-400">{booking.userEmail}</p>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-300">{booking.tripName}</td>
                          <td className="px-6 py-4 text-sm text-white font-semibold">{booking.numberOfTravelers}</td>
                          <td className="px-6 py-4 text-sm text-slate-400">{booking.bookingDate}</td>
                          <td className="px-6 py-4 text-sm font-bold text-orange-400">₹{booking.amount.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <select
                              value={booking.status}
                              onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                              className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-lg bg-gradient-to-r ${getStatusColor(booking.status)} border cursor-pointer`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={() => handleViewBooking(booking)}
                              className="text-blue-400 hover:text-blue-300 transition"
                              title="View Details"
                            >
                              <FiEye size={18} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="text-red-400 hover:text-red-300 transition"
                              title="Cancel Booking"
                            >
                              <FiTrash2 size={18} />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* View Booking Modal */}
              <AnimatePresence>
                {showModal === 'viewBooking' && selectedItem && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setShowModal(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                      className="backdrop-blur-xl bg-slate-900/95 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-3xl font-bold text-white mb-2">Booking Details</h2>
                          <p className="text-slate-400">ID: {selectedItem.bookingId}</p>
                        </div>
                        <button
                          onClick={() => setShowModal(null)}
                          className="text-slate-400 hover:text-white transition"
                        >
                          <FiX size={24} />
                        </button>
                      </div>

                      <div className="space-y-6">
                        {/* Customer Info */}
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <FiUser /> Customer Information
                          </h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-400">Name</p>
                              <p className="text-white font-semibold">{selectedItem.userName}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Email</p>
                              <p className="text-white font-semibold">{selectedItem.userEmail}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Phone</p>
                              <p className="text-white font-semibold">{selectedItem.userPhone}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Emergency Contact</p>
                              <p className="text-white font-semibold">{selectedItem.emergencyName}</p>
                              <p className="text-slate-500 text-xs">{selectedItem.emergencyContact}</p>
                            </div>
                          </div>
                        </div>

                        {/* Trip Info */}
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <FiMapPin /> Trip Information
                          </h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-400">Trip Name</p>
                              <p className="text-white font-semibold">{selectedItem.tripName}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Trip Date</p>
                              <p className="text-white font-semibold">{selectedItem.tripDate}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Number of Travelers</p>
                              <p className="text-white font-semibold">{selectedItem.numberOfTravelers}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Booking Date</p>
                              <p className="text-white font-semibold">{selectedItem.bookingDate}</p>
                            </div>
                            {selectedItem.specialRequirements && (
                              <div className="col-span-2">
                                <p className="text-slate-400">Special Requirements</p>
                                <p className="text-white">{selectedItem.specialRequirements}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Payment Info */}
                        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
                          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <FiDollarSign /> Payment Information
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-slate-300">Total Amount</span>
                              <span className="text-white font-bold">₹{selectedItem.amount.toLocaleString()}</span>
                            </div>
                            {selectedItem.discount > 0 && (
                              <div className="flex justify-between">
                                <span className="text-green-300">Discount ({selectedItem.promoCode})</span>
                                <span className="text-green-400 font-bold">-₹{selectedItem.discount.toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-slate-300">Paid Amount</span>
                              <span className="text-white font-bold">₹{selectedItem.paidAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300">Payment Method</span>
                              <span className="text-white font-semibold capitalize">{selectedItem.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between pt-3 border-t border-white/10">
                              <span className="text-slate-300">Status</span>
                              <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-lg bg-gradient-to-r ${getStatusColor(selectedItem.status)} border`}>
                                {selectedItem.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Button fullWidth variant="secondary" onClick={() => setShowModal(null)}>
                            Close
                          </Button>
                          <Button fullWidth>
                            <FiMail className="inline mr-2" />
                            Send Email
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ========== OFFERS TAB ========== */}
          {activeTab === 'offers' && (
            <motion.div
              key="offers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Promo Codes & Offers</h2>
                <Button onClick={() => setShowModal('addOffer')}>
                  <FiPlus className="inline mr-2" size={18} />
                  Create Offer
                </Button>
              </div>

              {/* Offers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offers.map((offer, idx) => (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card variant="gradient" className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                              {offer.code}
                            </h3>
                            {offer.active ? (
                              <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-bold rounded-full">
                                Active
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold rounded-full">
                                Inactive
                              </span>
                            )}
                          </div>
                          <p className="text-slate-300 mb-3">{offer.description}</p>
                          
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-slate-400">Discount</p>
                              <p className="text-white font-bold">
                                {offer.type === 'percentage' ? `${offer.discount}%` : `₹${offer.discount}`}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-400">Min Amount</p>
                              <p className="text-white font-bold">₹{offer.minAmount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Usage</p>
                              <p className="text-white font-bold">{offer.usedCount}/{offer.usageLimit}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Valid Until</p>
                              <p className="text-white font-bold">{offer.validUntil}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-white/10">
                        <Button
                          size="sm"
                          variant={offer.active ? 'danger' : 'success'}
                          onClick={() => handleToggleOffer(offer.id)}
                          fullWidth
                        >
                          {offer.active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleDeleteOffer(offer.id)}
                        >
                          <FiTrash2 size={16} />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Add Offer Modal */}
              <AnimatePresence>
                {showModal === 'addOffer' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setShowModal(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                      className="backdrop-blur-xl bg-slate-900/95 border border-white/10 rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
                    >
                      <h2 className="text-3xl font-bold text-white mb-6">Create New Offer</h2>
                      
                      <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                              Promo Code *
                            </label>
                            <input
                              type="text"
                              value={newOffer.code}
                              onChange={(e) => setNewOffer({...newOffer, code: e.target.value.toUpperCase()})}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="e.g., SUMMER20"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                              Discount Type *
                            </label>
                            <select
                              value={newOffer.type}
                              onChange={(e) => setNewOffer({...newOffer, type: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="percentage">Percentage (%)</option>
                              <option value="fixed">Fixed Amount (₹)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-2">
                            Description *
                          </label>
                          <input
                            type="text"
                            value={newOffer.description}
                            onChange={(e) => setNewOffer({...newOffer, description: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Brief description of the offer"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                              Discount Value *
                            </label>
                            <input
                              type="number"
                              value={newOffer.discount}
                              onChange={(e) => setNewOffer({...newOffer, discount: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder={newOffer.type === 'percentage' ? 'e.g., 10' : 'e.g., 2000'}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                              Min Booking Amount
                            </label>
                            <input
                              type="number"
                              value={newOffer.minAmount}
                              onChange={(e) => setNewOffer({...newOffer, minAmount: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="e.g., 10000"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                              Valid From
                            </label>
                            <input
                              type="date"
                              value={newOffer.validFrom}
                              onChange={(e) => setNewOffer({...newOffer, validFrom: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                              Valid Until
                            </label>
                            <input
                              type="date"
                              value={newOffer.validUntil}
                              onChange={(e) => setNewOffer({...newOffer, validUntil: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-2">
                            Usage Limit
                          </label>
                          <input
                            type="number"
                            value={newOffer.usageLimit}
                            onChange={(e) => setNewOffer({...newOffer, usageLimit: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="e.g., 100"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button fullWidth onClick={handleAddOffer}>
                          Create Offer
                        </Button>
                        <Button fullWidth variant="secondary" onClick={() => setShowModal(null)}>
                          Cancel
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AdminDashboard;
