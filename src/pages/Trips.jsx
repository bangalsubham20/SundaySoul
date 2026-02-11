import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import TripFilters from '../components/trips/TripFilters';
import TripSort from '../components/trips/TripSort';
import TripSearch from '../components/trips/TripSearch';
import TripFilterHeader from '../components/trips/TripFilterHeader';
import LoadingSpinner from '../components/common/LoadingSpinner';
import tripService from '../services/tripService';
import { FiGrid, FiList, FiArrowRight, FiMapPin, FiClock, FiUsers, FiStar, FiActivity } from 'react-icons/fi';

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
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=2070&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1624823183492-2629a8a77a63?q=80&w=2070&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1595842858228-444327759529?q=80&w=2070&auto=format&fit=crop',
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

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

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
    <div className="min-h-screen bg-teal-900 text-white pb-24 font-sans selection:bg-cyan-500 selection:text-teal-900">
      {/* Filters Drawer */}
      <TripFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* Hero Banner */}
      <div className="relative h-[40vh] overflow-hidden mb-12">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
          alt="Trips Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-black text-white mb-4 tracking-tight"
          >
            Explore <span className="text-cyan-400">Expeditions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-grey-300 max-w-2xl font-light"
          >
            Curated journeys for the modern adventurer. Find your next story.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* New Filter Header */}
        <TripFilterHeader
          filters={filters}
          onFilterChange={handleFilterChange}
          resultCount={sortedTrips.length}
          onToggleAdvanced={() => setShowAdvancedFilters(true)}
        />

        {/* Controls Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-6 items-center justify-between">
          <h2 className="text-2xl font-bold font-display hidden md:block">
            {sortedTrips.length} Trips Available
          </h2>

          <div className="flex gap-4 items-center w-full md:w-auto">
            <div className="flex-1 md:w-64">
              <TripSearch
                onSearch={setSearchTerm}
                placeholder="Search trips..."
              />
            </div>
            <TripSort sortBy={sortBy} onSortChange={setSortBy} />
            <div className="flex gap-2 bg-black/20 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                  ? 'bg-cyan-500 text-teal-900 shadow-lg'
                  : 'text-grey-400 hover:text-white'
                  }`}
              >
                <FiGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                  ? 'bg-cyan-500 text-teal-900 shadow-lg'
                  : 'text-grey-400 hover:text-white'
                  }`}
              >
                <FiList size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Trips Grid - Full Width */}
        <AnimatePresence mode="wait">
          {sortedTrips.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
                hidden: {},
              }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
              }
            >
              {sortedTrips.map((trip) => (
                <motion.div
                  key={trip.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -5 }}
                  onClick={() => navigate(`/trips/${trip.id}`)}
                  className={`group cursor-pointer relative overflow-hidden rounded-3xl bg-teal-800/30 border border-white/5 hover:border-cyan-500/30 transition-all duration-500 ${viewMode === 'list' ? 'flex flex-col md:flex-row h-auto md:h-64' : 'flex flex-col h-[500px]'
                    }`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-full md:w-1/3 h-48 md:h-full' : 'h-3/5 w-full'}`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img
                      src={trip.image}
                      alt={trip.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                        {trip.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-6 flex flex-col justify-between ${viewMode === 'list' ? 'flex-1' : 'flex-1'}`}>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {trip.name}
                        </h3>
                        <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                          <FiStar fill="currentColor" /> {trip.rating}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-grey-400 text-sm mb-4">
                        <FiMapPin className="text-cyan-500" /> {trip.destination}
                      </div>

                      <p className="text-grey-400 text-sm line-clamp-2 mb-4 font-light">
                        {trip.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {(trip.tags || []).slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 text-grey-300 border border-white/5">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                      <div className="flex gap-4 text-xs font-medium text-grey-400 uppercase tracking-wide">
                        <span className="flex items-center gap-1"><FiClock className="text-cyan-500" /> {trip.duration}</span>
                        <span className="flex items-center gap-1"><FiUsers className="text-cyan-500" /> {trip.groupSize}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs text-grey-500 uppercase tracking-wider">Starting from</span>
                        <span className="text-xl font-bold text-white">₹{trip.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center"
            >
              <div className="text-6xl mb-6">🏔️</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Expeditions Found</h3>
              <p className="text-grey-400 mb-8">Try adjusting your filters or search for something else.</p>
              <Button onClick={handleReset} className="btn-primary">Clear Filters</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Trips;
