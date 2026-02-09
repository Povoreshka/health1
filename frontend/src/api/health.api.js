import api from './axios.js';

export const getHealthStats = async () => {
    try {
        const response = await api.get('/health/stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching health stats:', error);
        // Моковые данные для демо
        return {
            heart_rate: 72,
            blood_pressure: '120/80',
            weight: 70,
            bmi: 22,
            sleep_hours: 7,
            steps: 8500
        };
    }
};

export const addHealthMetrics = async (metrics) => {
    try {
        const response = await api.post('/health/metrics', metrics);
        return response.data;
    } catch (error) {
        console.error('Error adding health metrics:', error);
        throw error;
    }
};

// Экспорт по умолчанию для обратной совместимости
const healthApi = {
    getHealthStats,
    addHealthMetrics
};

export default healthApi;