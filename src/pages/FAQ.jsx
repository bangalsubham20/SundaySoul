import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import contentService from '../services/contentService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 text-left group"
            >
                <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-cyan-400' : 'text-white group-hover:text-cyan-300'}`}>
                    {question}
                </span>
                <span className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-grey-400 group-hover:text-white'}`}>
                    {isOpen ? <FiMinus /> : <FiPlus />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="text-grey-400 pb-6 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const data = await contentService.getFAQs();
                setFaqs(data);
            } catch (error) {
                console.error('Failed to fetch FAQs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFAQs();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[#020617] text-grey-400 font-body">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h1>
                    <p className="text-lg text-grey-400">Everything you need to know about traveling with SundaySoul.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-teal-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-xl"
                >
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} />
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <p>
                        Still have questions? <a href="/contact" className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline">Contact Support</a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQ;
