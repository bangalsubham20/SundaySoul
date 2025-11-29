import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import { FiCompass, FiMap, FiArrowLeft } from 'react-icons/fi';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-teal-900 flex items-center justify-center px-4 relative overflow-hidden selection:bg-cyan-500 selection:text-teal-900">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-950 via-teal-900 to-black z-0" />

      {/* Animated Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Glitch Effect */}
          <div className="relative inline-block mb-8">
            <h1 className="text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 tracking-tighter">
              404
            </h1>
            <motion.div
              animate={{ x: [-2, 2, -2], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0 text-9xl font-display font-black text-cyan-500/30 blur-sm tracking-tighter"
            >
              404
            </motion.div>
          </div>

          <h2 className="text-4xl font-display font-bold text-white mb-4">
            Lost in the Wilderness?
          </h2>

          <p className="text-xl text-grey-400 mb-12 leading-relaxed">
            It seems you've ventured off the beaten path. The page you're looking for has either moved or doesn't exist in our map.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => navigate('/')}
                className="min-w-[200px] flex items-center justify-center gap-2"
              >
                <FiCompass size={20} />
                Return Home
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => navigate('/trips')}
                className="min-w-[200px] flex items-center justify-center gap-2"
              >
                <FiMap size={20} />
                Explore Trips
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <button
              onClick={() => navigate(-1)}
              className="text-grey-500 hover:text-cyan-400 transition-colors flex items-center gap-2 mx-auto text-sm font-semibold"
            >
              <FiArrowLeft /> Go Back
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;
