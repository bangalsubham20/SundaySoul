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
import tripService from '../services/tripService';
import bookingService from '../services/bookingService';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // ========== TRIPS DATA ==========
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [tripsData, bookingsData] = await Promise.all([
        tripService.getAllTrips(),
        bookingService.getAllBookings()
      ]);

      // Normalize Trips Data
      const normalizedTrips = tripsData.map(trip => ({
        ...trip,
        status: trip.active ? 'active' : 'inactive'
      }));
      setTrips(normalizedTrips);

      // Normalize Bookings Data
      const normalizedBookings = bookingsData.map(booking => ({
        ...booking,
        id: booking.id,
        bookingId: booking.id?.toString() || '',
        userName: booking.user?.fullName || 'Unknown User',
        userEmail: booking.user?.email || '',
        userPhone: booking.user?.phone || '',
        tripName: booking.trip?.name || 'Unknown Trip',
        tripId: booking.trip?.id,
        amount: booking.totalPrice,
        date: booking.bookingDate,
        status: booking.status ? booking.status.toLowerCase() : 'pending',
        travelers: booking.numTravelers
      }));
      setBookings(normalizedBookings);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ========== BOOKINGS DATA ==========
  const [bookings, setBookings] = useState([]);

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

  // ========== TRIP HANDLERS ==========
  const [tripForm, setTripForm] = useState({
    name: '', destination: '', price: '', duration: '', startDate: '',
    status: 'active', groupSize: '', difficulty: 'Moderate',
    description: '', image: '', highlights: '', itinerary: '', inclusions: '', exclusions: ''
  });

  const handleEditTrip = (trip) => {
    setTripForm({
      ...trip,
      startDate: trip.startDate ? trip.startDate.split('T')[0] : '',
      bookings: undefined // Don't send bookings back
    });
    setSelectedItem(trip);
    setShowModal('editTrip');
  };

  const handleDeleteTrip = async (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await tripService.deleteTrip(tripId);
        setTrips(trips.filter(t => t.id !== tripId));
      } catch (error) {
        console.error('Failed to delete trip', error);
        alert('Failed to delete trip');
      }
    }
  };

  const handleSaveTrip = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...tripForm,
        startDate: new Date(tripForm.startDate).toISOString(),
        endDate: new Date(new Date(tripForm.startDate).setDate(new Date(tripForm.startDate).getDate() + parseInt(tripForm.duration))).toISOString(),
        price: parseFloat(tripForm.price),
        duration: parseInt(tripForm.duration),
        groupSize: parseInt(tripForm.groupSize),
        availableSeats: parseInt(tripForm.groupSize), // Reset available seats on create/update logic simplification
        active: tripForm.status === 'active', // Map string status back to boolean
        bookings: [], // Ensure bookings are not overwritten with invalid data
        rating: 0.0,
        reviews: 0,
        tripReviews: []
      };

      // Remove status string from payload as backend expects 'active' boolean
      delete payload.status;

      if (selectedItem) {
        // Update
        const response = await tripService.updateTrip(selectedItem.id, payload);
        // Normalize response before updating state
        const updatedTrip = { ...response, status: response.active ? 'active' : 'inactive' };
        setTrips(trips.map(t => t.id === selectedItem.id ? updatedTrip : t));
      } else {
        // Create
        const response = await tripService.createTrip(payload);
        // Normalize response
        const newTrip = { ...response, status: response.active ? 'active' : 'inactive' };
        setTrips([...trips, newTrip]);
      }
      setShowModal(null);
      setSelectedItem(null);
      // Reset form
      setTripForm({
        name: '', destination: '', price: '', duration: '', startDate: '',
        status: 'active', groupSize: '', difficulty: 'Moderate',
        description: '', image: ''
      });
    } catch (error) {
      console.error('Failed to save trip', error);
      alert('Failed to save trip');
    }
  };

  const openAddTripModal = () => {
    setSelectedItem(null);
    setTripForm({
      name: '', destination: '', price: '', duration: '', startDate: '',
      status: 'active', groupSize: '', difficulty: 'Moderate',
      description: '', image: ''
    });
    setShowModal('addTrip');
  };

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
      confirmed: 'from-cyan-500/10 to-cyan-600/10 border-cyan-500/30 text-cyan-300',
      completed: 'from-teal-500/10 to-teal-600/10 border-teal-500/30 text-teal-300',
      cancelled: 'from-red-500/10 to-red-600/10 border-red-500/30 text-red-300'
    };
    return colors[status] || colors.pending;
  };

  const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="backdrop-blur-xl bg-teal-900/60 border border-white/10 rounded-2xl p-6 shadow-2xl hover:border-white/20 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <Icon size={32} className={`${color}`} />
        {trend && (
          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">
            +{trend}%
          </span>
        )}
      </div>
      <p className="text-grey-400 text-sm mb-1">{label}</p>
      <p className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${color}`}>
        {value}
      </p>
    </motion.div>
  );

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      String(booking.userName || '').toLowerCase().includes(term) ||
      String(booking.bookingId || '').toLowerCase().includes(term) ||
      String(booking.tripName || '').toLowerCase().includes(term);
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="relative min-h-screen bg-teal-900 text-white overflow-hidden selection:bg-cyan-500 selection:text-teal-900">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-950 via-teal-900 to-black z-0" />
      <motion.div className="fixed -top-96 -right-96 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-cyan-600/10 via-teal-600/10 to-transparent blur-3xl -z-10"
        animate={{ y: [0, 60, 0] }}
        transition={{ duration: 12, repeat: Infinity }} />
      <motion.div className="fixed -bottom-96 -left-96 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-teal-600/10 via-cyan-500/10 to-transparent blur-3xl -z-10"
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-teal-900/80 border-b border-white/10 shadow-2xl sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-4xl font-display font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
            ⚙️ Admin Dashboard
          </h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => navigate('/')} className="bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30">
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
                className={`pb-4 font-bold capitalize whitespace-nowrap flex items-center gap-2 transition ${activeTab === tab.id
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 border-b-2 border-cyan-500'
                  : 'text-grey-400 hover:text-grey-300'
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
                <StatCard icon={FiCalendar} label="Total Bookings" value={totalBookings} color="from-orange-400 to-amber-400" trend={12} />
                <StatCard icon={FiCheck} label="Confirmed" value={confirmedBookings} color="from-green-400 to-emerald-400" />
                <StatCard icon={FiDollarSign} label="Total Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} color="from-cyan-400 to-teal-400" trend={8} />
                <StatCard icon={FiTag} label="Active Offers" value={totalOffers} color="from-purple-400 to-indigo-400" />
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <Card className="p-6 backdrop-blur-xl bg-teal-900/60 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6">Recent Bookings</h2>
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((booking, idx) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between p-4 bg-black/20 border border-white/10 rounded-xl hover:bg-white/5 transition-all"
                      >
                        <div>
                          <p className="font-bold text-white">{booking.userName}</p>
                          <p className="text-grey-400 text-sm">{booking.tripName}</p>
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
                  <div className="h-64 flex items-center justify-center bg-black/20 rounded-lg border border-white/10">
                    <p className="text-grey-400">Chart visualization here</p>
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
                <div className="flex-1 relative w-full">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-grey-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-grey-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 flex-1 md:flex-none"
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
              <Card className="overflow-hidden backdrop-blur-xl bg-teal-900/60 border border-white/10">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-black/20 border-b border-white/10">
                      <tr>
                        {['Booking ID', 'Customer', 'Trip', 'Travelers', 'Date', 'Amount', 'Status', 'Actions'].map(header => (
                          <th key={header} className="px-6 py-4 text-left text-sm font-bold text-grey-300">{header}</th>
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
                          <td className="px-6 py-4 text-sm font-bold text-cyan-400">{booking.bookingId || '-'}</td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-white">{booking.userName || 'Unknown'}</p>
                            <p className="text-xs text-grey-400">{booking.userEmail}</p>
                          </td>
                          <td className="px-6 py-4 text-sm text-grey-300">{booking.tripName || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm text-white font-semibold">{booking.numberOfTravelers || 0}</td>
                          <td className="px-6 py-4 text-sm text-grey-400">{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : '-'}</td>
                          <td className="px-6 py-4 text-sm font-bold text-teal-400">₹{(booking.amount || 0).toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <select
                              value={booking.status || 'pending'}
                              onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                              className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-lg bg-gradient-to-r ${getStatusColor(booking.status || 'pending')} border cursor-pointer`}
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
                              className="text-cyan-400 hover:text-cyan-300 transition"
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
                      className="backdrop-blur-xl bg-teal-900/95 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-3xl font-bold text-white mb-2">Booking Details</h2>
                          <p className="text-grey-400">ID: {selectedItem.bookingId}</p>
                        </div>
                        <button
                          onClick={() => setShowModal(null)}
                          className="text-grey-400 hover:text-white transition"
                        >
                          <FiX size={24} />
                        </button>
                      </div>

                      <div className="space-y-6">
                        {/* Customer Info */}
                        <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
                          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <FiUser /> Customer Information
                          </h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-grey-400">Name</p>
                              <p className="text-white font-semibold">{selectedItem.userName}</p>
                            </div>
                            <div>
                              <p className="text-grey-400">Email</p>
                              <p className="text-white font-semibold">{selectedItem.userEmail}</p>
                            </div>
                            <div>
                              <p className="text-grey-400">Phone</p>
                              <p className="text-white font-semibold">{selectedItem.userPhone}</p>
                            </div>
                            <div>
                              <p className="text-grey-400">Emergency Contact</p>
                              <p className="text-white font-semibold">{selectedItem.emergencyName}</p>
                              <p className="text-grey-500 text-xs">{selectedItem.emergencyContact}</p>
                            </div>
                          </div>
                        </div>

                        {/* Trip Info */}
                        <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
                          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <FiMapPin /> Trip Information
                          </h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-grey-400">Trip Name</p>
                              <p className="text-white font-semibold">{selectedItem.tripName}</p>
                            </div>
                            <div>
                              <p className="text-grey-400">Trip Date</p>
                              <p className="text-white font-semibold">{selectedItem.tripDate}</p>
                            </div>
                            <div>
                              <p className="text-grey-400">Number of Travelers</p>
                              <p className="text-white font-semibold">{selectedItem.numberOfTravelers}</p>
                            </div>
                            <div>
                              <p className="text-grey-400">Booking Date</p>
                              <p className="text-white font-semibold">{selectedItem.bookingDate}</p>
                            </div>
                            {selectedItem.specialRequirements && (
                              <div className="col-span-2">
                                <p className="text-grey-400">Special Requirements</p>
                                <p className="text-white">{selectedItem.specialRequirements}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Payment Info */}
                        <div className="p-6 bg-gradient-to-r from-cyan-900/20 to-teal-900/20 border border-cyan-500/30 rounded-xl">
                          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <FiDollarSign /> Payment Information
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-grey-300">Total Amount</span>
                              <span className="text-white font-bold">₹{selectedItem.amount.toLocaleString()}</span>
                            </div>
                            {selectedItem.discount > 0 && (
                              <div className="flex justify-between">
                                <span className="text-green-300">Discount ({selectedItem.promoCode})</span>
                                <span className="text-green-400 font-bold">-₹{selectedItem.discount.toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-grey-300">Paid Amount</span>
                              <span className="text-white font-bold">₹{selectedItem.paidAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-grey-300">Payment Method</span>
                              <span className="text-white font-semibold capitalize">{selectedItem.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between pt-3 border-t border-white/10">
                              <span className="text-grey-300">Status</span>
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
                            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
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
                          <p className="text-grey-300 mb-3">{offer.description}</p>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-grey-400">Discount</p>
                              <p className="text-white font-bold">
                                {offer.type === 'percentage' ? `${offer.discount}%` : `₹${offer.discount}`}
                              </p>
                            </div>
                            <div>
                              <p className="text-grey-400">Min Amount</p>
                              <p className="text-white font-bold">₹{offer.minAmount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-grey-400">Usage</p>
                              <p className="text-white font-bold">{offer.usedCount}/{offer.usageLimit}</p>
                            </div>
                            <div>
                              <p className="text-grey-400">Valid Until</p>
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
                      className="backdrop-blur-xl bg-teal-900/95 border border-white/10 rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
                    >
                      <h2 className="text-3xl font-bold text-white mb-6">Create New Offer</h2>

                      <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-grey-300 mb-2">Code</label>
                            <input
                              type="text"
                              value={newOffer.code}
                              onChange={(e) => setNewOffer({ ...newOffer, code: e.target.value.toUpperCase() })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-grey-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                              placeholder="e.g. SUMMER25"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-grey-300 mb-2">Type</label>
                            <select
                              value={newOffer.type}
                              onChange={(e) => setNewOffer({ ...newOffer, type: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                              <option value="percentage">Percentage (%)</option>
                              <option value="fixed">Fixed Amount (₹)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-grey-300 mb-2">Description</label>
                          <input
                            type="text"
                            value={newOffer.description}
                            onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-grey-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="Offer description"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-grey-300 mb-2">Discount Value</label>
                            <input
                              type="number"
                              value={newOffer.discount}
                              onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-grey-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                              placeholder="10"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-grey-300 mb-2">Min Amount</label>
                            <input
                              type="number"
                              value={newOffer.minAmount}
                              onChange={(e) => setNewOffer({ ...newOffer, minAmount: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-grey-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                              placeholder="0"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-grey-300 mb-2">Valid Until</label>
                            <input
                              type="date"
                              value={newOffer.validUntil}
                              onChange={(e) => setNewOffer({ ...newOffer, validUntil: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-grey-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-grey-300 mb-2">Usage Limit</label>
                            <input
                              type="number"
                              value={newOffer.usageLimit}
                              onChange={(e) => setNewOffer({ ...newOffer, usageLimit: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-grey-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                              placeholder="100"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
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

          {activeTab === 'trips' && (
            <motion.div
              key="trips"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Manage Trips</h2>
                <Button onClick={openAddTripModal}>
                  <FiPlus className="inline mr-2" size={18} />
                  Add New Trip
                </Button>
              </div>

              {/* Trips List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip, idx) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="h-full flex flex-col backdrop-blur-xl bg-teal-900/60 border border-white/10 hover:border-cyan-500/50 transition-all overflow-hidden group">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={trip.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop'}
                          alt={trip.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{trip.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-grey-300">
                              <span className="flex items-center gap-1"><FiMapPin /> {trip.destination}</span>
                              <span className="flex items-center gap-1"><FiCalendar /> {trip.duration} Days</span>
                            </div>
                          </div>
                          <span className={`text-xs font-bold px-2 py-1 rounded-full backdrop-blur-lg ${trip.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                            }`}>
                            {trip.status}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <p className="text-grey-400">Price</p>
                            <p className="text-white font-bold">₹{(trip.price || 0).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-grey-400">Date</p>
                            <p className="text-white font-bold">{trip.startDate ? new Date(trip.startDate).toLocaleDateString() : 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-grey-400">Bookings</p>
                            <p className="text-white font-bold">{trip.bookings ? trip.bookings.length : 0} / {trip.totalSeats || 0}</p>
                          </div>
                          <div>
                            <p className="text-grey-400">Revenue</p>
                            <p className="text-teal-400 font-bold">₹{((trip.bookings ? trip.bookings.length : 0) * (trip.price || 0)).toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="mt-auto flex gap-2 pt-4 border-t border-white/10">
                          <Button size="sm" variant="secondary" fullWidth onClick={() => handleEditTrip(trip)}>
                            <FiEdit2 className="mr-2" /> Edit
                          </Button>
                          <Button size="sm" className="bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20" onClick={() => handleDeleteTrip(trip.id)}>
                            <FiTrash2 />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Add/Edit Trip Modal */}
              <AnimatePresence>
                {(showModal === 'addTrip' || showModal === 'editTrip') && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setShowModal(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      onClick={(e) => e.stopPropagation()}
                      className="backdrop-blur-xl bg-teal-900/95 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                    >
                      <h2 className="text-3xl font-bold text-white mb-6">
                        {showModal === 'addTrip' ? 'Add New Trip' : 'Edit Trip'}
                      </h2>

                      <form onSubmit={handleSaveTrip} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-grey-400 text-sm mb-1">Trip Name</label>
                            <input required type="text" value={tripForm.name} onChange={e => setTripForm({ ...tripForm, name: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" />
                          </div>
                          <div>
                            <label className="block text-grey-400 text-sm mb-1">Destination</label>
                            <input required type="text" value={tripForm.destination} onChange={e => setTripForm({ ...tripForm, destination: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-grey-400 text-sm mb-1">Price (₹)</label>
                            <input required type="number" value={tripForm.price} onChange={e => setTripForm({ ...tripForm, price: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" />
                          </div>
                          <div>
                            <label className="block text-grey-400 text-sm mb-1">Duration (Days)</label>
                            <input required type="number" value={tripForm.duration} onChange={e => setTripForm({ ...tripForm, duration: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" />
                          </div>
                          <div>
                            <label className="block text-grey-400 text-sm mb-1">Group Size (Total Seats)</label>
                            <input required type="number" value={tripForm.groupSize} onChange={e => setTripForm({ ...tripForm, groupSize: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-grey-400 text-sm mb-1">Start Date</label>
                            <input required type="date" value={tripForm.startDate} onChange={e => setTripForm({ ...tripForm, startDate: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" />
                          </div>
                          <div>
                            <label className="block text-grey-400 text-sm mb-1">Difficulty</label>
                            <select value={tripForm.difficulty} onChange={e => setTripForm({ ...tripForm, difficulty: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none">
                              <option value="Easy">Easy</option>
                              <option value="Moderate">Moderate</option>
                              <option value="Hard">Hard</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-grey-400 text-sm mb-1">Image URL</label>
                          <input type="text" value={tripForm.image} onChange={e => setTripForm({ ...tripForm, image: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" placeholder="https://..." />
                        </div>

                        <div>
                          <label className="block text-grey-400 text-sm mb-1">Description</label>
                          <textarea rows="3" value={tripForm.description} onChange={e => setTripForm({ ...tripForm, description: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none"></textarea>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button type="button" variant="secondary" fullWidth onClick={() => setShowModal(null)}>Cancel</Button>
                          <Button type="submit" fullWidth>Save Trip</Button>
                        </div>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Placeholders for other tabs */}
          {(activeTab === 'users') && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-24 h-24 bg-teal-900/40 rounded-full flex items-center justify-center mb-6">
                <FiAlertCircle size={48} className="text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
              <p className="text-grey-400 mb-8">This module is currently under development.</p>
              <Button onClick={() => setActiveTab('dashboard')}>Back to Dashboard</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AdminDashboard;
