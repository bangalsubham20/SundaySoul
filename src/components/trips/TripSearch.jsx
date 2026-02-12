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
      className="w-full relative group"
    >
      {/* Glow Effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-0 transition duration-500 blur ${isFocused ? 'opacity-30' : 'group-hover:opacity-20'}`}
      />

      <div
        className={`relative rounded-2xl overflow-hidden transition-all duration-300 border ${isFocused ? 'bg-teal-900/80 border-cyan-500/50 shadow-lg shadow-cyan-500/10' : 'bg-teal-900/60 border-white/10 hover:bg-teal-900/70 hover:border-white/20'
          }`}
        style={{
          backdropFilter: 'blur(16px)'
        }}
      >
        <div className="flex items-center px-5 py-4">
          <motion.div
            animate={{
              scale: isFocused ? 1.1 : 1,
              rotate: isFocused ? -10 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            <FiSearch
              className={`transition-colors ${isFocused ? 'text-cyan-400' : 'text-grey-400 group-hover:text-cyan-200'
                }`}
              size={22}
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
            className="flex-1 ml-4 outline-none text-white placeholder-grey-500 text-lg bg-transparent font-medium tracking-wide"
            autoComplete="off"
          />

          <AnimatePresence>
            {searchTerm && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClear}
                className="bg-white/10 hover:bg-white/20 text-grey-300 rounded-full p-1.5 transition-colors ml-2"
              >
                <FiX size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default TripSearch;
