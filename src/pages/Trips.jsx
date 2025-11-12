import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import TripFilters from '../components/trips/TripFilters';
import TripSort from '../components/trips/TripSort';
import TripSearch from '../components/trips/TripSearch';
import LoadingSpinner from '../components/common/LoadingSpinner';
import tripService from '../services/tripService';
import { FiGrid, FiList } from 'react-icons/fi';

function Trips() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recommended');
  const [searchTerm, setSearchTerm] = useState('');
  const [tripsLoading, setTripsLoading] = useState(true);
  const [tripsError, setTripsError] = useState(null);
  const [allTrips, setAllTrips] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    difficulty: [],
    duration: [],
    destination: [],
    season: [],
    rating: 0,
    groupSize: [],
  });

  // Mock data as fallback
  const mockTrips = [
    {
      id: 1,
      name: 'Winter Spiti Valley',
      destination: 'Spiti Valley',
      price: 21150,
      duration: '8 days',
      durationDays: 8,
      rating: 4.8,
      reviews: 245,
      difficulty: 'Moderate',
      season: 'Winter',
      groupSize: 'Small Group (3-5)',
      description: 'Experience the frozen beauty of Spiti Valley with stunning monasteries and breathtaking landscapes.',
      tags: ['monastery', 'trek', 'mountains', 'winter'],
      image: 'https://images.pexels.com/photos/31307356/pexels-photo-31307356/free-photo-of-spectacular-view-of-key-monastery-in-winter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      name: 'Leh Ladakh Adventure',
      destination: 'Ladakh',
      price: 34650,
      duration: '7 days',
      durationDays: 7,
      rating: 4.9,
      reviews: 312,
      difficulty: 'Moderate-Hard',
      season: 'Summer',
      groupSize: 'Large Group (6+)',
      description: 'Experience the raw beauty of Ladakh with high altitude deserts and ancient monasteries.',
      tags: ['adventure', 'desert', 'monastery', 'mountains'],
      image: 'https://images.pexels.com/photos/34555164/pexels-photo-34555164/free-photo-of-adventurer-resting-with-motorcycle-by-scenic-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 3,
      name: 'Kerala Backpacking',
      destination: 'Kerala',
      price: 16650,
      duration: '6 days',
      durationDays: 6,
      rating: 4.7,
      reviews: 189,
      difficulty: 'Easy',
      season: 'Monsoon',
      groupSize: 'Solo',
      description: 'Relax in Kerala\'s backwaters, beaches, and lush green landscapes.',
      tags: ['backpack', 'beach', 'relax', 'backwater'],
      image: 'https://images.pexels.com/photos/12144055/pexels-photo-12144055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 4,
      name: 'Goa Beach Escape',
      destination: 'Goa',
      price: 12500,
      duration: '5 days',
      durationDays: 5,
      rating: 4.6,
      reviews: 456,
      difficulty: 'Easy',
      season: 'Winter',
      groupSize: 'Couple',
      description: 'Relax, surf, and party at India\'s most vibrant coastal paradise.',
      tags: ['beach', 'party', 'surf', 'relaxation'],
      image: 'https://images.pexels.com/photos/3552472/pexels-photo-3552472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 5,
      name: 'Himachal Trekking',
      destination: 'Himalayas',
      price: 18900,
      duration: '7 days',
      durationDays: 7,
      rating: 4.8,
      reviews: 234,
      difficulty: 'Hard',
      season: 'Spring',
      groupSize: 'Small Group (3-5)',
      description: 'Trek through scenic mountain trails and experience the thrill of nature.',
      tags: ['trek', 'mountains', 'adventure', 'hiking'],
      image: 'https://images.pexels.com/photos/2161499/pexels-photo-2161499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 6,
      name: 'Northeast Adventure',
      destination: 'Northeast',
      price: 24500,
      duration: '10 days',
      durationDays: 10,
      rating: 4.9,
      reviews: 178,
      difficulty: 'Moderate',
      season: 'Fall',
      groupSize: 'Large Group (6+)',
      description: 'Explore the exotic landscapes and culture of Northeast India.',
      tags: ['adventure', 'culture', 'nature', 'wildlife'],
      image: 'https://images.pexels.com/photos/33527/monkeys-forest-bali-wildlife.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  // Fetch trips from backend on mount
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setTripsLoading(true);
        setTripsError(null);
        
        // Try to fetch from backend
        const trips = await tripService.getAllTrips();
        setAllTrips(trips);
      } catch (err) {
        console.warn('Backend unavailable, using mock data:', err);
        // Use mock data as fallback
        setAllTrips(mockTrips);
        setTripsError(null);
      } finally {
        setTripsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Apply search filter
  const searchedTrips = useMemo(() => {
    if (!searchTerm.trim()) return allTrips;

    const term = searchTerm.toLowerCase();
    return allTrips.filter((trip) => {
      return (
        trip.name.toLowerCase().includes(term) ||
        trip.destination.toLowerCase().includes(term) ||
        trip.description.toLowerCase().includes(term) ||
        (trip.tags && trip.tags.some(tag => tag.toLowerCase().includes(term))) ||
        trip.difficulty.toLowerCase().includes(term)
      );
    });
  }, [searchTerm, allTrips]);

  // Apply filters
  const filteredTrips = useMemo(() => {
    return searchedTrips.filter((trip) => {
      // Price filter
      if (trip.price < filters.priceRange[0] || trip.price > filters.priceRange[1]) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(trip.difficulty)) {
        return false;
      }

      // Duration filter
      if (filters.duration.length > 0) {
        const durationMatch = filters.duration.some((dur) => {
          if (dur === '3-5 days') return trip.durationDays >= 3 && trip.durationDays <= 5;
          if (dur === '5-7 days') return trip.durationDays >= 5 && trip.durationDays <= 7;
          if (dur === '7-10 days') return trip.durationDays >= 7 && trip.durationDays <= 10;
          if (dur === '10+ days') return trip.durationDays >= 10;
          return false;
        });
        if (!durationMatch) return false;
      }

      // Destination filter
      if (filters.destination.length > 0 && !filters.destination.includes(trip.destination)) {
        return false;
      }

      // Season filter
      if (filters.season.length > 0 && !filters.season.includes(trip.season)) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && trip.rating < filters.rating) {
        return false;
      }

      // Group size filter
      if (filters.groupSize.length > 0 && !filters.groupSize.includes(trip.groupSize)) {
        return false;
      }

      return true;
    });
  }, [searchedTrips, filters]);

  // Apply sorting
  const sortedTrips = useMemo(() => {
    const trips = [...filteredTrips];

    switch (sortBy) {
      case 'priceLowToHigh':
        return trips.sort((a, b) => a.price - b.price);
      case 'priceHighToLow':
        return trips.sort((a, b) => b.price - a.price);
      case 'ratingHighToLow':
        return trips.sort((a, b) => b.rating - a.rating);
      case 'ratingLowToHigh':
        return trips.sort((a, b) => a.rating - b.rating);
      case 'durationShortToLong':
        return trips.sort((a, b) => a.durationDays - b.durationDays);
      case 'durationLongToShort':
        return trips.sort((a, b) => b.durationDays - a.durationDays);
      case 'nameAZ':
        return trips.sort((a, b) => a.name.localeCompare(b.name));
      case 'nameZA':
        return trips.sort((a, b) => b.name.localeCompare(a.name));
      case 'recommended':
      default:
        return trips.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    }
  }, [filteredTrips, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({
      priceRange: [0, 50000],
      difficulty: [],
      duration: [],
      destination: [],
      season: [],
      rating: 0,
      groupSize: [],
    });
    setSearchTerm('');
  };

  // Show loading state
  if (tripsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Explore Trips</h1>
          <p className="text-gray-600">
            Found <span className="font-bold text-orange-500">{sortedTrips.length}</span> amazing trips
          </p>
          {!tripsError && allTrips.length > 0 && (
            <p className="text-xs text-green-600 mt-2">✓ Connected to backend</p>
          )}
        </div>

        {/* Search Bar - Full Width */}
        <div className="mb-8">
          <TripSearch
            onSearch={setSearchTerm}
            placeholder="🔍 Search by trip name, destination, difficulty..."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <TripFilters onFilterChange={handleFilterChange} onReset={handleReset} />
          </div>

          {/* Trips Grid/List */}
          <div className="lg:col-span-3">
            {/* Top Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
              {/* Sort Component */}
              <div className="w-full md:w-auto">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort by</label>
                <TripSort sortBy={sortBy} onSortChange={setSortBy} />
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2 hidden lg:flex">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition ${
                    viewMode === 'grid'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  title="Grid View"
                >
                  <FiGrid size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition ${
                    viewMode === 'list'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  title="List View"
                >
                  <FiList size={20} />
                </motion.button>
              </div>
            </div>

            {/* Trips Display */}
            {sortedTrips.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-8'
                    : 'space-y-4'
                }
              >
                {sortedTrips.map((trip, index) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    onClick={() => navigate(`/trips/${trip.id}`)}
                    className="cursor-pointer"
                  >
                    {viewMode === 'grid' ? (
                      // Grid View
                      <Card className="overflow-hidden hover:shadow-lg transition h-full">
                        <div className="relative h-48 overflow-hidden bg-gray-200">
                          <img
                            src={trip.image}
                            alt={trip.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                          {/* Rating Badge */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full font-bold text-sm"
                          >
                            ⭐ {trip.rating}
                          </motion.div>

                          {/* Price Badge */}
                          <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                            ₹{trip.price.toLocaleString()}
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-800 mb-1">{trip.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">📍 {trip.destination}</p>
                          <p className="text-gray-600 text-xs mb-4 line-clamp-2">{trip.description}</p>

                          <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                            <div className="bg-blue-50 p-2 rounded text-center">
                              <p className="text-gray-500">Duration</p>
                              <p className="font-semibold text-gray-800">{trip.durationDays}d</p>
                            </div>
                            <div className="bg-green-50 p-2 rounded text-center">
                              <p className="text-gray-500">Level</p>
                              <p className="font-semibold text-gray-800 truncate">{trip.difficulty.split('-')[0]}</p>
                            </div>
                            <div className="bg-purple-50 p-2 rounded text-center">
                              <p className="text-gray-500">Reviews</p>
                              <p className="font-semibold text-gray-800">{trip.reviews}</p>
                            </div>
                          </div>

                          <Button
                            fullWidth
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/trips/${trip.id}`);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </Card>
                    ) : (
                      // List View
                      <Card className="overflow-hidden hover:shadow-lg transition p-6 flex gap-6 items-center">
                        <img
                          src={trip.image}
                          alt={trip.name}
                          className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                        />

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-gray-800">{trip.name}</h3>
                              <p className="text-gray-600 text-sm">📍 {trip.destination}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-orange-500 text-lg">
                                ₹{trip.price.toLocaleString()}
                              </div>
                              <div className="text-yellow-500 font-bold">⭐ {trip.rating}</div>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-3">{trip.description}</p>

                          <div className="flex gap-6 text-sm mb-4 flex-wrap">
                            <div>
                              <p className="text-gray-500 text-xs">Duration</p>
                              <p className="font-semibold text-gray-800">{trip.duration}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Difficulty</p>
                              <p className="font-semibold text-gray-800">{trip.difficulty}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Group Size</p>
                              <p className="font-semibold text-gray-800">{trip.groupSize}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Season</p>
                              <p className="font-semibold text-gray-800">{trip.season}</p>
                            </div>
                          </div>

                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/trips/${trip.id}`);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-2xl text-gray-600 mb-4">😔 No trips found</p>
                <p className="text-gray-500 mb-6">
                  {searchTerm
                    ? `No trips match "${searchTerm}". Try different keywords or adjust filters.`
                    : 'Try adjusting your filters to find more trips'}
                </p>
                <Button onClick={handleReset}>Clear All Filters & Search</Button>
              </Card>
            )}

            {/* Results Summary */}
            {sortedTrips.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-center text-sm text-gray-600"
              >
                <p>
                  Showing <span className="font-bold text-orange-500">{sortedTrips.length}</span> trips
                  {searchTerm && <span> for "{searchTerm}"</span>}
                  {' '}sorted by <span className="font-bold">{sortBy === 'recommended' ? 'recommendation' : sortBy}</span>
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trips;
