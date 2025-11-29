import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiCalendar, FiMapPin } from 'react-icons/fi';
import Button from '../common/Button';

function SearchBar() {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      destination: destination || '',
      startDate: startDate || '',
    }).toString();
    navigate(`/trips?${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="backdrop-blur-xl bg-teal-900/60 border border-white/10 p-6 rounded-2xl shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2 border-b-2 border-white/10 pb-2 focus-within:border-cyan-500 transition-colors">
          <FiMapPin className="text-cyan-400" size={20} />
          <input
            type="text"
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1 outline-none bg-transparent text-white placeholder-grey-500 font-medium"
          />
        </div>

        <div className="flex items-center space-x-2 border-b-2 border-white/10 pb-2 focus-within:border-cyan-500 transition-colors">
          <FiCalendar className="text-cyan-400" size={20} />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="flex-1 outline-none bg-transparent text-white placeholder-grey-500 font-medium [color-scheme:dark]"
          />
        </div>

        <Button type="submit" fullWidth className="shadow-lg shadow-cyan-500/20">
          <FiSearch className="inline mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
}

export default SearchBar;
