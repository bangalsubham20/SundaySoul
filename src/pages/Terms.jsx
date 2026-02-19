import React from 'react';
import { motion } from 'framer-motion';
import contentService from '../services/contentService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Terms = () => {
    const [page, setPage] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchPage = async () => {
            try {
                const data = await contentService.getPage('terms');
                setPage(data);
            } catch (error) {
                console.error('Failed to fetch Terms:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[#020617] text-grey-400 font-body">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        {page?.title || 'Terms & Conditions'}
                    </h1>
                    <p className="text-grey-500">
                        Last updated: {page?.lastUpdated ? new Date(page.lastUpdated).toLocaleDateString() : new Date().toLocaleDateString()}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-teal-900/20 border border-white/5 rounded-3xl p-8 md:p-12 space-y-8 backdrop-blur-sm"
                >
                    <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: page?.content }} />
                </motion.div>
            </div>
        </div>
    );
};

export default Terms;
