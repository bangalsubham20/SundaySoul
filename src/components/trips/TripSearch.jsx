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
        className={`relative rounded-xl overflow-hidden transition-all duration-300 border ${isFocused ? 'shadow-lg shadow-cyan-500/20 border-cyan-500/50' : 'shadow-md border-white/10'
          }`}
        style={{
          background: 'rgba(19, 78, 74, 0.6)', // teal-900/60
          backdropFilter: 'blur(12px)'
        }}
      >
        <div className="flex items-center px-4 py-3">
          <motion.div
            animate={{ rotate: isFocused ? 0 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiSearch
              className={`transition-colors ${isFocused ? 'text-cyan-400' : 'text-grey-400'
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
            className="flex-1 ml-3 outline-none text-white placeholder-grey-500 text-base bg-transparent font-medium"
            autoComplete="off"
          />

          <AnimatePresence>
            {searchTerm && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={handleClear}
                className="text-grey-400 hover:text-white transition ml-2"
              >
                <FiX size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default TripSearch;
