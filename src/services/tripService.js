import apiClient from './api';

const tripService = {
  // Get all trips with filters
  getAllTrips: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.priceRange) {
        params.append('minPrice', filters.priceRange[0]);
        params.append('maxPrice', filters.priceRange[1]);
      }
      if (filters.difficulty?.length) {
        params.append('difficulty', filters.difficulty.join(','));
      }
      if (filters.destination?.length) {
        params.append('destination', filters.destination.join(','));
      }
      if (filters.season?.length) {
        params.append('season', filters.season.join(','));
      }
      if (filters.sortBy) {
        params.append('sortBy', filters.sortBy);
      }
      if (filters.search) {
        params.append('search', filters.search);
      }

      const response = await apiClient.get(`/trips?${params.toString()}`);
      return response;
    } catch (error) {
      console.error('Error fetching trips:', error);
      throw error;
    }
  },

  // Get single trip by ID
  getTripById: async (tripId) => {
    try {
      const response = await apiClient.get(`/trips/${tripId}`);
      return response;
    } catch (error) {
      console.error('Error fetching trip:', error);
      throw error;
    }
  },

  // Search trips
  searchTrips: async (searchTerm) => {
    try {
      const response = await apiClient.get(`/trips/search?q=${searchTerm}`);
      return response;
    } catch (error) {
      console.error('Error searching trips:', error);
      throw error;
    }
  },

  // Get trip reviews
  getTripReviews: async (tripId) => {
    try {
      const response = await apiClient.get(`/trips/${tripId}/reviews`);
      return response;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  // Create trip (admin only)
  createTrip: async (tripData) => {
    try {
      const response = await apiClient.post('/trips', tripData);
      return response;
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  },

  // Update trip (admin only)
  updateTrip: async (tripId, tripData) => {
    try {
      const response = await apiClient.put(`/trips/${tripId}`, tripData);
      return response;
    } catch (error) {
      console.error('Error updating trip:', error);
      throw error;
    }
  },

  // Delete trip (admin only)
  deleteTrip: async (tripId) => {
    try {
      const response = await apiClient.delete(`/trips/${tripId}`);
      return response;
    } catch (error) {
      console.error('Error deleting trip:', error);
      throw error;
    }
  },
};

export default tripService;
