import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../components/home/SearchBar';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { FiArrowRight, FiCheck, FiStar, FiTrendingUp, FiUsers } from 'react-icons/fi';

function Home() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const featuredTrips = [
    {
      id: 1,
      title: 'Himalayan Adventure',
      price: '₹18,500',
      desc: 'Trek through scenic mountain trails and experience the thrill of nature.',
      img: 'https://images.pexels.com/photos/2161499/pexels-photo-2161499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.8,
      duration: '8 days',
      difficulty: 'Moderate',
      tag: 'Popular',
    },
    {
      id: 2,
      title: 'Goa Beach Escape',
      price: '₹22,000',
      desc: 'Relax, surf, and party at India\'s most vibrant coastal paradise.',
      img: 'https://images.pexels.com/photos/3552472/pexels-photo-3552472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.9,
      duration: '5 days',
      difficulty: 'Easy',
      tag: 'Featured',
    },
    {
      id: 3,
      title: 'Spiti Valley Expedition',
      price: '₹27,000',
      desc: 'Explore the cold desert\'s breathtaking beauty and monasteries.',
      img: 'https://images.pexels.com/photos/31307356/pexels-photo-31307356/free-photo-of-spectacular-view-of-key-monastery-in-winter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.7,
      duration: '10 days',
      difficulty: 'Hard',
      tag: 'Trending',
    },
  ];

  const categories = [
    { icon: '⛰️', name: 'Trekking', color: 'from-primary-400 to-primary-600' },
    { icon: '🎒', name: 'Backpacking', color: 'from-accent-400 to-accent-600' },
    { icon: '👩‍👩‍👩', name: 'All Girls', color: 'from-pink-400 to-pink-600' },
    { icon: '🏍️', name: 'Biking', color: 'from-orange-400 to-orange-600' },
    { icon: '🏕️', name: 'Weekend', color: 'from-green-400 to-green-600' },
    { icon: '✈️', name: 'International', color: 'from-indigo-400 to-indigo-600' },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Priya Singh',
      location: 'Delhi',
      text: 'TravelCommunity changed my travel life! Met amazing people and created unforgettable memories.',
      rating: 5,
      image: 'https://i.pravatar.cc/80?img=1',
      role: 'Adventure Enthusiast',
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      location: 'Mumbai',
      text: 'Best experience ever! Professional team, perfect itinerary, and wonderful group bonding.',
      rating: 5,
      image: 'https://i.pravatar.cc/80?img=2',
      role: 'Travel Blogger',
    },
    {
      id: 3,
      name: 'Anjali Sharma',
      location: 'Bangalore',
      text: 'Loved every moment! Safe, fun, educational, and truly memorable adventure!',
      rating: 5,
      image: 'https://i.pravatar.cc/80?img=3',
      role: 'Photographer',
    },
  ];

  const features = [
    { icon: '🔒', title: 'Secure Bookings', desc: 'Safe & verified payments', color: 'from-blue-500 to-cyan-500' },
    { icon: '🛡️', title: 'Travel Insurance', desc: 'Up to ₹4.5 lakhs coverage', color: 'from-purple-500 to-pink-500' },
    { icon: '👥', title: 'Verified Community', desc: 'Trusted travelers only', color: 'from-green-500 to-emerald-500' },
    { icon: '⭐', title: 'Rated 4.8★', desc: 'Thousands of happy travelers', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="bg-slate-950 text-white overflow-hidden font-sans">
      {/* Hero Section with Parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen bg-gradient-to-br from-slate-950 via-primary-950 to-slate-950 overflow-hidden flex items-center"
      >
        {/* Animated Background Elements */}
        <motion.div
          animate={{
            x: mousePosition.x * 0.05,
            y: mousePosition.y * 0.05,
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: -mousePosition.x * 0.03,
            y: -mousePosition.y * 0.03,
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"
        />

        {/* Content */}
        <div className="relative w-full max-w-7xl mx-auto px-4 py-20 z-10">
          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 animate-gradient-x"
          >
            Wander. Travel. Connect.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-3xl text-slate-300 mb-12 max-w-2xl leading-relaxed font-light"
          >
            Join India's largest community of adventure seekers and explore hidden gems with like-minded travelers
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-2xl mb-12"
          >
            <SearchBar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => navigate('/trips')}
                className="text-lg px-8 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 shadow-xl shadow-primary-500/30"
              >
                🧳 Explore Trips
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                className="text-lg px-8 border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white transition-all shadow-lg shadow-accent-500/10"
              >
                🚀 Get Started
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Featured Trips */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-24 px-4 relative"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              🌍 Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">Trips</span>
            </h2>
            <p className="text-xl text-slate-400">Handpicked adventures for the perfect getaway</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredTrips.map((trip, idx) => (
              <motion.div
                key={trip.id}
                variants={itemVariants}
                whileHover={{ y: -15, boxShadow: '0 30px 60px rgba(139, 92, 246, 0.15)' }}
                onClick={() => navigate(`/trips/${trip.id}`)}
                className="group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-primary-500/50 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden bg-slate-800">
                  <motion.img
                    src={trip.img}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider"
                    >
                      {trip.tag}
                    </motion.span>
                  </div>

                  {/* Rating Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-4 right-4 flex items-center gap-1 bg-yellow-400 text-slate-950 px-3 py-1 rounded-full font-bold shadow-lg"
                  >
                    ⭐ {trip.rating}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition duration-300">{trip.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">{trip.desc}</p>

                  {/* Meta */}
                  <div className="flex gap-4 mb-6 text-xs text-slate-500 font-medium uppercase tracking-wide">
                    <span className="flex items-center gap-1">⏱️ {trip.duration}</span>
                    <span className="flex items-center gap-1">📊 {trip.difficulty}</span>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-white/10">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                      {trip.price}
                    </span>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary-500 hover:text-white transition-all"
                    >
                      <FiArrowRight size={20} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Button
              size="lg"
              onClick={() => navigate('/trips')}
              className="border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white px-12 rounded-full"
            >
              See All Trips <FiArrowRight className="inline ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-24 px-4 bg-slate-900/50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              📂 Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">Categories</span>
            </h2>
            <p className="text-xl text-slate-400">Find trips that match your travel style</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                onMouseEnter={() => setActiveCategory(i)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`relative p-6 rounded-3xl cursor-pointer group overflow-hidden border border-white/5 transition-all duration-300 ${activeCategory === i
                  ? 'bg-gradient-to-br ' + cat.color + ' shadow-2xl shadow-primary-500/20'
                  : 'bg-white/5 hover:bg-white/10'
                  }`}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl mb-4"
                >
                  {cat.icon}
                </motion.div>
                <p className={`font-bold text-lg transition-colors ${activeCategory === i ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}>
                  {cat.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-24 px-4 bg-gradient-to-r from-slate-950 via-primary-950/30 to-slate-950 border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: '50K+', label: 'Active Members', icon: FiUsers },
              { number: '500+', label: 'Amazing Trips', icon: FiTrendingUp },
              { number: '10K+', label: 'Happy Travelers', icon: FiCheck },
              { number: '4.8★', label: 'Average Rating', icon: FiStar },
            ].map((stat, i) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="text-center p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-primary-500/30 transition-all"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl md:text-5xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="flex items-center justify-center gap-2 text-slate-400 font-medium">
                    <IconComponent size={18} className="text-primary-500" />
                    <p>{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-24 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              💬 What Travelers <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">Say</span>
            </h2>
            <p className="text-xl text-slate-400">Join thousands of satisfied adventurers</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.1)' }}
                className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-primary-500/50 transition-all"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-xl text-yellow-400"
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>

                <p className="text-slate-300 mb-8 italic leading-relaxed text-lg">"{testimonial.text}"</p>

                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full border-2 border-primary-500"
                  />
                  <div>
                    <p className="font-bold text-white text-lg">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role} • {testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-32 px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 via-slate-900 to-primary-900/50" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight"
          >
            Ready for Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-primary-400">Adventure?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl text-slate-300 mb-12 font-light"
          >
            Join our community today and start exploring amazing destinations
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-500 hover:to-accent-400 text-white text-xl px-12 py-4 shadow-2xl shadow-primary-500/40 rounded-full"
                size="lg"
              >
                Sign Up Now 🚀
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => navigate('/trips')}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 text-xl px-12 py-4 rounded-full"
                size="lg"
              >
                Explore Trips
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-12 px-4 border-t border-white/5 bg-slate-950"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { icon: '🔒', text: 'Secure Bookings' },
              { icon: '🛡️', text: 'Travel Insurance' },
              { icon: '👥', text: 'Verified Community' },
              { icon: '⭐', text: 'Highly Rated' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-slate-500 hover:text-primary-400 transition-colors duration-300"
              >
                <p className="text-3xl mb-3">{item.icon}</p>
                <p className="text-sm font-medium uppercase tracking-wider">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-slate-600 border-t border-white/5 pt-8"
          >
            <p>© 2025 TravelCommunity. Made with ❤️ for adventurers.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

export default Home;
