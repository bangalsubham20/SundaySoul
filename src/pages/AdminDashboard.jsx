import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import {
  FiEdit2, FiTrash2, FiPlus, FiEye, FiSearch, FiFilter, FiDownload, FiCheck, FiX, FiUsers, FiDollarSign
} from 'react-icons/fi';

// Services
import tripService from '../services/tripService';
import bookingService from '../services/bookingService';
import userService from '../services/userService';
import offerService from '../services/offerService';

// Components
import Sidebar from '../components/admin/Sidebar';
import StatsGrid from '../components/admin/StatsGrid';
import RevenueChart from '../components/admin/RevenueChart';
import BookingOverview from '../components/admin/BookingOverview';
import RecentActivity from '../components/admin/RecentActivity';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Data States
  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [activities, setActivities] = useState([]);

  // Modal State
  const [showModal, setShowModal] = useState(null); // 'createOffer', 'editTrip', etc.

  // Forms
  const [tripForm, setTripForm] = useState({
    name: '', destination: '', price: '', duration: '', startDate: '',
    status: 'active', groupSize: '', difficulty: 'Moderate',
    description: '', image: ''
  });

  const [offerForm, setOfferForm] = useState({
    code: '', discount: '', type: 'PERCENTAGE', minAmount: '', validUntil: '', usageLimit: ''
  });

  // Fetch Data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [tripsData, bookingsData, usersData, offersData] = await Promise.all([
        tripService.getAllTrips(),
        bookingService.getAllBookings(),
        userService.getAllUsers(),
        offerService.getAllOffers()
      ]);

      setTrips(tripsData);
      setBookings(bookingsData);
      setUsers(usersData || []);
      setOffers(offersData || []);

      // Mock Recent Activity based on bookings
      const recent = bookingsData.slice(0, 5).map(b => ({
        id: b.id,
        user: b.user?.fullName || 'Unknown',
        action: 'booked',
        target: b.trip?.name || 'Trip',
        time: new Date(b.bookingDate).toLocaleDateString(),
        avatar: b.user?.avatar || `https://ui-avatars.com/api/?name=${b.user?.fullName}&background=random`
      }));
      setActivities(recent);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  // Derived Stats
  const stats = {
    revenue: bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0),
    bookings: bookings.length,
    users: users.length,
    trips: trips.filter(t => t.active).length
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // --- Render Helpers ---

  // Dashboard Overview Tab
  const renderDashboard = () => (
    <div className="space-y-6">
      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <BookingOverview bookings={bookings} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={activities} />

        <div className="bg-teal-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => setActiveTab('bookings')} variant="secondary" className="h-24 flex flex-col items-center justify-center gap-2">
              <FiCheck size={24} />
              <span>Verify Bookings</span>
            </Button>
            <Button onClick={() => setActiveTab('trips')} variant="secondary" className="h-24 flex flex-col items-center justify-center gap-2">
              <FiPlus size={24} />
              <span>Add New Trip</span>
            </Button>
            <Button onClick={() => setActiveTab('users')} variant="secondary" className="h-24 flex flex-col items-center justify-center gap-2">
              <FiUsers size={24} />
              <span>Manage Users</span>
            </Button>
            <Button onClick={() => setShowModal('createOffer')} variant="secondary" className="h-24 flex flex-col items-center justify-center gap-2">
              <FiDollarSign size={24} />
              <span>Create Offer</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Bookings Tab
  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">All Bookings</h2>
        <div className="flex gap-2">
          <Button variant="secondary"><FiFilter /> Filter</Button>
          <Button variant="secondary"><FiDownload /> Export</Button>
        </div>
      </div>

      <Card className="overflow-hidden bg-teal-900/40 backdrop-blur-xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/20 border-b border-white/10 text-grey-400 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Trip</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-cyan-400 font-mono">#{booking.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-teal-500 flex items-center justify-center text-xs font-bold">
                        {booking.user?.fullName?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{booking.user?.fullName}</p>
                        <p className="text-xs text-grey-400">{booking.user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white text-sm">{booking.trip?.name}</td>
                  <td className="px-6 py-4 text-grey-400 text-sm">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                      booking.status === 'pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                      {booking.status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white font-bold">₹{(booking.totalPrice || 0).toLocaleString()}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-cyan-400 transition-colors"><FiEye /></button>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-red-400 transition-colors"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // Users Tab
  const renderUsers = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Registered Users</h2>
      <Card className="overflow-hidden backdrop-blur-xl bg-teal-900/60 border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/20 border-b border-white/10">
              <tr>
                {['ID', 'Name', 'Email', 'Phone', 'Role', 'Joined Date'].map(header => (
                  <th key={header} className="px-6 py-4 text-left text-sm font-bold text-grey-300">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users.map((user, idx) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-white/5 transition-all"
                >
                  <td className="px-6 py-4 text-sm font-bold text-cyan-400">#{user.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-white flex items-center gap-3">
                    <img src={user.avatar || 'https://via.placeholder.com/40'} alt={user.name} className="w-8 h-8 rounded-full" />
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-grey-300">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-grey-300">{user.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${user.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-grey-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // Trips Tab
  const renderTrips = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Manage Trips</h2>
        <Button><FiPlus className="mr-2" /> Add Trip</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map(trip => (
          <Card key={trip.id} className="p-0 overflow-hidden group">
            <div className="h-48 relative overflow-hidden">
              <img src={trip.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1'} alt={trip.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-bold text-white">
                {trip.active ? 'Active' : 'Inactive'}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-white mb-1">{trip.name}</h3>
              <p className="text-grey-400 text-sm mb-4">{trip.destination} • {trip.duration} Days</p>

              <div className="flex justify-between items-center mb-4">
                <span className="text-cyan-400 font-bold text-lg">₹{trip.price}</span>
                <span className="text-xs text-grey-500">{trip.bookings?.length || 0} Bookings</span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="secondary" fullWidth><FiEdit2 /> Edit</Button>
                <Button size="sm" className="bg-red-500/20 text-red-400 hover:bg-red-500/30"><FiTrash2 /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  // Offers Tab
  const renderOffers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Offers & Promos</h2>
        <Button onClick={() => setShowModal('createOffer')}><FiPlus className="mr-2" /> Create Offer</Button>
      </div>
      <Card className="overflow-hidden backdrop-blur-xl bg-teal-900/60 border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/20 border-b border-white/10">
              <tr>
                {['Code', 'Discount', 'Type', 'Min Amount', 'Valid Until', 'Usage', 'Status', 'Actions'].map(header => (
                  <th key={header} className="px-6 py-4 text-left text-sm font-bold text-grey-300">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {offers.map((offer) => (
                <tr key={offer.id} className="hover:bg-white/5 transition-all">
                  <td className="px-6 py-4 text-cyan-400 font-bold font-mono">{offer.code}</td>
                  <td className="px-6 py-4 text-white font-bold">
                    {offer.type === 'PERCENTAGE' ? `${offer.discount}%` : `₹${offer.discount}`}
                  </td>
                  <td className="px-6 py-4 text-xs text-grey-400">{offer.type}</td>
                  <td className="px-6 py-4 text-sm text-grey-300">₹{offer.minAmount}</td>
                  <td className="px-6 py-4 text-sm text-grey-300">{offer.validUntil}</td>
                  <td className="px-6 py-4 text-sm text-grey-400">{offer.usedCount} / {offer.usageLimit}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={async () => {
                        try {
                          await offerService.toggleOfferActive(offer.id);
                          fetchData();
                          toast.success('Offer status updated');
                        } catch (err) {
                          toast.error('Failed to update status');
                        }
                      }}
                      className={`px-2 py-1 text-xs font-bold rounded-full border ${offer.active ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                      {offer.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={async () => {
                        if (window.confirm('Delete this offer?')) {
                          try {
                            await offerService.deleteOffer(offer.id);
                            fetchData();
                            toast.success('Offer deleted');
                          } catch (err) {
                            toast.error('Failed to delete offer');
                          }
                        }
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg text-red-400 transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );


  if (isLoading) {
    return (
      <div className="min-h-screen bg-teal-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-teal-950 font-sans text-white selection:bg-cyan-500 selection:text-teal-900">
      <Toaster position="top-right" />
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'bookings' && renderBookings()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'trips' && renderTrips()}
            {activeTab === 'offers' && renderOffers()}
          </motion.div>
        </AnimatePresence>

        {/* Create Offer Modal */}
        {showModal === 'createOffer' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-teal-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Create New Offer</h3>
                <button onClick={() => setShowModal(null)}><FiX className="text-grey-400 hover:text-white" /></button>
              </div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await offerService.createOffer(offerForm);
                  setShowModal(null);
                  fetchData();
                  toast.success('Offer created!');
                  setOfferForm({ code: '', discount: '', type: 'PERCENTAGE', minAmount: '', validUntil: '', usageLimit: '' });
                } catch (err) {
                  alert('Failed to create offer: ' + err.message);
                }
              }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-grey-400 mb-1">Offer Code</label>
                  <input
                    type="text"
                    required
                    value={offerForm.code}
                    onChange={e => setOfferForm({ ...offerForm, code: e.target.value.toUpperCase() })}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-400 outline-none"
                    placeholder="e.g. SUMMER2024"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-grey-400 mb-1">Discount Type</label>
                    <select
                      value={offerForm.type}
                      onChange={e => setOfferForm({ ...offerForm, type: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-400 outline-none"
                    >
                      <option value="PERCENTAGE">Percentage (%)</option>
                      <option value="FIXED">Fixed Amount (₹)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-grey-400 mb-1">Value</label>
                    <input
                      type="number"
                      required
                      value={offerForm.discount}
                      onChange={e => setOfferForm({ ...offerForm, discount: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-400 outline-none"
                      placeholder="e.g. 10 or 500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-grey-400 mb-1">Min Order Amount</label>
                    <input
                      type="number"
                      value={offerForm.minAmount}
                      onChange={e => setOfferForm({ ...offerForm, minAmount: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-400 outline-none"
                      placeholder="e.g. 5000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-grey-400 mb-1">Usage Limit</label>
                    <input
                      type="number"
                      value={offerForm.usageLimit}
                      onChange={e => setOfferForm({ ...offerForm, usageLimit: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-400 outline-none"
                      placeholder="e.g. 100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-grey-400 mb-1">Valid Until</label>
                  <input
                    type="date"
                    required
                    value={offerForm.validUntil}
                    onChange={e => setOfferForm({ ...offerForm, validUntil: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-400 outline-none"
                  />
                </div>
                <Button type="submit" fullWidth>Create Offer</Button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
// Forced update
