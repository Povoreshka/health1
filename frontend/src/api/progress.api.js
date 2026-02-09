import api from './axios.js';

export const getProgressData = async (period = 'week') => {
    try {
        const response = await api.get(`/progress?period=${period}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching progress data:', error);
        // Моковые данные для демо
        const days = period === 'week' ? 7 : period === 'month' ? 30 : 90;
        return Array.from({ length: days }, (_, i) => ({
            date: new Date(Date.now() - (days - i - 1) * 86400000),
            weight: 70 + Math.sin(i * 0.3) * 2,
            bmi: 22 + Math.sin(i * 0.3) * 0.6,
            workouts: Math.floor(Math.random() * 3),
            calories: Math.floor(Math.random() * 500 + 200),
            steps: Math.floor(Math.random() * 5000 + 5000)
        }));
    }
};

// Экспорт по умолчанию
const progressApi = {
    getProgressData
};

export default progressApi;