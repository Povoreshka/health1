import api from './axios.js';

export const getRecentWorkouts = async (limit = 3) => {
    try {
        const response = await api.get(`/workouts/recent?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recent workouts:', error);
        // Моковые данные для демо
        return [
            {
                id: 1,
                title: 'Утренняя зарядка',
                type: 'кардио',
                duration: 30,
                calories: 250,
                intensity: 'средняя',
                date: new Date(Date.now() - 86400000).toISOString(),
                completed: true,
                muscle_groups: ['ноги', 'пресс']
            },
            {
                id: 2,
                title: 'Силовая тренировка',
                type: 'силовая',
                duration: 60,
                calories: 400,
                intensity: 'высокая',
                date: new Date(Date.now() - 2 * 86400000).toISOString(),
                completed: true,
                muscle_groups: ['грудь', 'спина', 'руки']
            },
            {
                id: 3,
                title: 'Йога для начинающих',
                type: 'йога',
                duration: 45,
                calories: 180,
                intensity: 'низкая',
                date: new Date(Date.now() - 3 * 86400000).toISOString(),
                completed: false,
                muscle_groups: ['все тело']
            }
        ];
    }
};

export const getAllPrograms = async () => {
    try {
        const response = await api.get('/programs');
        return response.data;
    } catch (error) {
        console.error('Error fetching programs:', error);
        return [];
    }
};

// Экспорт по умолчанию
const programsApi = {
    getRecentWorkouts,
    getAllPrograms
};

export default programsApi;