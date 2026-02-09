import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [waterReminder, setWaterReminder] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData') || '{}');
        if (data && data.name) {
            setUserData(data);
            setWaterReminder(data.waterReminder || false);
        } else {
            navigate('/onboarding/1');
        }
    }, [navigate]);

    const handleSave = () => {
        setLoading(true);
        const updatedData = {
            ...userData,
            waterReminder: waterReminder
        };
        
        localStorage.setItem('userData', JSON.stringify(updatedData));
        
        setTimeout(() => {
            setLoading(false);
            alert('Профиль успешно обновлен!');
        }, 1000);
    };

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/onboarding/1');
    };

    const handleWaterReminderToggle = () => {
        const newValue = !waterReminder;
        setWaterReminder(newValue);
        
        if (newValue) {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
    };

    if (!userData) {
        return (
            <div className="profile-loading">
                <div className="spinner"></div>
                <p>Загрузка профиля...</p>
            </div>
        );
    }

    const achievements = [
        { id: 1, title: 'Первая тренировка', unlocked: true, icon: '🏆' },
        { id: 2, title: '7 дней подряд', unlocked: userData.streak >= 7, icon: '🔥' },
        { id: 3, title: '10 тренировок', unlocked: (userData.workouts_count || 0) >= 10, icon: '💪' },
        { id: 4, title: '30 минут тренировки', unlocked: (userData.total_minutes || 0) >= 30, icon: '⏱️' },
        { id: 5, title: 'Здоровый ИМТ', unlocked: userData.bmi && userData.bmi >= 18.5 && userData.bmi <= 24.9, icon: '⚖️' },
        { id: 6, title: 'Месяц тренировок', unlocked: (userData.workouts_count || 0) >= 20, icon: '📅' }
    ];

    return (
        <div className="profile-page">
            {showNotification && (
                <div className="notification-popup">
                    <div className="notification-content">
                        <span className="notification-icon">💧</span>
                        <div>
                            <h4>Включено!</h4>
                            <p>Теперь напоминания о воде будут приходить к вам</p>
                        </div>
                        <button 
                            className="notification-close"
                            onClick={() => setShowNotification(false)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
            
            <div className="profile-header">
                <button className="back-button" onClick={() => navigate('/home')}>
                    ← 
                </button>
                <h1>Мой профиль</h1>
            </div>

            <div className="profile-content">
                <div className="profile-card">
                    <div className="profile-avatar">
                        <div className="avatar-circle">
                            {userData.name.charAt(0).toUpperCase()}
                        </div>
                        <h2>{userData.name}</h2>
                    </div>

                    <div className="profile-form">
                        <div className="form-group">
                            <label>Имя</label>
                            <input
                                type="text"
                                value={userData.name}
                                onChange={(e) => setUserData({...userData, name: e.target.value})}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={userData.email || ''}
                                onChange={(e) => setUserData({...userData, email: e.target.value})}
                                placeholder="Введите email"
                            />
                        </div>

                        <div className="form-group">
                            <label>Уровень опыта</label>
                            <div className="experience-badges">
                                {['beginner', 'intermediate', 'advanced'].map(level => (
                                    <button
                                        key={level}
                                        className={`experience-badge ${userData.experience === level ? 'active' : ''}`}
                                        onClick={() => setUserData({...userData, experience: level})}
                                    >
                                        {level === 'beginner' ? 'Новичок' : 
                                         level === 'intermediate' ? 'Средний' : 'Продвинутый'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Тренировок в неделю</label>
                            <div className="workouts-slider">
                                <input
                                    type="range"
                                    min="1"
                                    max="7"
                                    value={userData.workoutsPerWeek || 3}
                                    onChange={(e) => setUserData({...userData, workoutsPerWeek: parseInt(e.target.value)})}
                                />
                                <div className="slider-value">
                                    {userData.workoutsPerWeek || 3} раз в неделю
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Рост (см)</label>
                            <input
                                type="number"
                                min="100"
                                max="250"
                                value={userData.height || 170}
                                onChange={(e) => setUserData({...userData, height: parseInt(e.target.value)})}
                            />
                        </div>

                        <div className="form-group">
                            <label>Вес (кг)</label>
                            <input
                                type="number"
                                min="30"
                                max="200"
                                value={userData.weight || 70}
                                onChange={(e) => setUserData({...userData, weight: parseInt(e.target.value)})}
                            />
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button 
                            className="save-button" 
                            onClick={handleSave}
                            disabled={loading}
                        >
                            {loading ? 'Сохранение...' : 'Сохранить изменения'}
                        </button>
                        <button className="logout-button" onClick={handleLogout}>
                            Выйти из аккаунта
                        </button>
                    </div>
                </div>

                <div className="right-column">
                    <div className="achievements-section">
                        <div className="section-header">
                            <h3>Мои награды</h3>
                            <span className="achievements-count">
                                {achievements.filter(a => a.unlocked).length}/{achievements.length}
                            </span>
                        </div>
                        <div className="achievements-grid">
                            {achievements.map(achievement => (
                                <div 
                                    key={achievement.id} 
                                    className={`achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                                >
                                    <div className="achievement-icon">
                                        {achievement.icon}
                                    </div>
                                    <div className="achievement-info">
                                        <h4>{achievement.title}</h4>
                                        <p>{achievement.unlocked ? 'Получено' : 'Еще не получено'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="water-reminder-section">
                        <div className="reminder-header">
                            <h3>💧 Напоминание о воде</h3>
                            <div className="toggle-switch">
                                <input
                                    type="checkbox"
                                    id="water-reminder"
                                    checked={waterReminder}
                                    onChange={handleWaterReminderToggle}
                                />
                                <label htmlFor="water-reminder" className="toggle-slider"></label>
                            </div>
                        </div>
                        <p className="reminder-description">
                            Получайте напоминания пить воду каждые 2 часа
                        </p>
                        
                        {waterReminder && (
                            <div className="reminder-settings">
                                <div className="setting-item">
                                    <span>Интервал:</span>
                                    <span>2 часа</span>
                                </div>
                                <div className="setting-item">
                                    <span>Время начала:</span>
                                    <span>09:00</span>
                                </div>
                                <div className="setting-item">
                                    <span>Время конца:</span>
                                    <span>21:00</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;