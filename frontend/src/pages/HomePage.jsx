import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const [userData, setUserData] = useState(null);
    const [todayWorkout, setTodayWorkout] = useState(null);
    const [weeklySchedule, setWeeklySchedule] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Получаем данные пользователя из localStorage
        const data = JSON.parse(localStorage.getItem('userData') || '{}');
        if (data && data.name) {
            setUserData(data);
            
            // Имитация данных о тренировках
            const today = new Date().getDay();
            const workouts = [
                { day: 1, name: 'Силовая тренировка', type: 'strength', duration: 60, completed: true },
                { day: 2, name: 'Кардио', type: 'cardio', duration: 45, completed: true },
                { day: 3, name: 'Восстановление', type: 'recovery', duration: 30, completed: false },
                { day: 4, name: 'HIIT', type: 'hiit', duration: 40, completed: false },
                { day: 5, name: 'Силовая тренировка', type: 'strength', duration: 60, completed: false },
                { day: 6, name: 'Йога', type: 'yoga', duration: 50, completed: false },
                { day: 0, name: 'Отдых', type: 'rest', duration: 0, completed: true }
            ];
            
            setTodayWorkout(workouts.find(w => w.day === today) || workouts[0]);
            setWeeklySchedule(workouts);
        } else {
            // Если нет данных пользователя, редирект на онбординг
            navigate('/onboarding/1');
        }
    }, [navigate]);

    const startWorkout = () => {
        // Логика начала тренировки
        alert('Начинаем тренировку!');
    };

    const getWorkoutIcon = (type) => {
        switch(type) {
            case 'strength': return '💪';
            case 'cardio': return '🏃';
            case 'recovery': return '🧘';
            case 'hiit': return '⚡';
            case 'yoga': return '🙏';
            case 'rest': return '😴';
            default: return '🏋️';
        }
    };

    const getWorkoutColor = (type) => {
        switch(type) {
            case 'strength': return '#FF6B6B';
            case 'cardio': return '#4ECDC4';
            case 'recovery': return '#45B7D1';
            case 'hiit': return '#96CEB4';
            case 'yoga': return '#FFEAA7';
            case 'rest': return '#DDA0DD';
            default: return '#95A5A6';
        }
    };

    if (!userData) {
        return (
            <div className="homepage-loading">
                <div className="spinner"></div>
                <p>Загрузка...</p>
            </div>
        );
    }

    return (
        <div className="homepage">
            {/* Ударный режим тренировок - верхняя плашка */}
            <div className="shock-mode-banner">
                <div className="shock-mode-content">
                    <div className="shock-mode-icon">⚡</div>
                    <div className="shock-mode-info">
                        <h3>Ударный режим тренировок</h3>
                        <p>Интенсивная программа • {userData.workoutsPerWeek} тренировок в неделю • {userData.experience === 'beginner' ? 'Для новичков' : 'Для продвинутых'}</p>
                    </div>
                    <div className="shock-mode-stats">
                        <div className="shock-stat">
                            <span className="stat-value">15</span>
                            <span className="stat-label">дней</span>
                        </div>
                        <div className="shock-stat">
                            <span className="stat-value">85%</span>
                            <span className="stat-label">интенсивность</span>
                        </div>
                        <button className="shock-mode-btn" onClick={() => navigate('/programs')}>
                            Программы →
                        </button>
                    </div>
                </div>
            </div>

            {/* Основное содержимое главной страницы */}
            <div className="homepage-content">
                <div className="welcome-section">
                    <h1>Привет, {userData.name}! 👋</h1>
                    <p>Готовы к сегодняшней тренировке?</p>
                </div>

                {/* Сегодняшняя тренировка */}
                <div className="today-workout-section">
                    <h2>Сегодняшняя тренировка</h2>
                    {todayWorkout && (
                        <div 
                            className="today-workout-card"
                            style={{ borderLeftColor: getWorkoutColor(todayWorkout.type) }}
                        >
                            <div className="workout-header">
                                <div className="workout-icon">
                                    {getWorkoutIcon(todayWorkout.type)}
                                </div>
                                <div className="workout-info">
                                    <h3>{todayWorkout.name}</h3>
                                    <div className="workout-meta">
                                        <span className="duration">⏱️ {todayWorkout.duration} мин</span>
                                        <span className={`status ${todayWorkout.completed ? 'completed' : 'pending'}`}>
                                            {todayWorkout.completed ? '✅ Завершено' : '⏳ Ожидает'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="workout-actions">
                                <button 
                                    className="start-button"
                                    onClick={startWorkout}
                                    disabled={todayWorkout.completed}
                                >
                                    {todayWorkout.completed ? 'Тренировка завершена' : 'Начать тренировку'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Недельный график тренировок */}
                <div className="weekly-schedule-section">
                    <div className="section-header">
                        <h2>График на неделю</h2>
                        <button className="view-all" onClick={() => navigate('/programs')}>
                            Посмотреть всё →
                        </button>
                    </div>
                    <div className="weekly-grid">
                        {weeklySchedule.map((workout, index) => (
                            <div 
                                key={index}
                                className={`day-card ${new Date().getDay() === workout.day ? 'today' : ''} ${workout.completed ? 'completed' : ''}`}
                                style={{ backgroundColor: getWorkoutColor(workout.type) + '20' }}
                            >
                                <div className="day-icon">{getWorkoutIcon(workout.type)}</div>
                                <div className="day-info">
                                    <h4>{workout.name}</h4>
                                    <p className="day-name">
                                        {workout.day === 0 ? 'Воскресенье' : 
                                         workout.day === 1 ? 'Понедельник' :
                                         workout.day === 2 ? 'Вторник' :
                                         workout.day === 3 ? 'Среда' :
                                         workout.day === 4 ? 'Четверг' :
                                         workout.day === 5 ? 'Пятница' : 'Суббота'}
                                    </p>
                                    <p className="workout-duration">
                                        {workout.duration > 0 ? `${workout.duration} мин` : 'Отдых'}
                                    </p>
                                </div>
                                <div className="day-status">
                                    {workout.completed ? (
                                        <span className="status-badge completed">✓</span>
                                    ) : (
                                        <span className="status-badge pending">●</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Быстрый доступ */}
                <div className="quick-actions-section">
                    <h2>Быстрый доступ</h2>
                    <div className="quick-actions-grid">
                        <div className="quick-action" onClick={() => navigate('/programs')}>
                            <div className="action-icon">💪</div>
                            <h4>Тренировки</h4>
                            <p>Все упражнения</p>
                        </div>
                        <div className="quick-action" onClick={() => navigate('/nutrition')}>
                            <div className="action-icon">🥗</div>
                            <h4>Питание</h4>
                            <p>План питания</p>
                        </div>
                        <div className="quick-action" onClick={() => navigate('/health')}>
                            <div className="action-icon">📖</div>
                            <h4>Дневник</h4>
                            <p>Мои показатели</p>
                        </div>
                        <div className="quick-action" onClick={() => navigate('/dashboard')}>
                            <div className="action-icon">📊</div>
                            <h4>Прогресс</h4>
                            <p>Мои результаты</p>
                        </div>
                    </div>
                </div>

                {/* Мотивация */}
                <div className="motivation-section">
                    <div className="motivation-card">
                        <div className="motivation-icon">🔥</div>
                        <div className="motivation-content">
                            <h3>Держи темп!</h3>
                            <p>Вы уже на {userData.workoutsPerWeek * 4}% ближе к своей цели. Продолжайте в том же духе!</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Нижняя навигация */}
            <nav className="bottom-nav">
                <button className="nav-item active" onClick={() => navigate('/health')}>
                    <span className="nav-icon">📖</span>
                    <span className="nav-label">Дневник</span>
                </button>
                <button className="nav-item" onClick={() => navigate('/programs')}>
                    <span className="nav-icon">📅</span>
                    <span className="nav-label">Программы</span>
                </button>
                <button className="nav-item" onClick={() => navigate('/nutrition')}>
                    <span className="nav-icon">🥗</span>
                    <span className="nav-label">Питание</span>
                </button>
                <button className="nav-item" onClick={() => navigate('/dashboard')}>
                    <span className="nav-icon">📊</span>
                    <span className="nav-label">Прогресс</span>
                </button>
                <button className="nav-item" onClick={() => navigate('/profile')}>
                    <span className="nav-icon">👤</span>
                    <span className="nav-label">Профиль</span>
                </button>
            </nav>
        </div>
    );
};

export default HomePage;