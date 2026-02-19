import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import Button from '../components/common/Button';
import { toast } from 'react-hot-toast';
import contentService from '../services/contentService'; // Moved to top

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await contentService.submitContact(formData);
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            toast.error('Failed to send message. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                        Get in <span className="text-gradient">Touch</span>
                    </h1>
                    <p className="text-grey-400 text-lg max-w-2xl mx-auto">
                        Have questions about a trip? Want to partner with us? Or just want to say hi? We'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-12"
                    >
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 transform transition-all hover:border-cyan-500/30">
                            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                                        <FiMail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-grey-400 mb-1">Email Us</p>
                                        <a href="mailto:hello@sundaysoul.in" className="text-white hover:text-cyan-400 transition-colors text-lg font-medium">hello@sundaysoul.in</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-teal-500/10 rounded-xl text-teal-400">
                                        <FiPhone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-grey-400 mb-1">Call Us</p>
                                        <a href="tel:+919876543210" className="text-white hover:text-cyan-400 transition-colors text-lg font-medium">+91 98765 43210</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                                        <FiMapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-grey-400 mb-1">Visit Us</p>
                                        <p className="text-white text-lg font-medium">
                                            123 Adventure Lane, <br />
                                            HSR Layout, Bangalore - 560102
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="h-64 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden relative group">
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                                <p className="text-white font-medium flex items-center gap-2">
                                    <FiMapPin /> View on Google Maps
                                </p>
                            </div>
                            {/* Replace with real map embed */}
                            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" alt="Map" className="w-full h-full object-cover opacity-50" />
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="bg-teal-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6 shadow-xl">
                            <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
                            <p className="text-grey-400 text-sm mb-6">We usually respond within 24 hours.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-grey-300 ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all placeholder:text-grey-600"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-grey-300 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all placeholder:text-grey-600"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-grey-300 ml-1">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all placeholder:text-grey-600"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-grey-300 ml-1">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all placeholder:text-grey-600 resize-none"
                                    placeholder="Tell us more about your inquiry..."
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-900/20 transform hover:-translate-y-1 transition-all"
                            >
                                {loading ? 'Sending...' : <span className="flex items-center justify-center gap-2"><FiSend /> Send Message</span>}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
