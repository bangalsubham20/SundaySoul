import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FiEdit2, FiLogOut, FiBookmark, FiStar, FiX, FiCheck } from 'react-icons/fi';
import bookingService from '../services/bookingService';
import reviewService from '../services/reviewService';

function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || 'User',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || 'Adventure enthusiast! 🌍',
    avatar: user?.avatar || 'https://via.placeholder.com/150'
  });

  // Mock data as fallback
  const mockBookings = [
    {
      id: 1,
      tripName: 'Winter Spiti Valley',
      destination: 'Spiti Valley',
      startDate: '2025-01-15',
      endDate: '2025-01-22',
      status: 'confirmed',
      price: 21150,
      travelers: 2,
      bookingDate: '2024-12-01',
      image: 'https://images.pexels.com/photos/31307356/pexels-photo-31307356/free-photo-of-spectacular-view-of-key-monastery-in-winter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      tripName: 'Leh Ladakh Adventure',
      destination: 'Ladakh',
      startDate: '2025-02-20',
      endDate: '2025-02-26',
      status: 'pending',
      price: 34650,
      travelers: 1,
      bookingDate: '2024-11-20',
      image: 'https://images.pexels.com/photos/34555164/pexels-photo-34555164/free-photo-of-adventurer-resting-with-motorcycle-by-scenic-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      tripName: 'Kerala Backpacking',
      destination: 'Kerala',
      startDate: '2025-03-10',
      endDate: '2025-03-16',
      status: 'completed',
      price: 16650,
      travelers: 3,
      bookingDate: '2024-10-15',
      image: 'https://images.pexels.com/photos/12144055/pexels-photo-12144055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  const mockReviews = [
    {
      id: 1,
      tripName: 'Kerala Backpacking',
      rating: 5,
      title: 'Absolutely Amazing!',
      text: 'Had the best time of my life. The team was incredible, food was delicious, and the itinerary was perfectly planned.',
      date: '2024-11-30',
      helpful: 45
    },
    {
      id: 2,
      tripName: 'Kashmir Great Lakes Trek',
      rating: 4,
      title: 'Great Adventure',
      text: 'Beautiful trek with amazing views. One day had bad weather but the team handled it well.',
      date: '2024-09-15',
      helpful: 28
    }
  ];

  // Fetch user bookings and reviews on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Update form data with current user info
        if (user) {
          setFormData(prev => ({
            ...prev,
            name: user.name || prev.name,
            email: user.email || prev.email,
            phone: user.phone || prev.phone,
            bio: user.bio || prev.bio,
            avatar: user.avatar || prev.avatar
          }));

          // Try to fetch from backend
          try {
            const bookings = await bookingService.getUserBookings();
            setUserBookings(bookings);
          } catch (err) {
            console.warn('Failed to fetch bookings, using mock data:', err);
            setUserBookings(mockBookings);
          }

          try {
            const reviews = await reviewService.getUserReviews();
            setUserReviews(reviews);
          } catch (err) {
            console.warn('Failed to fetch reviews, using mock data:', err);
            setUserReviews(mockReviews);
          }
        } else {
          setError('Please log in to view your profile');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load profile data');
        setUserBookings(mockBookings);
        setUserReviews(mockReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle profile save
  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      await updateProfile(formData);
      setIsEditing(false);
      // Show success message (optional: add toast notification)
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return styles[status] || styles.pending;
  };

  // Calculate days until trip
  const calculateDaysUntil = (date) => {
    const tripDate = new Date(date);
    const today = new Date();
    const daysLeft = Math.ceil((tripDate - today) / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  // Calculate stats
  const totalBookings = userBookings.length;
  const completedTrips = userBookings.filter(b => b.status === 'completed').length;
  const upcomingTrips = userBookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length;
  const avgRating = userReviews.length > 0 
    ? (userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length).toFixed(1) 
    : 0;

  // Loading state
  if (loading) return <LoadingSpinner />;

  // Not logged in state
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="p-12 text-center">
            <p className="text-2xl text-gray-600 mb-4">Please log in to view your profile</p>
            <Button onClick={() => navigate('/login')}>Go to Login</Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Error notification */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="p-8 text-center sticky top-20">
              {/* Avatar */}
              <div className="mb-6">
                <img
                  src={formData.avatar}
                  alt={formData.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-orange-200"
                />
                <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{formData.email}</p>
                <p className="text-gray-500 text-sm italic line-clamp-2">{formData.bio}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 py-6 border-y">
                <div>
                  <p className="text-2xl font-bold text-orange-500">{totalBookings}</p>
                  <p className="text-xs text-gray-600">Total Trips</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-500">{completedTrips}</p>
                  <p className="text-xs text-gray-600">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-500">⭐{avgRating}</p>
                  <p className="text-xs text-gray-600">Avg Rating</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  fullWidth
                  variant={isEditing ? 'secondary' : 'outline'}
                  onClick={() => setIsEditing(!isEditing)}
                  size="sm"
                >
                  <FiEdit2 className="inline mr-2" size={16} />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
                <Button
                  fullWidth
                  variant="danger"
                  onClick={handleLogout}
                  size="sm"
                >
                  <FiLogOut className="inline mr-2" size={16} />
                  Logout
                </Button>
              </div>

              {/* Member Since */}
              <div className="mt-6 pt-6 border-t text-sm text-gray-500">
                <p>Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'recently'}</p>
                <p className="text-xs mt-1">WravelerForLife 🌍</p>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Edit Profile Form */}
            {isEditing && (
              <Card className="p-8 mb-8 border-l-4 border-orange-500">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button fullWidth onClick={handleSaveProfile} disabled={isSaving}>
                      <FiCheck className="inline mr-2" size={16} />
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      fullWidth
                      variant="secondary"
                      onClick={() => setIsEditing(false)}
                      disabled={isSaving}
                    >
                      <FiX className="inline mr-2" size={16} />
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b overflow-x-auto">
              {['bookings', 'reviews', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-semibold capitalize whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-b-2 border-orange-500 text-orange-500'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab === 'bookings' && <FiBookmark className="inline mr-2" size={18} />}
                  {tab === 'reviews' && <FiStar className="inline mr-2" size={18} />}
                  {tab}
                </button>
              ))}
            </div>

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
                  <Button onClick={() => navigate('/trips')}>Book New Trip</Button>
                </div>

                {userBookings.length > 0 ? (
                  userBookings.map((booking) => {
                    const daysLeft = calculateDaysUntil(booking.startDate);
                    const isUpcoming = daysLeft > 0;

                    return (
                      <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {/* Image */}
                          <div className="md:col-span-1">
                            <img
                              src={booking.image}
                              alt={booking.tripName}
                              className="w-full h-40 object-cover"
                            />
                          </div>

                          {/* Content */}
                          <div className="md:col-span-3 p-6">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="text-lg font-bold text-gray-800">{booking.tripName}</h3>
                                <p className="text-gray-600 text-sm">📍 {booking.destination}</p>
                              </div>
                              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                              <div>
                                <p className="text-gray-500 text-xs">Check-in</p>
                                <p className="font-semibold text-gray-800">{booking.startDate}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Check-out</p>
                                <p className="font-semibold text-gray-800">{booking.endDate}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Travelers</p>
                                <p className="font-semibold text-gray-800">{booking.travelers}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Price</p>
                                <p className="font-bold text-orange-500">₹{booking.price.toLocaleString()}</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div>
                                {isUpcoming ? (
                                  <p className="text-sm text-green-600 font-semibold">
                                    ✓ Starts in {daysLeft} days
                                  </p>
                                ) : (
                                  <p className="text-sm text-gray-600">
                                    Completed on {booking.endDate}
                                  </p>
                                )}
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => navigate(`/trips/${booking.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <Card className="p-12 text-center">
                    <p className="text-gray-600 mb-4">No bookings yet</p>
                    <Button onClick={() => navigate('/trips')}>Start Exploring</Button>
                  </Card>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">My Reviews ({userReviews.length})</h2>
                </div>

                {userReviews.length > 0 ? (
                  userReviews.map((review) => (
                    <Card key={review.id} className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{review.tripName}</h3>
                          <p className="text-sm text-gray-500">Posted on {review.date}</p>
                        </div>
                        <div className="text-yellow-500 text-lg">{'⭐'.repeat(review.rating)}</div>
                      </div>

                      <h4 className="font-bold text-gray-800 mb-2">{review.title}</h4>
                      <p className="text-gray-700 mb-4">{review.text}</p>

                      <div className="flex items-center justify-between pt-4 border-t flex-wrap gap-2">
                        <p className="text-sm text-gray-500">{review.helpful} travelers found this helpful</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="secondary">Delete</Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-12 text-center">
                    <p className="text-gray-600 mb-4">No reviews yet</p>
                    <p className="text-sm text-gray-500 mb-4">Complete a trip to write a review</p>
                    <Button onClick={() => navigate('/trips')}>Explore Trips</Button>
                  </Card>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates about your bookings</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 accent-orange-500" />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">SMS Notifications</p>
                        <p className="text-sm text-gray-600">Get important alerts via SMS</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 accent-orange-500" />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">Marketing Emails</p>
                        <p className="text-sm text-gray-600">Special offers and new trips</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5 accent-orange-500" />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">Community Updates</p>
                        <p className="text-sm text-gray-600">Messages from WravelerForLife</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 accent-orange-500" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-l-4 border-red-500">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Danger Zone</h2>

                  <div className="space-y-3">
                    <Button fullWidth variant="danger" size="sm">
                      Change Password
                    </Button>
                    <Button fullWidth variant="danger" size="sm">
                      Delete Account
                    </Button>
                  </div>

                  <p className="text-sm text-gray-500 mt-4">
                    Deleting your account will permanently remove all your data. This action cannot be undone.
                  </p>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
