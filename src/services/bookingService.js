import apiClient from './api';

const bookingService = {
  // Create new booking
  createBooking: async (bookingData) => {
    try {
      const response = await apiClient.post('/bookings', bookingData);
      return response;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Get user's bookings
  getUserBookings: async () => {
    try {
      const response = await apiClient.get('/bookings/my-bookings');
      return response;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Get booking by ID
  getBookingById: async (bookingId) => {
    try {
      const response = await apiClient.get(`/bookings/${bookingId}`);
      return response;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  },

  // Cancel booking
  cancelBooking: async (bookingId) => {
    try {
      const response = await apiClient.post(`/bookings/${bookingId}/cancel`);
      return response;
    } catch (error) {
      console.error('Error canceling booking:', error);
      throw error;
    }
  },

  // Get all bookings (admin)
  getAllBookings: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.tripId) params.append('tripId', filters.tripId);

      const response = await apiClient.get(`/bookings/admin/all?${params.toString()}`);
      return response;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Update booking status (admin)
  updateBookingStatus: async (bookingId, status) => {
    try {
      const response = await apiClient.put(`/bookings/${bookingId}/status`, { status });
      return response;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  },
};

export default bookingService;
