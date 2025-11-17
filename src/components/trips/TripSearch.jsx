import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

function TripSearch({ onSearch, placeholder = "Search trips..." }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div
        className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
          isFocused ? 'shadow-lg ring-2 ring-orange-500' : 'shadow-md'
        }`}
        style={{
          background: 'rgba(255,255,255,0.95)',
        }}
      >
        <div className="flex items-center px-4 py-3">
          <motion.div
            animate={{ rotate: isFocused ? 0 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiSearch
              className={`transition-colors ${
                isFocused ? 'text-orange-500' : 'text-gray-400'
              }`}
              size={20}
            />
          </motion.div>

          <input
            aria-label="Trip search"
            type="text"
            value={searchTerm}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={e => { if (e.key === 'Escape') handleClear(); }}
            placeholder={placeholder}
            className="flex-1 ml-3 outline-none text-gray-800 placeholder-gray-500 text-base bg-transparent"
            autoComplete="off"
          />

          <AnimatePresence>
            {searchTerm && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 transition ml-2"
              >
                <FiX size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Search suggestions or feedback */}
        <AnimatePresence>
          {isFocused && searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-l border-r border-gray-200 rounded-b-lg shadow-lg z-10"
            >
              <div className="p-3 text-sm text-gray-600 text-center">
                Searching for: <span className="font-semibold text-gray-800">"{searchTerm}"</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default TripSearch;
