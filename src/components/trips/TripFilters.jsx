import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';

function TripFilters({ onFilterChange, onReset, isOpen, onClose }) {
  const [expandedSection, setExpandedSection] = useState('price');

  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    difficulty: [],
    duration: [],
    destination: [],
    season: [],
    rating: 0,
    groupSize: [],
  });

  // ... (keep constants)
  const difficulties = ['Easy', 'Moderate', 'Hard', 'Extreme'];
  const durations = ['3-5 days', '5-7 days', '7-10 days', '10+ days'];
  const destinations = ['Himalayas', 'Goa', 'Northeast', 'Kerala', 'Rajasthan', 'Ladakh'];
  const seasons = ['Winter', 'Spring', 'Summer', 'Monsoon', 'Fall'];
  const groupSizes = ['Solo', 'Couple', 'Small Group (3-5)', 'Large Group (6+)'];

  const handlePriceChange = (e) => {
    const newPrice = [...filters.priceRange];
    if (e.target.name === 'min') {
      newPrice[0] = parseInt(e.target.value);
    } else {
      newPrice[1] = parseInt(e.target.value);
    }
    setFilters({ ...filters, priceRange: newPrice });
    onFilterChange({ ...filters, priceRange: newPrice });
  };

  const handleCheckboxChange = (filterType, value) => {
    const newFilters = { ...filters };
    const index = newFilters[filterType].indexOf(value);

    if (index > -1) {
      newFilters[filterType].splice(index, 1);
    } else {
      newFilters[filterType].push(value);
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const activeFilterCount = Object.values(filters).reduce((count, value) => {
    if (Array.isArray(value)) return count + value.length;
    if (typeof value === 'number' && value > 0) return count + 1;
    return count;
  }, 0);

  const handleRatingChange = (rating) => {
    const newFilters = { ...filters, rating };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      priceRange: [0, 50000],
      difficulty: [],
      duration: [],
      destination: [],
      season: [],
      rating: 0,
      groupSize: [],
    };
    setFilters(resetFilters);
    onReset();
  };

  const FilterSection = ({ title, children, sectionId }) => (
    <div className="border-b border-white/10">
      <button
        onClick={() => setExpandedSection(expandedSection === sectionId ? null : sectionId)}
        className="w-full py-4 flex items-center justify-between hover:bg-white/5 transition px-2 rounded-lg"
      >
        <h3 className="font-semibold text-white">{title}</h3>
        <motion.div
          animate={{ rotate: expandedSection === sectionId ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown size={20} className="text-grey-400" />
        </motion.div>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: expandedSection === sectionId ? 'auto' : 0,
          opacity: expandedSection === sectionId ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pb-4 space-y-3 px-2">{children}</div>
      </motion.div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Filter Panel (Drawer) */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 w-full md:w-[400px] h-full bg-teal-900 border-l border-white/10 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-teal-950/50">
              <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <FiFilter className="text-cyan-400" /> Filters
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-grey-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {/* Price Range */}
              <FilterSection title="💰 Price Range" sectionId="price">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-grey-300">
                      Min: ₹{filters.priceRange[0].toLocaleString()}
                    </label>
                    <input
                      type="range"
                      name="min"
                      min="0"
                      max="50000"
                      step="1000"
                      value={filters.priceRange[0]}
                      onChange={handlePriceChange}
                      className="w-full cursor-pointer accent-cyan-500 bg-white/10 rounded-lg h-2 appearance-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-grey-300">
                      Max: ₹{filters.priceRange[1].toLocaleString()}
                    </label>
                    <input
                      type="range"
                      name="max"
                      min="0"
                      max="50000"
                      step="1000"
                      value={filters.priceRange[1]}
                      onChange={handlePriceChange}
                      className="w-full cursor-pointer accent-cyan-500 bg-white/10 rounded-lg h-2 appearance-none"
                    />
                  </div>
                </div>
              </FilterSection>

              {/* Difficulty */}
              <FilterSection title="⛰️ Difficulty" sectionId="difficulty">
                <div className="space-y-2">
                  {difficulties.map((diff) => (
                    <label key={diff} className="flex items-center cursor-pointer hover:bg-white/5 p-2 rounded-lg transition">
                      <input
                        type="checkbox"
                        checked={filters.difficulty.includes(diff)}
                        onChange={() => handleCheckboxChange('difficulty', diff)}
                        className="w-4 h-4 rounded accent-cyan-500 bg-white/10 border-white/20"
                      />
                      <span className="ml-2 text-grey-300">{diff}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Duration */}
              <FilterSection title="⏱️ Duration" sectionId="duration">
                <div className="space-y-2">
                  {durations.map((dur) => (
                    <label key={dur} className="flex items-center cursor-pointer hover:bg-white/5 p-2 rounded-lg transition">
                      <input
                        type="checkbox"
                        checked={filters.duration.includes(dur)}
                        onChange={() => handleCheckboxChange('duration', dur)}
                        className="w-4 h-4 rounded accent-cyan-500 bg-white/10 border-white/20"
                      />
                      <span className="ml-2 text-grey-300">{dur}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Destination */}
              <FilterSection title="🗺️ Destination" sectionId="destination">
                <div className="space-y-2">
                  {destinations.map((dest) => (
                    <label key={dest} className="flex items-center cursor-pointer hover:bg-white/5 p-2 rounded-lg transition">
                      <input
                        type="checkbox"
                        checked={filters.destination.includes(dest)}
                        onChange={() => handleCheckboxChange('destination', dest)}
                        className="w-4 h-4 rounded accent-cyan-500 bg-white/10 border-white/20"
                      />
                      <span className="ml-2 text-grey-300">{dest}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Season */}
              <FilterSection title="🌞 Season" sectionId="season">
                <div className="space-y-2">
                  {seasons.map((season) => (
                    <label key={season} className="flex items-center cursor-pointer hover:bg-white/5 p-2 rounded-lg transition">
                      <input
                        type="checkbox"
                        checked={filters.season.includes(season)}
                        onChange={() => handleCheckboxChange('season', season)}
                        className="w-4 h-4 rounded accent-cyan-500 bg-white/10 border-white/20"
                      />
                      <span className="ml-2 text-grey-300">{season}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Group Size */}
              <FilterSection title="👥 Group Size" sectionId="groupSize">
                <div className="space-y-2">
                  {groupSizes.map((size) => (
                    <label key={size} className="flex items-center cursor-pointer hover:bg-white/5 p-2 rounded-lg transition">
                      <input
                        type="checkbox"
                        checked={filters.groupSize.includes(size)}
                        onChange={() => handleCheckboxChange('groupSize', size)}
                        className="w-4 h-4 rounded accent-cyan-500 bg-white/10 border-white/20"
                      />
                      <span className="ml-2 text-grey-300">{size}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Rating */}
              <FilterSection title="⭐ Minimum Rating" sectionId="rating">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRatingChange(rating)}
                      className={`w-full text-left py-2 px-3 rounded-lg transition flex items-center gap-2 ${filters.rating === rating
                        ? 'bg-cyan-900/40 text-cyan-400 font-semibold border border-cyan-500/30'
                        : 'hover:bg-white/5 text-grey-300'
                        }`}
                    >
                      <span>{'⭐'.repeat(rating)}</span>
                      <span className="text-sm">& up</span>
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3 border-t border-white/10 mt-4">
                {activeFilterCount > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleResetFilters}
                    className="w-full py-2 px-4 border border-white/20 text-grey-300 rounded-lg font-semibold hover:bg-white/10 transition"
                  >
                    Clear All Filters
                  </motion.button>
                )}

                <div className="lg:hidden">
                  <Button fullWidth onClick={onClose}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default TripFilters;
