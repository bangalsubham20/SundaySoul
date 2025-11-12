import apiClient from './api';

const reviewService = {
  // Create review
  createReview: async (tripId, reviewData) => {
    try {
      const response = await apiClient.post(`/reviews`, {
        tripId,
        ...reviewData,
      });
      return response;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  // Get trip reviews
  getTripReviews: async (tripId) => {
    try {
      const response = await apiClient.get(`/reviews/trip/${tripId}`);
      return response;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  // Get user reviews
  getUserReviews: async () => {
    try {
      const response = await apiClient.get(`/reviews/my-reviews`);
      return response;
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      throw error;
    }
  },

  // Update review
  updateReview: async (reviewId, reviewData) => {
    try {
      const response = await apiClient.put(`/reviews/${reviewId}`, reviewData);
      return response;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  },

  // Delete review
  deleteReview: async (reviewId) => {
    try {
      const response = await apiClient.delete(`/reviews/${reviewId}`);
      return response;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  },
};

export default reviewService;
