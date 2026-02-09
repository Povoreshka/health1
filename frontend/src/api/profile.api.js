import api from './axios';

const profileApi = {
    // Получение профиля пользователя
    getUserProfile: async () => {
        try {
            const response = await api.get('/profile');
            return response.data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    },

    // Обновление профиля
    updateProfile: async (profileData) => {
        try {
            const response = await api.put('/profile', profileData);
            return response.data;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },

    // Изменение пароля
    changePassword: async (passwordData) => {
        try {
            const response = await api.post('/profile/password', passwordData);
            return response.data;
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    },

    // Загрузка аватара
    uploadAvatar: async (file) => {
        try {
            const formData = new FormData();
            formData.append('avatar', file);
            
            const response = await api.post('/profile/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading avatar:', error);
            throw error;
        }
    },

    // Получение настроек
    getSettings: async () => {
        try {
            const response = await api.get('/profile/settings');
            return response.data;
        } catch (error) {
            console.error('Error fetching settings:', error);
            throw error;
        }
    },

    // Обновление настроек
    updateSettings: async (settings) => {
        try {
            const response = await api.put('/profile/settings', settings);
            return response.data;
        } catch (error) {
            console.error('Error updating settings:', error);
            throw error;
        }
    }
};

export default profileApi;