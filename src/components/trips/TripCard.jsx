import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiUsers, FiStar, FiArrowRight, FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const TripCard = ({ trip, variant = 'compact' }) => {
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);

    // Variant Styles
    const isFeatured = variant === 'featured';
    const isWide = variant === 'wide';
    const isCompact = variant === 'compact';

    const handleLike = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -5, transition: { duration: 0.4, ease: "easeOut" } }}
            onClick={() => navigate(`/trips/${trip.id}`)}
            className={`group cursor-pointer relative overflow-hidden rounded-[2rem] bg-teal-900/40 backdrop-blur-md border border-white/5 hover:border-cyan-500/30 transition-all duration-500 shadow-xl hover:shadow-cyan-500/10 ${isFeatured ? 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2 h-[600px]' :
                    isWide ? 'col-span-1 md:col-span-2 h-[280px] flex flex-row' :
                        'col-span-1 h-[440px] flex flex-col'
                }`}
        >
            {/* Image Section */}
            <div className={`relative overflow-hidden ${isFeatured ? 'absolute inset-0 z-0' :
                    isWide ? 'w-5/12 h-full' :
                        'h-[55%] w-full'
                }`}>
                {/* Gradients */}
                <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${isFeatured ? 'bg-gradient-to-t from-teal-900/90 via-teal-900/40 to-transparent' :
                        'bg-gradient-to-t from-teal-900/80 via-transparent to-transparent'
                    }`} />

                {/* Image Zoom Effect */}
                <motion.img
                    src={trip.image}
                    alt={trip.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    loading="lazy"
                />

                {/* Badges */}
                <div className="absolute top-5 left-5 z-20 flex gap-2">
                    {isFeatured && (
                        <span className="px-3 py-1.5 text-xs font-black uppercase tracking-widest rounded-full bg-cyan-500/90 backdrop-blur-md text-teal-900 shadow-lg shadow-cyan-500/20 border border-cyan-400">
                            Featured
                        </span>
                    )}
                    {trip.difficulty && (
                        <span className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md border shadow-lg ${trip.difficulty === 'Easy' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' :
                                trip.difficulty === 'Moderate' ? 'bg-amber-500/20 border-amber-500/30 text-amber-300' :
                                    'bg-rose-500/20 border-rose-500/30 text-rose-300'
                            }`}>
                            {trip.difficulty}
                        </span>
                    )}
                </div>

                {/* Like Button */}
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={handleLike}
                    className={`absolute top-5 right-5 z-20 p-2.5 rounded-full backdrop-blur-xl border transition-all ${isLiked
                            ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/30'
                            : 'bg-black/20 text-white border-white/10 hover:bg-white/10 group-hover:border-white/30'
                        }`}
                >
                    <FiHeart size={18} className={isLiked ? "fill-current" : ""} />
                </motion.button>
            </div>

            {/* Content Section */}
            <div className={`relative z-20 flex flex-col justify-between ${isFeatured ? 'h-full justify-end p-8' :
                    isWide ? 'w-7/12 p-6 pl-8' :
                        'h-[45%] p-6'
                }`}>

                <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-2">
                        <div className="w-full">
                            {isFeatured && (
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-bold uppercase tracking-widest bg-cyan-500/10 px-2 py-1 rounded-md border border-cyan-500/20">
                                        <FiMapPin /> {trip.destination}
                                    </div>
                                </div>
                            )}
                            <h3 className={`font-display font-normal text-white leading-tight group-hover:text-cyan-400 transition-colors ${isFeatured ? 'text-5xl mb-3 max-w-2xl drop-shadow-lg' : 'text-xl mb-1 line-clamp-1'
                                }`}>
                                {trip.name}
                            </h3>
                        </div>

                        {!isFeatured && (
                            <div className="flex flex-col items-end gap-1 ml-2 shrink-0">
                                <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                                    <FiStar className="fill-current" size={14} />
                                    <span>{trip.rating}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Location for Non-Featured */}
                    {!isFeatured && (
                        <div className="flex items-center gap-2 text-cyan-200/70 text-xs mb-3 font-semibold uppercase tracking-wider">
                            <FiMapPin className="text-cyan-500" />
                            <span className="truncate">{trip.destination}</span>
                        </div>
                    )}

                    {/* Description */}
                    <p className={`text-grey-400 font-light leading-relaxed mb-4 ${isFeatured ? 'text-lg line-clamp-3 max-w-2xl text-grey-200' :
                            'text-sm line-clamp-2'
                        }`}>
                        {trip.description}
                    </p>
                </div>

                {/* Footer Info */}
                <div className={`flex items-center justify-between border-t border-white/5 pt-4 mt-auto ${isFeatured ? 'max-w-xl' : ''
                    }`}>
                    <div className="flex gap-4 text-xs font-bold text-teal-200/60 uppercase tracking-widest">
                        <span className="flex items-center gap-2"><FiClock className="text-cyan-500" /> {trip.duration}</span>
                        <span className="flex items-center gap-2"><FiUsers className="text-cyan-500" /> {trip.groupSize}</span>
                    </div>

                    <div className="text-right">
                        <span className="block text-[10px] text-grey-500 uppercase tracking-widest font-bold mb-0.5">From</span>
                        <span className={`font-bold text-white ${isFeatured ? 'text-3xl text-cyan-300' : 'text-xl'}`}>
                            ₹{trip.price?.toLocaleString()}
                        </span>
                    </div>

                    {isFeatured && (
                        <button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-teal-900 pl-8 pr-6 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 shadow-lg shadow-cyan-500/20 ml-8 hover:translate-x-1 hover:shadow-cyan-500/40">
                            Check Availability <FiArrowRight />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default TripCard;
