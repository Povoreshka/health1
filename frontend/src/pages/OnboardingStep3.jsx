import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingStep3.css';

const OnboardingStep3 = () => {
    const [goals, setGoals] = useState([]);
    
    const navigate = useNavigate();

    React.useEffect(() => {
        const step1Data = JSON.parse(localStorage.getItem('onboardingStep1') || '{}');
        if (!step1Data.name) {
            navigate('/onboarding/1');
        }
    }, [navigate]);

    const fitnessGoals = [
        { id: 'weight_loss', label: 'Похудеть', icon: '⚖️', desc: 'Снижение веса' },
        { id: 'muscle_gain', label: 'Набрать массу', icon: '💪', desc: 'Рост мышц' },
        { id: 'strength', label: 'Сила', icon: '🏋️', desc: 'Увеличение силы' },
        { id: 'endurance', label: 'Выносливость', icon: '🏃', desc: 'Повышение выносливости' },
        { id: 'health', label: 'Здоровье', icon: '❤️', desc: 'Улучшение здоровья' },
        { id: 'flexibility', label: 'Гибкость', icon: '🧘', desc: 'Развитие гибкости' },
        { id: 'energy', label: 'Энергия', icon: '⚡', desc: 'Повышение энергии' },
        { id: 'stress', label: 'Снятие стресса', icon: '😌', desc: 'Релаксация' },
    ];

    const handleGoalToggle = (goalId) => {
        setGoals(prev => 
            prev.includes(goalId) 
                ? prev.filter(id => id !== goalId)
                : [...prev, goalId]
        );
    };

    const handleNext = () => {
        const step1Data = JSON.parse(localStorage.getItem('onboardingStep1') || '{}');
        const stepData = {
            ...step1Data,
            goals
        };
        localStorage.setItem('onboardingStep1', JSON.stringify(stepData));
        navigate('/onboarding/4');
    };

    const handleBack = () => {
        navigate('/onboarding/2');
    };

    return (
        <div className="onboarding-step3">
            <div className="onboarding-wrapper">
                <div className="back-button" onClick={handleBack}>
                    ←
                </div>
                
                <div className="progress-container">
                    <div className="progress-step completed">1</div>
                    <div className="progress-line"></div>
                    <div className="progress-step completed">2</div>
                    <div className="progress-line"></div>
                    <div className="progress-step active">3</div>
                    <div className="progress-line"></div>
                    <div className="progress-step">4</div>
                    <div className="progress-line"></div>
                    <div className="progress-step">5</div>
                </div>
                
                <div className="onboarding-header">
                    <h1>Ваши цели тренировок</h1>
                    <p>Выберите, чего хотите достичь</p>
                </div>
                
                <div className="form-container">
                    <div className="form-section">
                        <label>Что для вас важно?</label>
                        <p className="section-description">Можно выбрать несколько целей</p>
                        <div className="goals-grid">
                            {fitnessGoals.map(goal => (
                                <div 
                                    key={goal.id}
                                    className={`goal-card ${goals.includes(goal.id) ? 'selected' : ''}`}
                                    onClick={() => handleGoalToggle(goal.id)}
                                >
                                    <div className="goal-icon">{goal.icon}</div>
                                    <div className="goal-content">
                                        <h4>{goal.label}</h4>
                                        <p>{goal.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="button-container">
                    <button 
                        className={`next-button ${goals.length > 0 ? '' : 'disabled'}`}
                        onClick={handleNext}
                        disabled={goals.length === 0}
                    >
                        Далее
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingStep3;