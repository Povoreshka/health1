import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingStep1.css';

const OnboardingStep1 = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: ''
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleNext = () => {
        localStorage.setItem('onboardingStep1', JSON.stringify(formData));
        navigate('/onboarding/2');
    };

    const isFormValid = () => {
        return formData.name && formData.age && formData.gender;
    };

    return (
        <div className="onboarding-step1">
            <div className="onboarding-wrapper">
                <div className="back-button" onClick={() => navigate('/')}>
                    ←
                </div>
                
                <div className="progress-container">
                    <div className="progress-step active">1</div>
                    <div className="progress-line"></div>
                    <div className="progress-step">2</div>
                    <div className="progress-line"></div>
                    <div className="progress-step">3</div>
                    <div className="progress-line"></div>
                    <div className="progress-step">4</div>
                    <div className="progress-line"></div>
                    <div className="progress-step">5</div>
                </div>
                
                <div className="onboarding-header">
                    <h1>Кто вы?</h1>
                    <p>Расскажите немного о себе</p>
                </div>
                
                <div className="form-container">
                    <div className="form-group">
                        <label>Имя</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ваше имя"
                            className="form-input"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Возраст</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Лет"
                            min="10"
                            max="100"
                            className="form-input"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Пол</label>
                        <div className="gender-options">
                            <div 
                                className={`gender-option ${formData.gender === 'male' ? 'selected' : ''}`}
                                onClick={() => setFormData({...formData, gender: 'male'})}
                            >
                                <div className="gender-icon">👨</div>
                                <span>Мужской</span>
                            </div>
                            <div 
                                className={`gender-option ${formData.gender === 'female' ? 'selected' : ''}`}
                                onClick={() => setFormData({...formData, gender: 'female'})}
                            >
                                <div className="gender-icon">👩</div>
                                <span>Женский</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="button-container">
                    <button 
                        className={`next-button ${isFormValid() ? '' : 'disabled'}`}
                        onClick={handleNext}
                        disabled={!isFormValid()}
                    >
                        Далее
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingStep1;