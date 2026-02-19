import apiClient from './api';

const offerService = {
    // Get all offers
    getAllOffers: async () => {
        return await apiClient.get('/offers');
    },

    // Create a new offer
    createOffer: async (offerData) => {
        return await apiClient.post('/offers', offerData);
    },

    // Delete an offer
    deleteOffer: async (id) => {
        return await apiClient.delete(`/offers/${id}`);
    },

    // Toggle offer active status
    toggleOfferActive: async (id) => {
        return await apiClient.put(`/offers/${id}/toggle`);
    },

    // Validate an offer code
    validateOffer: async (code) => {
        return await apiClient.get(`/offers/validate/${code}`);
    }
};

export default offerService;
