import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

function TripSort({ sortBy, onSortChange }) {
  const sortOptions = [
    { value: 'recommended', label: '⭐ Recommended', icon: '✨' },
    { value: 'priceLowToHigh', label: '💰 Price: Low to High', icon: '📉' },
    { value: 'priceHighToLow', label: '💰 Price: High to Low', icon: '📈' },
    { value: 'ratingHighToLow', label: '⭐ Rating: High to Low', icon: '🌟' },
    { value: 'ratingLowToHigh', label: '⭐ Rating: Low to High', icon: '⭐' },
    { value: 'durationShortToLong', label: '⏱️ Duration: Short to Long', icon: '📅' },
    { value: 'durationLongToShort', label: '⏱️ Duration: Long to Short', icon: '📆' },
    { value: 'nameAZ', label: '🔤 Name: A-Z', icon: '📝' },
    { value: 'nameZA', label: '🔤 Name: Z-A', icon: '📜' },
  ];

  const currentSort = sortOptions.find(opt => opt.value === sortBy);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full md:w-80"
    >
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full px-4 py-3 pr-10 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none appearance-none bg-white text-gray-800 font-semibold cursor-pointer transition hover:border-orange-400"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />

      {/* Visual indicator */}
      <div className="absolute -bottom-8 left-0 text-xs text-gray-500">
        Sorted by: {currentSort?.label}
      </div>
    </motion.div>
  );
}

export default TripSort;
