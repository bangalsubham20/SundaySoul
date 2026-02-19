import apiClient from './api';

const contentService = {
    // --- Contact ---
    submitContact: async (data) => {
        const response = await apiClient.post('/contact', data);
        return response.data;
    },

    // --- FAQs ---
    getFAQs: async () => {
        const response = await apiClient.get('/content/faq');
        return response.data;
    },

    // --- Static Pages ---
    getPage: async (slug) => {
        const response = await apiClient.get(`/content/pages/${slug}`);
        return response.data;
    }
};

export default contentService;
