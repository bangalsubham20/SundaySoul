import apiClient from './api';

const userService = {
    // Get all users (Admin only)
    getAllUsers: async () => {
        const response = await apiClient.get('/auth/admin/users');
        return response;
    }
};

export default userService;
