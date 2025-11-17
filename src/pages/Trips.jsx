import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import TripFilters from '../components/trips/TripFilters';
import TripSort from '../components/trips/TripSort';
import TripSearch from '../components/trips/TripSearch';
import LoadingSpinner from '../components/common/LoadingSpinner';
import tripService from '../services/tripService';
import { FiGrid, FiList, FiArrowRight } from 'react-icons/fi';

// --- Mock Data ---
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

function Trips() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recommended');
  const [searchTerm, setSearchTerm] = useState('');
  const [tripsLoading, setTripsLoading] = useState(true);
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

  // Animated background elements
  const AnimatedBackground = () => (
    <>
      <motion.div className="fixed -top-96 -right-96 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-transparent blur-3xl -z-10"
        animate={{ y: [0, 60, 0], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="fixed -bottom-96 -left-96 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-transparent blur-3xl -z-10"
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="fixed top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-orange-500/20 via-pink-500/10 to-transparent blur-3xl -z-10"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity }} />
    </>
  );

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setTripsLoading(true);
        const trips = await tripService.getAllTrips();
        setAllTrips(trips);
      } catch (err) {
        setAllTrips(mockTrips);
      } finally {
        setTripsLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const searchedTrips = useMemo(() => {
    if (!searchTerm.trim()) return allTrips;
    const term = searchTerm.toLowerCase();
    return allTrips.filter((trip) => (
      trip.name.toLowerCase().includes(term) ||
      trip.destination.toLowerCase().includes(term) ||
      trip.description.toLowerCase().includes(term) ||
      (trip.tags && trip.tags.some(tag => tag.toLowerCase().includes(term))) ||
      trip.difficulty.toLowerCase().includes(term)
    ));
  }, [searchTerm, allTrips]);

  const filteredTrips = useMemo(() => {
    return searchedTrips.filter((trip) => {
      if (trip.price < filters.priceRange[0] || trip.price > filters.priceRange[1]) return false;
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(trip.difficulty)) return false;
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
      if (filters.destination.length > 0 && !filters.destination.includes(trip.destination)) return false;
      if (filters.season.length > 0 && !filters.season.includes(trip.season)) return false;
      if (filters.rating > 0 && trip.rating < filters.rating) return false;
      if (filters.groupSize.length > 0 && !filters.groupSize.includes(trip.groupSize)) return false;
      return true;
    });
  }, [searchedTrips, filters]);

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

  const handleFilterChange = (newFilters) => setFilters(newFilters);
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

  if (tripsLoading) return <LoadingSpinner />;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white pb-24 overflow-hidden">
      <AnimatedBackground />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-16 mb-12"
        >
          <div className="space-y-2 mb-4">
            <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-widest">
              🌍 Discover Adventures
            </p>
            <h1 className="text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-tight">
              Explore All Trips
            </h1>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl">
            Found <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">{sortedTrips.length}</span> premium adventures waiting for you
          </p>
        </motion.div>

        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="flex-1">
              <TripSearch
                onSearch={setSearchTerm}
                placeholder="🔍 Search adventure, destination, tag, difficulty..."
              />
            </div>
            <div className="flex gap-4 items-center">
              <TripSort sortBy={sortBy} onSortChange={setSortBy} />
              <div className="flex gap-2 bg-white/5 rounded-xl p-1 border border-white/10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <FiGrid size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <FiList size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <TripFilters onFilterChange={handleFilterChange} onReset={handleReset} />
            </div>
          </motion.div>

          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {sortedTrips.length > 0 ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    visible: { transition: { staggerChildren: 0.08 } },
                    hidden: {},
                  }}
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 gap-8'
                      : 'space-y-6'
                  }
                >
                  {sortedTrips.map((trip, index) => (
                    <motion.div
                      key={trip.id}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.06 }}
                      whileHover={{ y: -8 }}
                      onClick={() => navigate(`/trips/${trip.id}`)}
                      className="cursor-pointer group"
                    >
                      {viewMode === 'grid' ? (
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl hover:border-white/20 transition-all duration-500 hover:bg-white/8 h-full flex flex-col">
                          {/* Image Container */}
                          <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800">
                            <motion.img
                              src={trip.image}
                              alt={trip.name}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.12 }}
                              transition={{ duration: 0.6 }}
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                            {/* Badges */}
                            <div className="absolute top-4 right-4 flex gap-2">
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg"
                              >
                                {trip.difficulty}
                              </motion.span>
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="px-3 py-1 bg-yellow-500/90 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1"
                              >
                                ⭐ {trip.rating}
                              </motion.span>
                            </div>

                            {/* Price Badge */}
                            <div className="absolute bottom-4 left-4 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                              ₹{(trip.price / 1000).toFixed(0)}K
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition">
                              {trip.name}
                            </h3>
                            <p className="text-sm text-slate-400 mb-1">📍 {trip.destination}</p>
                            <p className="text-xs text-slate-500 mb-4 line-clamp-2">{trip.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4 flex-grow">
                              {(trip.tags || []).slice(0, 3).map(tag => (
                                <motion.span
                                  key={tag}
                                  whileHover={{ scale: 1.1 }}
                                  className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-300 rounded-full border border-purple-400/30 hover:border-purple-400/60 transition"
                                >
                                  {tag}
                                </motion.span>
                              ))}
                            </div>

                            {/* Info Row */}
                            <div className="flex gap-3 text-xs text-slate-400 mb-4 pb-4 border-t border-white/10">
                              <span className="mt-3">⏱️ {trip.duration}</span>
                              <span className="mt-3">👥 {trip.groupSize}</span>
                              <span className="mt-3">💬 {trip.reviews} reviews</span>
                            </div>

                            {/* CTA */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                              View Details <FiArrowRight size={16} />
                            </motion.button>
                          </div>
                        </div>
                      ) : (
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl hover:shadow-3xl hover:border-white/20 transition-all duration-500 p-6 flex gap-6 hover:bg-white/8">
                          <motion.img
                            src={trip.image}
                            alt={trip.name}
                            className="w-40 h-40 rounded-xl object-cover shadow-lg flex-shrink-0"
                            whileHover={{ scale: 1.08 }}
                          />
                          <div className="flex-1 flex justify-between items-start">
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-1">{trip.name}</h3>
                              <p className="text-sm text-slate-400 mb-2">📍 {trip.destination}</p>
                              <p className="text-sm text-slate-500 mb-4">{trip.description}</p>
                              <div className="flex gap-3 flex-wrap text-xs">
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">⏱️ {trip.duration}</span>
                                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full">📊 {trip.difficulty}</span>
                                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full">🌞 {trip.season}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
                                ₹{trip.price.toLocaleString()}
                              </p>
                              <p className="text-yellow-400 font-bold mt-2">⭐ {trip.rating}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-16 text-center"
                >
                  <p className="text-4xl mb-4">😔</p>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
                    No trips found
                  </h2>
                  <p className="text-slate-400 mb-6">
                    {searchTerm
                      ? `No trips match "${searchTerm}". Try different keywords.`
                      : 'Adjust your filters to discover adventures'}
                  </p>
                  <Button onClick={handleReset}>Clear All Filters</Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Footer */}
            {sortedTrips.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-12 text-center text-slate-400"
              >
                <p>
                  Showing <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">{sortedTrips.length}</span> adventures
                  {searchTerm && <span> for "{searchTerm}"</span>}
                  {' '}sorted by <span className="font-semibold text-slate-300">{sortBy}</span>
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
