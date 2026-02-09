import api from './axios';

const usersApi = {
    // Регистрация пользователя
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
            }
            return response;
        } catch (error) {
            console.error('Error registering:', error);
            throw error;
        }
    },

    // Вход пользователя
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
            }
            return response;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },

    // Выход пользователя
    logout: async () => {
        try {
            const response = await api.post('/auth/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return response;
        } catch (error) {
            console.error('Error logging out:', error);
            // Все равно очищаем localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            throw error;
        }
    },

    // Проверка токена
    verifyToken: async () => {
        try {
            const response = await api.get('/auth/verify');
            return response;
        } catch (error) {
            console.error('Error verifying token:', error);
            throw error;
        }
    },

    // Восстановление пароля
    forgotPassword: async (email) => {
        try {
            const response = await api.post('/auth/forgot-password', { email });
            return response;
        } catch (error) {
            console.error('Error requesting password reset:', error);
            throw error;
        }
    },

    // Сброс пароля
    resetPassword: async (token, newPassword) => {
        try {
            const response = await api.post('/auth/reset-password', { token, newPassword });
            return response;
        } catch (error) {
            console.error('Error resetting password:', error);
            throw error;
        }
    },

    // Получение текущего пользователя
    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/me');
            return response;
        } catch (error) {
            console.error('Error fetching current user:', error);
            throw error;
        }
    }
};

export default usersApi;