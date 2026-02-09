import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Путь из папки health в context
import { getHealthStats } from '../../api/health.api.js';
import './HealthStats.css';

const HealthStats = ({ compact = false, showAll = false }) => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        heartRate: { value: 0, unit: 'уд/мин', trend: 'stable' },
        bloodPressure: { value: '120/80', unit: 'мм рт.ст.', trend: 'stable' },
        weight: { value: 0, unit: 'кг', trend: 'stable' },
        bmi: { value: 0, unit: 'кг/м²', trend: 'stable' },
        sleep: { value: 0, unit: 'ч', trend: 'stable' },
        steps: { value: 0, unit: 'шагов', trend: 'stable' }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHealthStats();
    }, []);

    const fetchHealthStats = async () => {
        try {
            const data = await getHealthStats();
            setStats({
                heartRate: { ...stats.heartRate, value: data.heart_rate || 72 },
                bloodPressure: { ...stats.bloodPressure, value: data.blood_pressure || '120/80' },
                weight: { ...stats.weight, value: data.weight || 70 },
                bmi: { ...stats.bmi, value: data.bmi || 22 },
                sleep: { ...stats.sleep, value: data.sleep_hours || 7 },
                steps: { ...stats.steps, value: data.steps || 8000 }
            });
        } catch (error) {
            console.error('Error fetching health stats:', error);
        } finally {
            setLoading(false);
        }
    };

    // Остальной код остается без изменений
    // ...
};

export default HealthStats;