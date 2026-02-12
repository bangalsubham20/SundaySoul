import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiChevronDown, FiPlus, FiX, FiFilter, FiCheck } from 'react-icons/fi';
import Button from '../common/Button';
import { TRIP_DESTINATIONS, TRIP_DURATIONS } from '../../constants/tripOptions';

const TripFilterHeader = ({ filters, onFilterChange, resultCount, onToggleAdvanced }) => {
  const destinations = TRIP_DESTINATIONS;
  const durations = TRIP_DURATIONS;
  const [isLocOpen, setIsLocOpen] = useState(false);

  const handleDestinationChange = (dest) => {
    const newDestinations = filters.destination.includes(dest)
      ? filters.destination.filter(d => d !== dest)
      : [...filters.destination, dest];
    onFilterChange({ ...filters, destination: newDestinations });
  };

  const handleDurationChange = (dur) => {
    const newDurations = filters.duration.includes(dur)
      ? filters.duration.filter(d => d !== dur)
      : [...filters.duration, dur];
    onFilterChange({ ...filters, duration: newDurations });
  };

  const activeFilterCount = Object.values(filters).reduce((count, value) => {
    if (Array.isArray(value)) return count + value.length;
    if (typeof value === 'number' && value > 0) return count + 1;
    return count;
  }, 0);

  return (
    <div className="bg-teal-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 mb-8 shadow-2xl sticky top-24 z-30 transition-all hover:border-white/20">
      <div className="flex flex-col gap-6">

        {/* Top Row: Location & Price Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative z-20 w-full md:w-auto">
            <h3 className="text-xs font-bold text-grey-400 mb-2 uppercase tracking-widest flex items-center gap-2">
              <FiMapPin className="text-cyan-500" /> Filter by Location
            </h3>

            <div className="relative">
              <button
                onClick={() => setIsLocOpen(!isLocOpen)}
                onBlur={() => setTimeout(() => setIsLocOpen(false), 200)}
                className={`w-full md:w-72 bg-white/5 border border-white/10 text-white font-bold px-6 py-4 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all shadow-inner ${isLocOpen ? 'ring-2 ring-cyan-500/50 bg-white/10' : ''}`}
              >
                <span className="truncate text-lg">
                  {filters.destination.length > 0 ? filters.destination.join(', ') : 'All Destinations'}
                </span>
                <FiChevronDown className={`text-grey-400 transition-transform duration-300 ${isLocOpen ? 'rotate-180 text-cyan-400' : ''}`} size={20} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isLocOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-full mt-2 bg-teal-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 p-2"
                  >
                    <div className="max-h-60 overflow-y-auto custom-scrollbar p-1">
                      {destinations.map(dest => (
                        <label key={dest} className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl cursor-pointer text-white font-medium transition-colors group">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.destination.includes(dest) ? 'bg-cyan-500 border-cyan-500' : 'border-grey-500 group-hover:border-cyan-400'}`}>
                            {filters.destination.includes(dest) && <FiCheck size={14} className="text-teal-900" />}
                          </div>
                          {dest}
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Price Range Badge (Static info) */}
          <div className="flex flex-col items-end w-full md:w-auto">
            <div className="flex items-center gap-3 bg-black/40 px-5 py-3 rounded-2xl border border-white/5 hover:border-white/10 transition-colors w-full md:w-auto justify-between md:justify-end">
              <span className="text-xs text-grey-400 uppercase tracking-wider font-bold">Price Range</span>
              <span className="text-cyan-400 font-display font-bold text-lg">
                ₹{filters.priceRange[0] / 1000}k - ₹{filters.priceRange[1] / 1000}k
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Row: Quick Filters & Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
            <span className="text-xs font-bold text-grey-500 mr-2 uppercase tracking-widest hidden md:inline">Quick Filters:</span>

            {/* Duration Pills */}
            {durations.slice(0, 3).map(dur => (
              <button
                key={dur}
                onClick={() => handleDurationChange(dur)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${filters.duration.includes(dur)
                  ? 'bg-cyan-500 border-cyan-500 text-teal-900 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105'
                  : 'bg-white/5 border-white/10 text-grey-300 hover:bg-white/10 hover:border-white/30 hover:text-white'
                  }`}
              >
                {dur}
              </button>
            ))}
            <button
              onClick={onToggleAdvanced}
              className="text-xs text-cyan-400 hover:text-cyan-300 px-2 font-bold uppercase tracking-wider transition-colors"
            >
              + More
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleAdvanced}
            className={`px-6 py-3 rounded-xl flex items-center gap-2 text-white font-bold shadow-lg transition-all ${activeFilterCount > 0
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/20'
              : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
          >
            <FiFilter className={activeFilterCount > 0 ? "fill-white" : ""} />
            <span>All Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-white text-teal-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};



export default TripFilterHeader;
