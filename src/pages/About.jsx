import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiHeart, FiGlobe, FiAward, FiArrowRight } from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';

const About = () => {
    const stats = [
        { label: 'Community Members', value: '25K+' },
        { label: 'Destinations', value: '100+' },
        { label: 'Trips Completed', value: '500+' },
        { label: 'Average Rating', value: '4.9/5' },
    ];

    const values = [
        {
            icon: FiUsers,
            title: 'Community First',
            description: 'We believe in the power of connection. Every trip is designed to foster lifelong friendships and unforgettable shared experiences.'
        },
        {
            icon: FiGlobe,
            title: 'Sustainable Travel',
            description: 'We are committed to responsible tourism that respects local cultures and minimizes our environmental footprint.'
        },
        {
            icon: FiHeart,
            title: 'Passion Driven',
            description: 'Our team is made up of avid explorers who pour their hearts into crafting the perfect itinerary for you.'
        },
        {
            icon: FiAward,
            title: 'Excellence',
            description: 'From accommodation to guides, we settle for nothing less than the best to ensure your safety and satisfaction.'
        }
    ];

    const team = [
        {
            name: 'Sumit Kumar',
            role: 'Founder & Trip Lead',
            image: '/images/Sumit.png',
            socials: { linkedin: '#', twitter: '#' }
        },
        {
            name: 'Subham Bangal',
            role: 'Head of Operations',
            image: '/images/Subham.png',
            socials: { linkedin: 'https://www.linkedin.com/in/bangalsubham20/', instagram: 'https://www.instagram.com/subham20._/' }
        }
    ];

    return (
        <div className="min-h-screen bg-teal-900 text-grey-400 font-sans selection:bg-cyan-500 selection:text-teal-900 pt-16 md:pt-20">

            {/* Hero Section */}
            <section className="relative min-h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden py-20 md:py-0">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1526772662003-753f2e9e9c1d?q=80&w=2071&auto=format&fit=crop"
                        alt="About Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-teal-900/80 backdrop-blur-sm" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-900/50 to-teal-900" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-cyan-400 font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base"
                    >
                        Our Story
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-display text-white mb-6 drop-shadow-2xl"
                    >
                        We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">SundaySoul</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-2xl font-light text-grey-300 leading-relaxed max-w-2xl mx-auto"
                    >
                        Curating soulful journeys for the modern wanderer. We don't just plan trips; we craft experiences that change the way you see the world.
                    </motion.p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 md:py-20 bg-teal-800/30 border-y border-white/5 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <h3 className="text-3xl md:text-5xl font-display text-white mb-2">{stat.value}</h3>
                            <p className="text-cyan-500 font-bold uppercase tracking-wider text-[10px] md:text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cyan-500/5 rounded-full blur-[60px] md:blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-teal-500/5 rounded-full blur-[60px] md:blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-display text-white mb-4 md:mb-6">Our Core Values</h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg font-light text-grey-400">
                            These principles guide every decision we make and every trip we plan. They are the soul of SundaySoul.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    viewport={{ once: true }}
                                    className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-teal-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="text-cyan-400" size={24} />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 group-hover:text-cyan-400 transition-colors">{value.title}</h3>
                                    <p className="text-sm leading-relaxed text-grey-400 group-hover:text-grey-300 transition-colors">
                                        {value.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 md:py-24 px-4 md:px-6 bg-black/20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6 text-center md:text-left">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-4">Meet The Team</h2>
                            <p className="text-base md:text-lg font-light text-grey-400 max-w-xl">
                                The dreamers, planners, and adventurers behind your next favorite memory.
                            </p>
                        </div>
                        <button className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider hover:text-white transition-colors group text-sm md:text-base">
                            Join our team <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] aspect-[3/4]"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-teal-900 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{member.name}</h3>
                                    <p className="text-cyan-400 font-medium mb-4 text-sm md:text-base">{member.role}</p>
                                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        {member.socials.linkedin && (
                                            <a href={member.socials.linkedin} className="p-2 bg-white/10 rounded-full hover:bg-cyan-500 hover:text-teal-900 transition-colors">
                                                <FaLinkedinIn size={16} />
                                            </a>
                                        )}
                                        {member.socials.twitter && (
                                            <a href={member.socials.twitter} className="p-2 bg-white/10 rounded-full hover:bg-cyan-500 hover:text-teal-900 transition-colors">
                                                <FaTwitter size={16} />
                                            </a>
                                        )}
                                        {member.socials.instagram && (
                                            <a href={member.socials.instagram} className="p-2 bg-white/10 rounded-full hover:bg-cyan-500 hover:text-teal-900 transition-colors">
                                                <FaInstagram size={16} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24 px-4 md:px-6 text-center">
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-900/40 to-teal-900/40 border border-white/10 p-8 md:p-20 rounded-[2rem] md:rounded-[3rem] backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/noise.png')] opacity-[0.03] pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-6xl font-display text-white mb-4 md:mb-6">Ready to start your journey?</h2>
                        <p className="text-base md:text-xl text-grey-400 mb-8 md:mb-10 max-w-2xl mx-auto font-light">
                            Join thousands of others who have found their Sunday Soul with us. The world is waiting.
                        </p>
                        <button className="w-full md:w-auto px-8 md:px-10 py-3 md:py-4 bg-cyan-500 hover:bg-cyan-400 text-teal-900 font-bold text-base md:text-lg rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:-translate-y-1">
                            Explore Expeditions
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
