import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Импортируем компоненты графиков
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [activeTab, setActiveTab] = useState('weekly');
    const navigate = useNavigate();

    // Пример данных для графиков
    const weeklyData = [
        { day: 'Пн', калории: 420, время: 45, пульс: 128 },
        { day: 'Вт', калории: 520, время: 60, пульс: 135 },
        { day: 'Ср', калории: 480, время: 50, пульс: 130 },
        { day: 'Чт', калории: 580, время: 65, пульс: 140 },
        { day: 'Пт', калории: 450, время: 48, пульс: 132 },
        { day: 'Сб', калории: 620, время: 70, пульс: 142 },
        { day: 'Вс', калории: 380, время: 40, пульс: 125 },
    ];

    const monthlyData = [
        { week: 'Неделя 1', тренировки: 3, калории: 2500, время: 180 },
        { week: 'Неделя 2', тренировки: 4, калории: 3200, время: 240 },
        { week: 'Неделя 3', тренировки: 5, калории: 4000, время: 300 },
        { week: 'Неделя 4', тренировки: 4, калории: 3500, время: 260 },
    ];

    const workoutDistribution = [
        { name: 'Силовые', value: 40, color: '#FF6B6B' },
        { name: 'Кардио', value: 30, color: '#4ECDC4' },
        { name: 'HIIT', value: 20, color: '#96CEB4' },
        { name: 'Йога', value: 10, color: '#FFEAA7' },
    ];

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData') || '{}');
        if (data && data.name) {
            setUserData(data);
        } else {
            navigate('/');
        }
    }, [navigate]);

    const stats = {
        totalWorkouts: 42,
        totalCalories: '15,840',
        totalTime: '62ч 30м',
        streak: 15,
        avgHeartRate: 132,
        avgWorkoutTime: 58,
        consistency: 85,
    };

    if (!userData) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <p>Загрузка статистики...</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            {/* Хедер дашборда */}
            <div className="dashboard-header">
                <button className="back-button" onClick={() => navigate('/home')}>
                    ← 
                </button>
                <h1>Статистика и прогресс</h1>
                <p>Детальный анализ ваших тренировок</p>
            </div>

            <div className="dashboard-content">
                {/* Вкладки периода */}
                <div className="period-tabs">
                    <button 
                        className={`tab ${activeTab === 'weekly' ? 'active' : ''}`}
                        onClick={() => setActiveTab('weekly')}
                    >
                        Неделя
                    </button>
                    <button 
                        className={`tab ${activeTab === 'monthly' ? 'active' : ''}`}
                        onClick={() => setActiveTab('monthly')}
                    >
                        Месяц
                    </button>
                    <button 
                        className={`tab ${activeTab === 'quarterly' ? 'active' : ''}`}
                        onClick={() => setActiveTab('quarterly')}
                    >
                        Квартал
                    </button>
                    <button 
                        className={`tab ${activeTab === 'yearly' ? 'active' : ''}`}
                        onClick={() => setActiveTab('yearly')}
                    >
                        Год
                    </button>
                </div>

                {/* Общая статистика */}
                <div className="overall-stats">
                    <h2>Общая статистика</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">🏋️</div>
                            <div className="stat-info">
                                <h3>{stats.totalWorkouts}</h3>
                                <p>Всего тренировок</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🔥</div>
                            <div className="stat-info">
                                <h3>{stats.totalCalories}</h3>
                                <p>Сожжено калорий</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">⏱️</div>
                            <div className="stat-info">
                                <h3>{stats.totalTime}</h3>
                                <p>Общее время</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">⚡</div>
                            <div className="stat-info">
                                <h3>{stats.streak}</h3>
                                <p>Дней подряд</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Графики */}
                <div className="charts-section">
                    <div className="chart-container">
                        <h3>Активность по дням</h3>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={weeklyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="day" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: 'white', 
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Line 
                                        type="monotone" 
                                        dataKey="калории" 
                                        stroke="#667eea" 
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="время" 
                                        stroke="#4ECDC4" 
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="chart-container">
                        <h3>Распределение тренировок</h3>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={workoutDistribution}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {workoutDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        formatter={(value) => [`${value}%`, 'Доля']}
                                        contentStyle={{ 
                                            backgroundColor: 'white', 
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="chart-container full-width">
                        <h3>Прогресс по неделям</h3>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="week" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: 'white', 
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Bar 
                                        dataKey="тренировки" 
                                        fill="#8884d8" 
                                        radius={[4, 4, 0, 0]}
                                        name="Кол-во тренировок"
                                    />
                                    <Bar 
                                        dataKey="калории" 
                                        fill="#82ca9d" 
                                        radius={[4, 4, 0, 0]}
                                        name="Калории (сотни)"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Детальная статистика */}
                <div className="detailed-stats">
                    <h2>Детальная статистика</h2>
                    <div className="stats-table">
                        <div className="stat-row">
                            <span className="stat-label">Средняя продолжительность тренировки:</span>
                            <span className="stat-value">{stats.avgWorkoutTime} минут</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">Средний пульс во время тренировок:</span>
                            <span className="stat-value">{stats.avgHeartRate} уд/мин</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">Консистентность тренировок:</span>
                            <span className="stat-value">{stats.consistency}%</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">Лучший результат (калории):</span>
                            <span className="stat-value">720 калорий</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">Самая длинная тренировка:</span>
                            <span className="stat-value">85 минут</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">Дней без пропусков:</span>
                            <span className="stat-value">{stats.streak} дней</span>
                        </div>
                    </div>
                </div>

                {/* Инсайты */}
                <div className="insights-section">
                    <h2>Персональные инсайты</h2>
                    <div className="insights-grid">
                        <div className="insight-card">
                            <div className="insight-icon">📈</div>
                            <h4>Рост прогресса</h4>
                            <p>Ваша средняя продолжительность тренировок увеличилась на 15% за последний месяц</p>
                        </div>
                        <div className="insight-card">
                            <div className="insight-icon">🎯</div>
                            <h4>Консистентность</h4>
                            <p>Вы достигаете поставленных целей в 85% случаев - отличный результат!</p>
                        </div>
                        <div className="insight-card">
                            <div className="insight-icon">🔥</div>
                            <h4>Интенсивность</h4>
                            <p>Уровень интенсивности тренировок соответствует вашему уровню подготовки</p>
                        </div>
                        <div className="insight-card">
                            <div className="insight-icon">💪</div>
                            <h4>Рекомендация</h4>
                            <p>Попробуйте добавить 1 силовую тренировку в неделю для лучших результатов</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Кнопка экспорта */}
            <div className="export-section">
                <button className="export-btn">
                    📥 Экспорт статистики
                </button>
            </div>
        </div>
    );
};

export default Dashboard;