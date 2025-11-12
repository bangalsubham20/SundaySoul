import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiUsers, FiStar, FiClock, FiCheck } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Card from '../components/common/Card';
import tripService from '../services/tripService';

function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock trip data as fallback
  const mockTrips = {
    1: {
      id: 1,
      name: 'Winter Spiti Valley',
      destination: 'Spiti Valley, Himachal Pradesh',
      price: 21150,
      duration: 8,
      nights: 7,
      groupSize: '12-16 people',
      difficulty: 'Moderate',
      rating: 4.8,
      reviews: 245,
      bestSeason: 'December - February',
      altitude: '3000-4500 m',
      availableSeats: 5,
      startDate: '2025-01-15',
      endDate: '2025-01-22',
      image: 'https://images.pexels.com/photos/31307356/pexels-photo-31307356/free-photo-of-spectacular-view-of-key-monastery-in-winter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Experience the frozen beauty of Spiti Valley with stunning monasteries, ancient culture, and breathtaking landscapes.',
      highlights: [
        'Visit ancient Tabo Monastery (996 AD)',
        'Trek to Key Monastery',
        'Stay in local homestays',
        'Interact with Tibetan culture',
        'Visit Kinnaur and Rampur',
        'Photography at stunning locations'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Shimla', description: 'Arrive at Shimla. Evening walk in the mall. Overnight stay in Shimla.', meals: 'Dinner', activities: ['Welcome briefing', 'Mall exploration', 'Evening at hotel'] },
        { day: 2, title: 'Shimla to Kaza', description: 'Drive to Kaza (320 km). Stop at Kinnaur and Rampur. Scenic mountain drive.', meals: 'Breakfast, Lunch, Dinner', activities: ['Scenic drive', 'Local market visit', 'Sunset view'] },
        { day: 3, title: 'Kaza - Tabo Monastery', description: 'Visit ancient Tabo Monastery (996 AD). Explore Dhankar Lake and Dhankhar Fort.', meals: 'Breakfast, Lunch, Dinner', activities: ['Monastery tour', 'Photography', 'Tibetan culture'] },
        { day: 4, title: 'Key Monastery Trek', description: 'Trek to Key Monastery (3600m). Amazing views of Spiti Valley.', meals: 'Breakfast, Lunch, Dinner', activities: ['Morning trek', 'Monastery visit', 'Photography'] },
        { day: 5, title: 'Kaza Exploration', description: 'Visit Langza village, Komik village, and Hikkim (world\'s highest post office).', meals: 'Breakfast, Lunch, Dinner', activities: ['Village tour', 'Post office visit', 'Local interaction'] },
        { day: 6, title: 'Kaza to Shimla', description: 'Drive back to Shimla. Stop at scenic viewpoints.', meals: 'Breakfast, Lunch, Dinner', activities: ['Long drive', 'Photography stops'] },
        { day: 7, title: 'Shimla Leisure', description: 'Rest day. Optional mall walk, local market shopping.', meals: 'Breakfast, Lunch, Dinner', activities: ['Leisure time', 'Shopping', 'Local exploration'] },
        { day: 8, title: 'Departure', description: 'Breakfast and departure from Shimla.', meals: 'Breakfast', activities: ['Checkout', 'Departure'] }
      ],
      inclusions: [
        '7 nights accommodation (mix of hotels and homestays)',
        'All meals (breakfast, lunch, dinner)',
        'Experienced trip leader and local guide',
        'Transportation (AC vehicle)',
        'All entrance fees',
        'Free travel insurance (up to ₹4.5 lakhs)',
        'Welcome kit and merchandise'
      ],
      exclusions: [
        'Flights to/from Shimla',
        'Personal expenses',
        'Alcoholic beverages',
        'Tips and gratitude',
        'Activities not mentioned in itinerary'
      ],
      tripReviews: [
        { id: 1, author: 'Priya Singh', rating: 5, date: '2024-12-20', text: 'Absolutely amazing experience! The trip captain was so friendly and the entire group bonded so well. Would definitely go again!', verified: true },
        { id: 2, author: 'Rahul Kumar', rating: 5, date: '2024-12-15', text: 'Best trek I\'ve done. The itinerary was perfectly planned. Highly recommend WravelCommunity!', verified: true },
        { id: 3, author: 'Anjali Sharma', rating: 4, date: '2024-12-10', text: 'Great experience overall. Food was good, accommodations were comfortable. One day the weather was a bit harsh but we managed well.', verified: true }
      ]
    },
    2: {
      id: 2,
      name: 'Leh Ladakh Adventure',
      destination: 'Ladakh, Union Territory',
      price: 34650,
      duration: 7,
      nights: 6,
      groupSize: '10-14 people',
      difficulty: 'Moderate-Hard',
      rating: 4.9,
      reviews: 312,
      bestSeason: 'June - September',
      altitude: '3000-5500 m',
      availableSeats: 8,
      startDate: '2025-02-20',
      endDate: '2025-02-26',
      image: 'https://images.pexels.com/photos/34555164/pexels-photo-34555164/free-photo-of-adventurer-resting-with-motorcycle-by-scenic-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Experience the raw beauty of Ladakh - high altitude deserts, ancient monasteries, and stunning mountain passes.',
      highlights: [
        'Highest motorable road (Khardung La Pass)',
        'Pangong Lake - turquoise waters',
        'Nubra Valley - sand dunes and camels',
        'Magnetic Hill optical illusion',
        'Ancient Hemis Monastery',
        'Stargazing in high altitude desert'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Leh', description: 'Arrive and acclimatize', meals: 'Dinner', activities: ['Arrival', 'Rest', 'Light walk'] },
        { day: 2, title: 'Leh to Khardung La', description: 'Visit highest motorable road', meals: 'Breakfast, Lunch, Dinner', activities: ['Khardung La trek', 'Photography'] },
        { day: 3, title: 'Nubra Valley', description: 'Camel safari and sand dunes', meals: 'Breakfast, Lunch, Dinner', activities: ['Camel ride', 'Photography'] },
        { day: 4, title: 'Pangong Lake', description: 'Long drive to blue lake', meals: 'Breakfast, Lunch, Dinner', activities: ['Lake visit', 'Sunset viewing'] },
        { day: 5, title: 'Pangong to Leh', description: 'Return journey with stops', meals: 'Breakfast, Lunch, Dinner', activities: ['Magnetic hill', 'Photography'] },
        { day: 6, title: 'Leh Exploration', description: 'Visit Hemis Monastery', meals: 'Breakfast, Lunch, Dinner', activities: ['Monastery tour'] },
        { day: 7, title: 'Departure', description: 'Checkout and fly', meals: 'Breakfast', activities: ['Departure'] }
      ],
      inclusions: [
        '6 nights accommodation',
        'All meals',
        'Experienced guide',
        'Vehicle with driver',
        'All permits and fees',
        'Travel insurance'
      ],
      exclusions: [
        'Flights',
        'Personal expenses',
        'Tips'
      ],
      tripReviews: [
        { id: 1, author: 'Vikram Patel', rating: 5, date: '2024-11-30', text: 'Incredible trip! The views are beyond words. Trip captains were amazing.', verified: true },
        { id: 2, author: 'Neha Gupta', rating: 5, date: '2024-11-25', text: 'Best adventure of my life! Highly recommended for everyone.', verified: true }
      ]
    }
  };

  // Single useEffect to fetch trip data
  useEffect(() => {
    const fetchTripData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch from backend
        const tripData = await tripService.getTripById(id);
        setTrip(tripData);
      } catch (err) {
        console.warn('Backend unavailable, using mock data:', err);
        // Use mock data as fallback
        const mockTrip = mockTrips[id];
        if (mockTrip) {
          setTrip(mockTrip);
        } else {
          setError('Trip not found');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTripData();
    }
  }, [id]);

  // Loading state
  if (loading) return <LoadingSpinner />;

  // Error state
  if (error || !trip) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 mb-4">{error || 'Trip not found'}</p>
        <Button onClick={() => navigate('/trips')}>Back to Trips</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="h-96 bg-gray-200 relative overflow-hidden">
        <img src={trip.image} alt={trip.name} className="w-full h-full object-cover" />
        <div className="absolute top-6 right-6 bg-orange-500 text-white px-4 py-2 rounded-full font-bold">
          ₹{trip.price.toLocaleString()}/person
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{trip.name}</h1>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-4">
                <div className="flex items-center text-orange-500 mb-2">
                  <FiMapPin size={20} />
                  <span className="ml-2 font-semibold text-sm">Location</span>
                </div>
                <p className="text-gray-700 text-sm">{trip.destination}</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center text-orange-500 mb-2">
                  <FiClock size={20} />
                  <span className="ml-2 font-semibold text-sm">Duration</span>
                </div>
                <p className="text-gray-700 text-sm">{trip.duration} Days</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center text-orange-500 mb-2">
                  <FiUsers size={20} />
                  <span className="ml-2 font-semibold text-sm">Seats Left</span>
                </div>
                <p className="text-gray-700 text-sm">{trip.availableSeats} available</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center text-orange-500 mb-2">
                  <FiStar size={20} />
                  <span className="ml-2 font-semibold text-sm">Rating</span>
                </div>
                <p className="text-gray-700 text-sm">⭐ {trip.rating} ({trip.reviews})</p>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b overflow-x-auto">
              {['overview', 'itinerary', 'includes', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-semibold capitalize whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-b-2 border-orange-500 text-orange-500'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Trip</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{trip.description}</p>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Difficulty Level</h3>
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        trip.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        trip.difficulty.includes('Moderate') && !trip.difficulty.includes('Hard') ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {trip.difficulty}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Best Season</h3>
                      <p className="text-gray-600">{trip.bestSeason}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Altitude</h3>
                      <p className="text-gray-600">{trip.altitude}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Group Size</h3>
                      <p className="text-gray-600">{trip.groupSize}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trip.highlights && trip.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <FiCheck className="text-green-500 mr-3 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Day-by-Day Itinerary</h2>
                {trip.itinerary && trip.itinerary.map((day, index) => (
                  <Card key={index} className="p-6 border-l-4 border-orange-500">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">Day {day.day}: {day.title}</h3>
                        <p className="text-gray-600 mt-1">{day.description}</p>
                      </div>
                      <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {day.meals}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-500 mt-4 flex-wrap">
                      {day.activities && day.activities.map((activity, idx) => (
                        <span key={idx} className="flex items-center">
                          <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                          {activity}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'includes' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Included</h2>
                  <div className="space-y-3">
                    {trip.inclusions && trip.inclusions.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <FiCheck className="text-green-500 mr-3 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Not Included</h2>
                  <div className="space-y-3">
                    {trip.exclusions && trip.exclusions.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-red-500 mr-3 flex-shrink-0 mt-1">✕</span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews ({trip.reviews})</h2>
                {trip.tripReviews && trip.tripReviews.length > 0 ? (
                  trip.tripReviews.map((review) => (
                    <Card key={review.id} className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-800">{review.author}</h3>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                        <div className="text-yellow-500">{'⭐'.repeat(review.rating)}</div>
                      </div>
                      <p className="text-gray-700">{review.text}</p>
                      {review.verified && (
                        <div className="mt-3 text-sm text-green-600 flex items-center">
                          <FiCheck size={16} className="mr-1" />
                          Verified Booking
                        </div>
                      )}
                    </Card>
                  ))
                ) : (
                  <Card className="p-6 text-center">
                    <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <div className="mb-6">
                <div className="text-4xl font-bold text-orange-500 mb-2">
                  ₹{trip.price.toLocaleString()}
                </div>
                <p className="text-gray-600 text-sm">Per person</p>
              </div>

              <div className="mb-6 space-y-3 pb-6 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Dates:</span>
                  <span className="font-semibold">{trip.startDate}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Duration:</span>
                  <span className="font-semibold">{trip.duration} days</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Difficulty:</span>
                  <span className="font-semibold">{trip.difficulty}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Group Size:</span>
                  <span className="font-semibold">{trip.groupSize}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Seats Left:</span>
                  <span className={`font-semibold ${trip.availableSeats < 3 ? 'text-red-500' : 'text-green-500'}`}>
                    {trip.availableSeats}
                  </span>
                </div>
              </div>

              {user ? (
                <Button
                  fullWidth
                  onClick={() => navigate(`/booking/${trip.id}`)}
                  className="mb-3"
                >
                  Book Now
                </Button>
              ) : (
                <Button
                  fullWidth
                  onClick={() => navigate('/login')}
                  className="mb-3"
                >
                  Login to Book
                </Button>
              )}

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                <p className="font-semibold mb-2">✓ Free Travel Insurance</p>
                <p className="text-xs">Up to ₹4.5 lakhs coverage included</p>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                <p className="font-semibold mb-2">🧑‍🔬 Certified Leader</p>
                <p className="text-xs">AMC/BMC certified with first-aid training</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripDetail;
