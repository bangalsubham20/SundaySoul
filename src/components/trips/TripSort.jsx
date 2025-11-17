import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

function TripSort({ sortBy, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'recommended', label: '⭐ Recommended', description: 'Best for you' },
    { value: 'priceLowToHigh', label: '💰 Price: Low to High', description: 'Budget-friendly' },
    { value: 'priceHighToLow', label: '💰 Price: High to Low', description: 'Premium trips' },
    { value: 'ratingHighToLow', label: '🌟 Rating: High to Low', description: 'Top-rated' },
    { value: 'ratingLowToHigh', label: '⭐ Rating: Low to High', description: 'New & rising' },
    { value: 'durationShortToLong', label: '⏱️ Duration: Short to Long', description: 'Quick getaway' },
    { value: 'durationLongToShort', label: '⏱️ Duration: Long to Short', description: 'Extended trips' },
    { value: 'nameAZ', label: '🔤 Name: A-Z', description: 'Alphabetical' },
    { value: 'nameZA', label: '🔤 Name: Z-A', description: 'Reverse order' },
  ];

  const currentSort = sortOptions.find(opt => opt.value === sortBy);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full md:w-80"
    >
      {/* Dropdown Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 hover:border-orange-400 focus:border-orange-500 focus:outline-none bg-white text-gray-800 font-semibold cursor-pointer transition flex items-center justify-between shadow-md hover:shadow-lg"
      >
        <span className="flex items-center gap-2">
          {currentSort?.label || 'Sort by...'}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown size={20} className="text-gray-500" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30"
            />

            {/* Dropdown List */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 z-40 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="max-h-80 overflow-y-auto">
                {sortOptions.map((option, index) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => {
                      onSortChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left flex items-center justify-between transition-all border-b border-gray-100 hover:bg-orange-50 ${
                      sortBy === option.value ? 'bg-orange-100' : ''
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{option.label}</p>
                      <p className="text-xs text-gray-500">{option.description}</p>
                    </div>
                    {sortBy === option.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-orange-500"
                      >
                        <FiCheck size={20} />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Helper Text */}
      {currentSort && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-xs text-gray-500"
        >
          Sorted by: <span className="font-semibold text-orange-600">{currentSort.label}</span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default TripSort;
