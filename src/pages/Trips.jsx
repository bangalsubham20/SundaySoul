import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import TripFilters from '../components/trips/TripFilters';
import { FiGrid, FiList } from 'react-icons/fi';

function Trips() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    difficulty: [],
    duration: [],
    destination: [],
    season: [],
    rating: 0,
    groupSize: [],
  });

  const allTrips = [
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
      image: 'https://images.pexels.com/photos/33527/monkeys-forest-bali-wildlife.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  // Apply filters
  const filteredTrips = useMemo(() => {
    return allTrips.filter((trip) => {
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
          const [min, max] = dur.split('-').map((d) => parseInt(d));
          return trip.durationDays >= min && trip.durationDays <= (max || 100);
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
  }, [filters]);

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
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Explore Trips</h1>
          <p className="text-gray-600">
            Found <span className="font-bold text-orange-500">{filteredTrips.length}</span> amazing trips
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <TripFilters onFilterChange={handleFilterChange} onReset={handleReset} />
          </div>

          {/* Trips Grid/List */}
          <div className="lg:col-span-3">
            {/* View Mode Toggle */}
            <div className="flex gap-2 mb-6 justify-end hidden lg:flex">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <FiGrid size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'list'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <FiList size={20} />
              </motion.button>
            </div>

            {/* Trips Display */}
            {filteredTrips.length > 0 ? (
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
                {filteredTrips.map((trip, index) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => navigate(`/trips/${trip.id}`)}
                    className="cursor-pointer"
                  >
                    {viewMode === 'grid' ? (
                      // Grid View
                      <Card className="overflow-hidden hover:shadow-lg transition">
                        <div className="relative h-48 overflow-hidden bg-gray-200">
                          <img
                            src={trip.image}
                            alt={trip.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute top-4 right-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full font-bold">
                            ⭐ {trip.rating}
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-800 mb-2">{trip.name}</h3>
                          <p className="text-gray-600 text-sm mb-4">{trip.destination}</p>

                          <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                            <div className="bg-gray-100 p-2 rounded">
                              <p className="text-gray-500 text-xs">Duration</p>
                              <p className="font-semibold text-gray-800">{trip.duration}</p>
                            </div>
                            <div className="bg-gray-100 p-2 rounded">
                              <p className="text-gray-500 text-xs">Difficulty</p>
                              <p className="font-semibold text-gray-800">{trip.difficulty}</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-orange-500 font-bold text-lg">
                              ₹{trip.price.toLocaleString()}
                            </span>
                            <Button size="sm" onClick={() => navigate(`/trips/${trip.id}`)}>
                              View
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ) : (
                      // List View
                      <Card className="overflow-hidden hover:shadow-lg transition p-6 flex gap-6">
                        <img
                          src={trip.image}
                          alt={trip.name}
                          className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                        />

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-gray-800">{trip.name}</h3>
                              <p className="text-gray-600">{trip.destination}</p>
                            </div>
                            <div className="text-yellow-500 font-bold">⭐ {trip.rating}</div>
                          </div>

                          <div className="flex gap-4 text-sm mb-4">
                            <div>
                              <p className="text-gray-500">Duration</p>
                              <p className="font-semibold text-gray-800">{trip.duration}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Difficulty</p>
                              <p className="font-semibold text-gray-800">{trip.difficulty}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Group Size</p>
                              <p className="font-semibold text-gray-800">{trip.groupSize}</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-orange-500 font-bold text-xl">
                              ₹{trip.price.toLocaleString()}
                            </span>
                            <Button size="sm" onClick={() => navigate(`/trips/${trip.id}`)}>
                              View Details
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-xl text-gray-600 mb-4">😔 No trips found matching your filters</p>
                <Button onClick={handleReset}>Clear Filters</Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trips;
