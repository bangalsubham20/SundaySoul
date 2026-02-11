import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiChevronDown, FiPlus, FiX } from 'react-icons/fi';
import Button from '../common/Button';

const TripFilterHeader = ({ filters, onFilterChange, resultCount, onToggleAdvanced }) => {
  const destinations = ['Himalayas', 'Goa', 'Northeast', 'Kerala', 'Rajasthan', 'Ladakh'];
  const durations = ['3-5 days', '5-7 days', '7-10 days', '10+ days'];

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
    <div className="bg-teal-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-8 shadow-xl sticky top-24 z-30">
      <div className="flex flex-col gap-6">
        
        {/* Top Row: Location & Price Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative group z-20 w-full md:w-auto">
            <h3 className="text-sm font-bold text-grey-400 mb-2 flex items-center gap-2">
              Location <FiChevronDown />
            </h3>
            
            <div className="relative">
              <button className="w-full md:w-64 bg-white text-teal-900 font-bold px-6 py-3.5 rounded-2xl flex items-center justify-between hover:bg-grey-100 transition-colors shadow-lg shadow-black/10">
                <span className="truncate">
                  {filters.destination.length > 0 ? filters.destination.join(', ') : 'Select Destination'}
                </span>
                <FiMapPin className="text-cyan-600" size={20} />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl overflow-hidden hidden group-hover:block transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 p-2">
                {destinations.map(dest => (
                  <label key={dest} className="flex items-center gap-3 p-3 hover:bg-grey-100 rounded-xl cursor-pointer text-teal-900 font-medium transition-colors">
                    <input 
                      type="checkbox" 
                      className="rounded accent-cyan-600 w-5 h-5 border-grey-300"
                      checked={filters.destination.includes(dest)}
                      onChange={() => handleDestinationChange(dest)}
                    />
                    {dest}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Price Range Badge (Static/Interactive) */}
          <div className="flex flex-col items-end">
             <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-cyan-500/20">
              ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* Bottom Row: Quick Filters & Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
            <span className="text-sm font-bold text-grey-400 mr-2">Quick Filters:</span>
            
            {/* Duration Pills */}
            <div className="flex flex-wrap gap-2">
               {durations.slice(0, 3).map(dur => (
                 <button
                    key={dur}
                    onClick={() => handleDurationChange(dur)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                      filters.duration.includes(dur)
                        ? 'bg-cyan-500 border-cyan-500 text-teal-900 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                        : 'bg-white/5 border-white/10 text-grey-300 hover:bg-white/10 hover:border-white/30'
                    }`}
                 >
                   {dur}
                 </button>
               ))}
               <span className="text-xs text-grey-500 px-2">+ More</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleAdvanced}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
              activeFilterCount > 0 ? 'bg-cyan-500 shadow-cyan-500/40' : 'bg-blue-600 shadow-blue-600/30'
            }`}
          >
            <FiPlus size={24} className={`element-transition ${activeFilterCount ? 'rotate-45' : ''}`} />
          </motion.button>
        </div>

        {/* Result Count Badge */}
        <div className="absolute top-6 right-6 md:hidden">
            <span className="bg-black/40 text-xs font-bold px-3 py-1 rounded-full border border-white/10 text-cyan-400">
                {resultCount} Trips
            </span>
        </div>
      </div>
    </div>
  );
};

export default TripFilterHeader;
