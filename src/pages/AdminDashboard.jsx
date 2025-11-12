import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiBarChart2, FiUsers, FiCalendar, FiDollarSign, FiLogOut } from 'react-icons/fi';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
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
      revenue: 253800
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
      revenue: 277200
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
      revenue: 0
    }
  ]);

  const [bookings] = useState([
    { id: 1, userName: 'John Doe', tripName: 'Winter Spiti Valley', date: '2024-12-01', status: 'confirmed', amount: 42300 },
    { id: 2, userName: 'Jane Smith', tripName: 'Leh Ladakh Adventure', date: '2024-11-20', status: 'pending', amount: 34650 },
    { id: 3, userName: 'Mike Johnson', tripName: 'Kerala Backpacking', date: '2024-10-15', status: 'completed', amount: 49950 },
    { id: 4, userName: 'Sarah Williams', tripName: 'Winter Spiti Valley', date: '2024-12-05', status: 'confirmed', amount: 42300 },
    { id: 5, userName: 'Tom Brown', tripName: 'Leh Ladakh Adventure', date: '2024-11-25', status: 'confirmed', amount: 34650 }
  ]);

  const [showAddTrip, setShowAddTrip] = useState(false);
  const [newTrip, setNewTrip] = useState({
    name: '',
    destination: '',
    price: '',
    duration: '',
    startDate: '',
    totalSeats: ''
  });

  const [editingTrip, setEditingTrip] = useState(null);

  // Calculate dashboard stats
  const totalTrips = trips.length;
  const activeTrips = trips.filter(t => t.status === 'active').length;
  const totalBookings = bookings.length;
  const totalRevenue = trips.reduce((sum, t) => sum + t.revenue, 0);

  const handleAddTrip = () => {
    if (newTrip.name && newTrip.destination && newTrip.price && newTrip.duration && newTrip.startDate && newTrip.totalSeats) {
      const trip = {
        id: trips.length + 1,
        ...newTrip,
        price: parseInt(newTrip.price),
        duration: parseInt(newTrip.duration),
        totalSeats: parseInt(newTrip.totalSeats),
        status: 'active',
        bookings: 0,
        revenue: 0
      };
      setTrips([...trips, trip]);
      setNewTrip({ name: '', destination: '', price: '', duration: '', startDate: '', totalSeats: '' });
      setShowAddTrip(false);
    }
  };

  const handleDeleteTrip = (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      setTrips(trips.filter(t => t.id !== id));
    }
  };

  const handleEditTrip = (trip) => {
    setEditingTrip(trip);
  };

  const handleSaveTrip = () => {
    if (editingTrip) {
      setTrips(trips.map(t => t.id === editingTrip.id ? editingTrip : t));
      setEditingTrip(null);
    }
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : status === 'pending' 
      ? 'bg-yellow-100 text-yellow-800'
      : status === 'completed'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <Button variant="secondary" onClick={() => navigate('/')}>
            <FiLogOut className="inline mr-2" size={18} />
            Back to Site
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          {['dashboard', 'trips', 'bookings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 font-semibold capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-orange-500 text-orange-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab === 'dashboard' && <FiBarChart2 className="inline mr-2" size={18} />}
              {tab === 'trips' && <FiCalendar className="inline mr-2" size={18} />}
              {tab === 'bookings' && <FiUsers className="inline mr-2" size={18} />}
              {tab}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Trips</p>
                    <p className="text-4xl font-bold text-gray-800">{totalTrips}</p>
                  </div>
                  <FiCalendar className="text-orange-500" size={32} />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Active Trips</p>
                    <p className="text-4xl font-bold text-green-600">{activeTrips}</p>
                  </div>
                  <FiEye className="text-green-500" size={32} />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Bookings</p>
                    <p className="text-4xl font-bold text-blue-600">{totalBookings}</p>
                  </div>
                  <FiUsers className="text-blue-500" size={32} />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Revenue</p>
                    <p className="text-4xl font-bold text-orange-600">₹{(totalRevenue / 100000).toFixed(1)}L</p>
                  </div>
                  <FiDollarSign className="text-orange-500" size={32} />
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Bookings</h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{booking.userName}</p>
                        <p className="text-gray-600 text-xs">{booking.tripName}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusBadge(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Top Trips */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Top Performing Trips</h2>
                <div className="space-y-3">
                  {trips
                    .sort((a, b) => b.revenue - a.revenue)
                    .slice(0, 3)
                    .map((trip) => (
                      <div key={trip.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 text-sm">{trip.name}</p>
                          <p className="text-gray-600 text-xs">{trip.bookings} bookings</p>
                        </div>
                        <p className="font-bold text-orange-600">₹{trip.revenue.toLocaleString()}</p>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Trips Tab */}
        {activeTab === 'trips' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Manage Trips</h2>
              <Button onClick={() => setShowAddTrip(!showAddTrip)}>
                <FiPlus className="inline mr-2" size={18} />
                {showAddTrip ? 'Cancel' : 'Add New Trip'}
              </Button>
            </div>

            {/* Add Trip Form */}
            {showAddTrip && (
              <Card className="p-6 border-l-4 border-orange-500">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Trip</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Trip Name"
                    value={newTrip.name}
                    onChange={(e) => setNewTrip({ ...newTrip, name: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="text"
                    placeholder="Destination"
                    value={newTrip.destination}
                    onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newTrip.price}
                    onChange={(e) => setNewTrip({ ...newTrip, price: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="number"
                    placeholder="Duration (days)"
                    value={newTrip.duration}
                    onChange={(e) => setNewTrip({ ...newTrip, duration: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="date"
                    value={newTrip.startDate}
                    onChange={(e) => setNewTrip({ ...newTrip, startDate: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="number"
                    placeholder="Total Seats"
                    value={newTrip.totalSeats}
                    onChange={(e) => setNewTrip({ ...newTrip, totalSeats: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleAddTrip}>Add Trip</Button>
                  <Button variant="secondary" onClick={() => setShowAddTrip(false)}>Cancel</Button>
                </div>
              </Card>
            )}

            {/* Edit Trip Form */}
            {editingTrip && (
              <Card className="p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Edit Trip</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={editingTrip.name}
                    onChange={(e) => setEditingTrip({ ...editingTrip, name: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="text"
                    value={editingTrip.destination}
                    onChange={(e) => setEditingTrip({ ...editingTrip, destination: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="number"
                    value={editingTrip.price}
                    onChange={(e) => setEditingTrip({ ...editingTrip, price: parseInt(e.target.value) })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="date"
                    value={editingTrip.startDate}
                    onChange={(e) => setEditingTrip({ ...editingTrip, startDate: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleSaveTrip}>Save Changes</Button>
                  <Button variant="secondary" onClick={() => setEditingTrip(null)}>Cancel</Button>
                </div>
              </Card>
            )}

            {/* Trips Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Trip Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Destination</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Start Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Bookings</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Revenue</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {trips.map((trip) => (
                    <tr key={trip.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800 font-semibold">{trip.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{trip.destination}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 font-semibold">₹{trip.price.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{trip.startDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{trip.bookings}/{trip.totalSeats}</td>
                      <td className="px-6 py-4 text-sm text-orange-600 font-bold">₹{trip.revenue.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(trip.status)}`}>
                          {trip.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleEditTrip(trip)}
                          className="text-blue-500 hover:text-blue-700 font-semibold"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteTrip(trip.id)}
                          className="text-red-500 hover:text-red-700 font-semibold"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Manage Bookings</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Booking ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">User</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Trip</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800 font-semibold">BK{booking.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{booking.userName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{booking.tripName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{booking.date}</td>
                      <td className="px-6 py-4 text-sm text-orange-600 font-bold">₹{booking.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="secondary">Cancel</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
