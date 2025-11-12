import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../components/home/SearchBar';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

function Home() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
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
    },
    {
      id: 2,
      title: 'Goa Beach Escape',
      price: '₹22,000',
      desc: 'Relax, surf, and party at India\'s most vibrant coastal paradise.',
      img: 'https://images.pexels.com/photos/3552472/pexels-photo-3552472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.9,
    },
    {
      id: 3,
      title: 'Spiti Valley Expedition',
      price: '₹27,000',
      desc: 'Explore the cold desert\'s breathtaking beauty and monasteries.',
      img: 'https://images.pexels.com/photos/31307356/pexels-photo-31307356/free-photo-of-spectacular-view-of-key-monastery-in-winter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.7,
    },
  ];

  const categories = [
    { icon: '⛰️', name: 'Trekking' },
    { icon: '🎒', name: 'Backpacking' },
    { icon: '👩‍👩‍👩', name: 'All Girls' },
    { icon: '🏍️', name: 'Biking' },
    { icon: '🏕️', name: 'Weekend' },
    { icon: '✈️', name: 'International' },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Priya Singh',
      location: 'Delhi',
      text: 'WravelCommunity changed my travel life! Met amazing people and created unforgettable memories.',
      rating: 5,
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      location: 'Mumbai',
      text: 'Best experience ever! Professional team, perfect itinerary, and wonderful group bonding.',
      rating: 5,
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 3,
      name: 'Anjali Sharma',
      location: 'Bangalore',
      text: 'Loved every moment! Safe, fun, educational, and truly memorable adventure!',
      rating: 5,
      image: 'https://via.placeholder.com/80',
    },
  ];

  const features = [
    { icon: '🔒', title: 'Secure Bookings', desc: 'Safe & verified payments' },
    { icon: '🛡️', title: 'Travel Insurance', desc: 'Up to ₹4.5 lakhs coverage' },
    { icon: '👥', title: 'Verified Community', desc: 'Trusted travelers only' },
    { icon: '⭐', title: 'Rated 4.8★', desc: 'Thousands of happy travelers' },
  ];

  return (
    <div className="bg-white">
      {/* 🌅 Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[600px] bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 overflow-hidden flex items-center"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/2161499/pexels-photo-2161499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Animated Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

        {/* Content */}
        <div className="relative w-full max-w-7xl mx-auto px-4 py-20 text-center text-white z-10">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg leading-tight"
          >
            Wander. Travel. Connect. Repeat.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Join India's largest community of adventure seekers and explore hidden gems with like-minded travelers
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-2xl mx-auto mb-10"
          >
            <SearchBar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" onClick={() => navigate('/trips')} className="text-lg px-8">
                🧳 Explore Trips
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/community')}
                className="text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-blue-600"
              >
                👥 Join Community
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* 🌍 Featured Trips Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-24 bg-gradient-to-b from-white via-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              🌍 Featured <span className="text-blue-600">Trips</span>
            </h2>
            <p className="text-gray-600 text-lg">Handpicked adventures for the perfect getaway</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredTrips.map((trip, i) => (
              <motion.div
                key={trip.id}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                onClick={() => navigate(`/trips/${trip.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  <motion.img
                    src={trip.img}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Rating Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-4 right-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg"
                  >
                    ⭐ {trip.rating}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{trip.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">{trip.desc}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold text-lg">{trip.price}</span>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/trips/${trip.id}`);
                      }}>
                        View Details <FiArrowRight className="inline ml-1" size={16} />
                      </Button>
                    </motion.div>
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
            className="text-center mt-12"
          >
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/trips')}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              See All Trips <FiArrowRight className="inline ml-2" size={18} />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* 🏕️ Categories Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              📂 Explore by <span className="text-blue-600">Category</span>
            </h2>
            <p className="text-gray-600 text-lg">Find trips that match your travel style</p>
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
                whileHover={{ scale: 1.1, rotateY: 5 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer text-center border-2 border-transparent hover:border-blue-500"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl mb-3"
                >
                  {cat.icon}
                </motion.div>
                <p className="font-semibold text-gray-800 hover:text-blue-600 transition">{cat.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 📊 Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: '50K+', label: 'Active Members' },
              { number: '500+', label: 'Amazing Trips' },
              { number: '10K+', label: 'Happy Travelers' },
              { number: '4.8★', label: 'Average Rating' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group"
              >
                <motion.p
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition"
                >
                  {stat.number}
                </motion.p>
                <p className="text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 💬 Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              💬 What Travelers Say
            </h2>
            <p className="text-gray-600 text-lg">Join thousands of satisfied adventurers</p>
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
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-yellow-400"
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 🛡️ Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl text-center border-l-4 border-blue-600"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="text-4xl mb-3"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 🎉 CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready for Your Next Adventure?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg mb-10 text-orange-100"
          >
            Join our community today and start exploring amazing destinations with friends
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => navigate('/register')}
                className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 font-bold"
                size="lg"
              >
                Sign Up Now 🚀
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => navigate('/trips')}
                className="text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-orange-600"
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
        className="py-12 bg-white border-t"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-sm">
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
              >
                <p className="text-gray-600">
                  {item.icon} {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="text-gray-500">
            © 2025 WravelCommunity. All rights reserved. Made with ❤️ for adventurers.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

export default Home;
