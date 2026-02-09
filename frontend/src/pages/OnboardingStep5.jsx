import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingStep5.css';

const OnboardingStep5 = () => {
    const [workoutsPerWeek, setWorkoutsPerWeek] = useState(3);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    React.useEffect(() => {
        const step1Data = JSON.parse(localStorage.getItem('onboardingStep1') || '{}');
        if (!step1Data.name || !step1Data.experience) {
            navigate('/onboarding/4');
        }
    }, [navigate]);

    const weeklyFrequency = [
        { value: 1, label: '1 раз', desc: 'Для поддержания формы' },
        { value: 2, label: '2 раза', desc: 'Базовый уровень' },
        { value: 3, label: '3 раза', desc: 'Оптимально для прогресса' },
        { value: 4, label: '4 раза', desc: 'Активный режим' },
        { value: 5, label: '5 раз', desc: 'Интенсивные тренировки' },
        { value: 6, label: '6 раз', desc: 'Профессиональный подход' },
        { value: 7, label: '7 раз', desc: 'Максимальная нагрузка' },
    ];

    const handleComplete = async () => {
        const step1Data = JSON.parse(localStorage.getItem('onboardingStep1') || '{}');
        
        const onboardingData = {
            ...step1Data,
            workoutsPerWeek,
            completedAt: new Date().toISOString()
        };

        try {
            setLoading(true);
            
            // Сохраняем данные пользователя
            const userData = {
                ...onboardingData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                workouts_count: 0,
                total_minutes: 0,
                streak: 0,
                shockMode: {
                    active: true,
                    intensity: 'high',
                    startDate: new Date().toISOString(),
                    duration: 30 // дней
                }
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.removeItem('onboardingStep1');
            
            // Добавляем небольшую задержку для лучшего UX
            setTimeout(() => {
                // Переход на страницу home
                navigate('/home');
            }, 500);
            
        } catch (error) {
            console.error('Error saving onboarding data:', error);
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/onboarding/4');
    };

    return (
        <div className="onboarding-step5">
            <div className="onboarding-wrapper">
                <div className="back-button" onClick={handleBack}>
                    ←
                </div>
                
                <div className="progress-container">
                    <div className="progress-step completed">1</div>
                    <div className="progress-line"></div>
                    <div className="progress-step completed">2</div>
                    <div className="progress-line"></div>
                    <div className="progress-step completed">3</div>
                    <div className="progress-line"></div>
                    <div className="progress-step completed">4</div>
                    <div className="progress-line"></div>
                    <div className="progress-step active">5</div>
                </div>
                
                <div className="onboarding-header">
                    <h1>Количество тренировок</h1>
                    <p>Сколько раз в неделю планируете заниматься?</p>
                </div>
                
                <div className="form-container">
                    <div className="form-section">
                        <div className="frequency-selector">
                            <div className="frequency-value">
                                <span className="value">{workoutsPerWeek}</span>
                                <span className="label">раз в неделю</span>
                            </div>
                            
                            <div className="frequency-slider">
                                <input
                                    type="range"
                                    min="1"
                                    max="7"
                                    value={workoutsPerWeek}
                                    onChange={(e) => setWorkoutsPerWeek(parseInt(e.target.value))}
                                    className="slider-input"
                                />
                                <div className="slider-ticks">
                                    {[1, 2, 3, 4, 5, 6, 7].map(num => (
                                        <div 
                                            key={num} 
                                            className={`tick ${num <= workoutsPerWeek ? 'active' : ''}`}
                                            onClick={() => setWorkoutsPerWeek(num)}
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            <div className="frequency-options">
                                {weeklyFrequency.map(option => (
                                    <div 
                                        key={option.value}
                                        className={`frequency-option ${workoutsPerWeek === option.value ? 'active' : ''}`}
                                        onClick={() => setWorkoutsPerWeek(option.value)}
                                    >
                                        <div className="option-value">{option.label}</div>
                                        <div className="option-desc">{option.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="button-container">
                    <button 
                        className={`complete-button ${loading ? 'loading' : ''}`}
                        onClick={handleComplete}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="loading-spinner"></span>
                                Завершаем настройку...
                            </>
                        ) : (
                            'Завершить настройку'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingStep5;