import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Programs.css';

const Programs = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
    const navigate = useNavigate();

    const muscleGroups = [
        { id: 'chest', label: 'Грудь', icon: '💪', color: '#FF6B6B' },
        { id: 'back', label: 'Спина', icon: '🦸', color: '#4ECDC4' },
        { id: 'legs', label: 'Ноги', icon: '🦵', color: '#45B7D1' },
        { id: 'arms', label: 'Руки', icon: '💪', color: '#96CEB4' },
        { id: 'shoulders', label: 'Плечи', icon: '👨‍🚀', color: '#FFD166' },
        { id: 'abs', label: 'Пресс', icon: '🏋️', color: '#06D6A0' },
        { id: 'glutes', label: 'Ягодицы', icon: '🍑', color: '#EF476F' },
        { id: 'cardio', label: 'Кардио', icon: '🏃', color: '#118AB2' },
        { id: 'fullbody', label: 'Все тело', icon: '👤', color: '#073B4C' },
        { id: 'functional', label: 'Функц.', icon: '⚡', color: '#7209B7' },
        { id: 'flexibility', label: 'Гибкость', icon: '🧘', color: '#F72585' },
        { id: 'strength', label: 'Сила', icon: '🏋️‍♂️', color: '#3A86FF' }
    ];

    useEffect(() => {
        setTimeout(() => {
            const mockPrograms = [
                {
                    id: 1,
                    title: 'Ударный режим PRO',
                    description: '30 дней экстремальных тренировок для максимального прогресса',
                    duration: '30 дней',
                    level: 'advanced',
                    workoutsPerWeek: 6,
                    icon: '⚡',
                    color: '#FF6B6B',
                    intensity: 'Высокая',
                    active: true,
                    muscleGroups: ['chest', 'back', 'legs', 'arms', 'shoulders', 'abs'],
                    rating: 4.8,
                    participants: 2543
                },
                {
                    id: 2,
                    title: 'Базовая сила',
                    description: 'Фундаментальная программа для набора мышечной массы новичкам',
                    duration: '12 недель',
                    level: 'beginner',
                    workoutsPerWeek: 4,
                    icon: '💪',
                    color: '#4ECDC4',
                    intensity: 'Средняя',
                    active: false,
                    muscleGroups: ['chest', 'back', 'legs', 'arms'],
                    rating: 4.6,
                    participants: 1876
                },
                {
                    id: 3,
                    title: 'Кардио марафон',
                    description: 'Интенсивная программа для развития выносливости и сжигания жира',
                    duration: '8 недель',
                    level: 'intermediate',
                    workoutsPerWeek: 5,
                    icon: '🏃',
                    color: '#45B7D1',
                    intensity: 'Высокая',
                    active: false,
                    muscleGroups: ['cardio', 'legs', 'fullbody'],
                    rating: 4.7,
                    participants: 3210
                },
                {
                    id: 4,
                    title: 'Йога-трансформация',
                    description: 'Глубокая работа с телом и сознанием для гармонии и гибкости',
                    duration: '6 недель',
                    level: 'beginner',
                    workoutsPerWeek: 7,
                    icon: '🧘',
                    color: '#96CEB4',
                    intensity: 'Низкая',
                    active: false,
                    muscleGroups: ['flexibility', 'fullbody'],
                    rating: 4.9,
                    participants: 1890
                },
                {
                    id: 5,
                    title: 'Женский фитнес',
                    description: 'Специальная программа для тонуса и формы женского тела',
                    duration: '10 недель',
                    level: 'intermediate',
                    workoutsPerWeek: 5,
                    icon: '👩',
                    color: '#FFEAA7',
                    intensity: 'Средняя',
                    active: false,
                    muscleGroups: ['glutes', 'legs', 'abs', 'arms'],
                    rating: 4.8,
                    participants: 4321
                },
                {
                    id: 6,
                    title: 'Силовой пауэрлифтинг',
                    description: 'Максимальное развитие силы в базовых упражнениях',
                    duration: '16 недель',
                    level: 'advanced',
                    workoutsPerWeek: 4,
                    icon: '🏋️‍♂️',
                    color: '#DDA0DD',
                    intensity: 'Очень высокая',
                    active: false,
                    muscleGroups: ['strength', 'legs', 'back', 'chest'],
                    rating: 4.5,
                    participants: 987
                },
                {
                    id: 7,
                    title: 'Функциональный тренинг',
                    description: 'Развитие функциональной силы для повседневной жизни',
                    duration: '8 недель',
                    level: 'intermediate',
                    workoutsPerWeek: 3,
                    icon: '⚡',
                    color: '#FF9A76',
                    intensity: 'Средняя',
                    active: false,
                    muscleGroups: ['functional', 'fullbody', 'strength'],
                    rating: 4.4,
                    participants: 1567
                },
                {
                    id: 8,
                    title: 'Сушка и рельеф',
                    description: 'Экстремальная программа для достижения спортивной формы',
                    duration: '6 недель',
                    level: 'advanced',
                    workoutsPerWeek: 6,
                    icon: '🔥',
                    color: '#3D5A80',
                    intensity: 'Очень высокая',
                    active: false,
                    muscleGroups: ['cardio', 'abs', 'arms', 'chest'],
                    rating: 4.2,
                    participants: 2100
                },
                {
                    id: 9,
                    title: 'Растяжка и мобильность',
                    description: 'Улучшение гибкости и подвижности суставов',
                    duration: '4 недели',
                    level: 'beginner',
                    workoutsPerWeek: 7,
                    icon: '✨',
                    color: '#98C1D9',
                    intensity: 'Низкая',
                    active: false,
                    muscleGroups: ['flexibility', 'fullbody'],
                    rating: 4.9,
                    participants: 2789
                },
                {
                    id: 10,
                    title: 'HIIT интенсив',
                    description: 'Высокоинтенсивные интервальные тренировки для быстрых результатов',
                    duration: '5 недель',
                    level: 'intermediate',
                    workoutsPerWeek: 4,
                    icon: '⚡',
                    color: '#EE6C4D',
                    intensity: 'Экстремальная',
                    active: false,
                    muscleGroups: ['cardio', 'fullbody', 'abs'],
                    rating: 4.6,
                    participants: 3456
                },
                {
                    id: 11,
                    title: 'Бодибилдинг классик',
                    description: 'Классическая программа для построения гармоничного тела',
                    duration: '12 недель',
                    level: 'advanced',
                    workoutsPerWeek: 5,
                    icon: '🏆',
                    color: '#06D6A0',
                    intensity: 'Высокая',
                    active: false,
                    muscleGroups: ['chest', 'back', 'legs', 'arms', 'shoulders', 'abs'],
                    rating: 4.7,
                    participants: 1876
                },
                {
                    id: 12,
                    title: 'Утренняя зарядка+',
                    description: 'Энергичные утренние тренировки для бодрости на весь день',
                    duration: '4 недели',
                    level: 'beginner',
                    workoutsPerWeek: 7,
                    icon: '☀️',
                    color: '#FFD166',
                    intensity: 'Низкая',
                    active: false,
                    muscleGroups: ['fullbody', 'cardio'],
                    rating: 4.8,
                    participants: 5123
                }
            ];
            
            setPrograms(mockPrograms);
            setLoading(false);
        }, 1000);
    }, []);

    const categories = [
        { id: 'all', label: 'Все программы', icon: '🌟' },
        { id: 'beginner', label: 'Новичкам', icon: '🌱' },
        { id: 'intermediate', label: 'Продолжающим', icon: '📈' },
        { id: 'advanced', label: 'Профи', icon: '🔥' }
    ];

    const intensityColors = {
        'Низкая': '#4CAF50',
        'Средняя': '#FF9800',
        'Высокая': '#F44336',
        'Очень высокая': '#9C27B0',
        'Экстремальная': '#D32F2F'
    };

    const handleMuscleGroupToggle = (groupId) => {
        setSelectedMuscleGroups(prev => {
            if (prev.includes(groupId)) {
                return prev.filter(id => id !== groupId);
            } else {
                return [...prev, groupId];
            }
        });
    };

    const filteredPrograms = selectedCategory === 'all' 
        ? programs 
        : programs.filter(program => program.level === selectedCategory);

    const filteredByMuscleGroups = selectedMuscleGroups.length > 0
        ? filteredPrograms.filter(program => 
            selectedMuscleGroups.some(group => program.muscleGroups.includes(group))
        )
        : filteredPrograms;

    const [showMuscleSelection, setShowMuscleSelection] = useState(false);
    const [selectedProgramId, setSelectedProgramId] = useState(null);

    const handleSelectProgram = (programId) => {
        const selectedProgram = programs.find(p => p.id === programId);
        
        setShowMuscleSelection(true);
        setSelectedProgramId(programId);
        
        setSelectedMuscleGroups(selectedProgram.muscleGroups);
    };

    const confirmProgramSelection = () => {
        if (selectedProgramId) {
            const updatedPrograms = programs.map(program => ({
                ...program,
                active: program.id === selectedProgramId
            }));
            setPrograms(updatedPrograms);
            
            const selectedProgram = programs.find(p => p.id === selectedProgramId);
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            
            localStorage.setItem('userData', JSON.stringify({
                ...userData,
                currentProgram: {
                    ...selectedProgram,
                    selectedMuscleGroups: selectedMuscleGroups
                }
            }));
            
            alert(`🎉 Вы выбрали программу "${selectedProgram.title}"!`);
            setShowMuscleSelection(false);
            setSelectedProgramId(null);
        }
    };

    const handleViewDetails = (programId) => {
        navigate(`/programs/${programId}`);
    };

    const clearMuscleFilters = () => {
        setSelectedMuscleGroups([]);
    };

    if (loading) {
        return (
            <div className="programs-loading">
                <div className="loading-spinner">
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                </div>
                <p>Загружаем лучшие программы для вас...</p>
            </div>
        );
    }

    return (
        <div className="programs-page">
            <div className="programs-header">
                <button className="back-button" onClick={() => navigate('/home')}>
                    <span className="back-arrow">←</span>
                    <span>Назад</span>
                </button>
                <div className="header-content">
                    <h1>🎯 Программы тренировок</h1>
                    <p>Выберите идеальную программу для достижения ваших целей</p>
                </div>
            </div>

            <div className="categories-filter">
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        <span className="category-icon">{category.icon}</span>
                        <span className="category-label">{category.label}</span>
                    </button>
                ))}
            </div>

            <div className="muscle-groups-section">
                <div className="section-header">
                    <h3>🎯 Фокус на группы мышц</h3>
                    {selectedMuscleGroups.length > 0 && (
                        <button className="clear-filters" onClick={clearMuscleFilters}>
                            Очистить фильтры
                        </button>
                    )}
                </div>
                <div className="muscle-groups-grid">
                    {muscleGroups.map(group => (
                        <div
                            key={group.id}
                            className={`muscle-group-card ${selectedMuscleGroups.includes(group.id) ? 'selected' : ''}`}
                            onClick={() => handleMuscleGroupToggle(group.id)}
                            style={{
                                '--muscle-color': group.color,
                                background: selectedMuscleGroups.includes(group.id) 
                                    ? `linear-gradient(135deg, ${group.color}20, ${group.color}40)`
                                    : '#f8f9fa'
                            }}
                        >
                            <div 
                                className="muscle-icon-wrapper"
                                style={{ 
                                    backgroundColor: selectedMuscleGroups.includes(group.id) 
                                        ? group.color 
                                        : `${group.color}20`
                                }}
                            >
                                <span className="muscle-icon">{group.icon}</span>
                            </div>
                            <span className="muscle-label">{group.label}</span>
                            {selectedMuscleGroups.includes(group.id) && (
                                <div className="selected-indicator">
                                    <span className="check-icon">✓</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="programs-info-bar">
                <div className="info-item">
                    <span className="info-icon">📊</span>
                    <span className="info-text">
                        Найдено программ: <strong>{filteredByMuscleGroups.length}</strong>
                    </span>
                </div>
                <div className="info-item">
                    <span className="info-icon">👥</span>
                    <span className="info-text">
                        Всего участников: <strong>{programs.reduce((sum, p) => sum + p.participants, 0).toLocaleString()}</strong>
                    </span>
                </div>
            </div>

            <div className="programs-grid">
                {filteredByMuscleGroups.map((program, index) => {
                    const style = {
                        borderLeftColor: program.color,
                        '--index': index,
                        animationDelay: `${index * 0.05}s`
                    };
                    
                    return (
                        <div 
                            key={program.id} 
                            className={`program-card ${program.active ? 'active' : ''}`}
                            style={style}
                        >
                            <div className="program-badge" style={{ backgroundColor: program.color }}>
                                {program.icon}
                            </div>
                            
                            <div className="program-header">
                                <div className="program-title-section">
                                    <h3>{program.title}</h3>
                                    <div className="program-rating">
                                        <span className="stars">{"★".repeat(Math.floor(program.rating))}</span>
                                        <span className="rating-value">{program.rating}</span>
                                        <span className="participants">({program.participants})</span>
                                    </div>
                                </div>
                                
                                <div className="program-description">
                                    {program.description}
                                </div>
                                
                                <div className="program-tags">
                                    <span 
                                        className="intensity-tag"
                                        style={{ backgroundColor: intensityColors[program.intensity] }}
                                    >
                                        {program.intensity}
                                    </span>
                                    <span className="duration-tag">
                                        ⏱️ {program.duration}
                                    </span>
                                    <span className="workouts-tag">
                                        💪 {program.workoutsPerWeek}/нед
                                    </span>
                                </div>
                                
                                <div className="program-muscle-preview">
                                    <div className="muscle-preview-icons">
                                        {program.muscleGroups.slice(0, 5).map(muscleId => {
                                            const muscle = muscleGroups.find(m => m.id === muscleId);
                                            return muscle ? (
                                                <div 
                                                    key={muscleId} 
                                                    className="muscle-preview-icon"
                                                    title={muscle.label}
                                                    style={{ backgroundColor: muscle.color }}
                                                >
                                                    {muscle.icon}
                                                </div>
                                            ) : null;
                                        })}
                                        {program.muscleGroups.length > 5 && (
                                            <div className="muscle-preview-more">
                                                +{program.muscleGroups.length - 5}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="program-actions">
                                <button 
                                    className={`select-btn ${program.active ? 'active' : ''}`}
                                    onClick={() => handleSelectProgram(program.id)}
                                >
                                    {program.active ? (
                                        <>
                                            <span className="check-icon">✓</span>
                                            <span>Выбрана</span>
                                        </>
                                    ) : 'Выбрать программу'}
                                </button>
                                <button 
                                    className="details-btn"
                                    onClick={() => handleViewDetails(program.id)}
                                >
                                    <span>Подробнее</span>
                                    <span className="arrow">→</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {showMuscleSelection && (
                <div className="muscle-selection-modal">
                    <div className="modal-overlay" onClick={() => setShowMuscleSelection(false)}></div>
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">
                                <h3>🎯 Выбор фокуса</h3>
                                <p>Выберите группы мышц для акцента в программе</p>
                            </div>
                            <button className="close-modal" onClick={() => setShowMuscleSelection(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="muscle-selection-grid">
                                {muscleGroups.map(group => (
                                    <div 
                                        key={group.id}
                                        className={`muscle-selection-item ${selectedMuscleGroups.includes(group.id) ? 'selected' : ''}`}
                                        onClick={() => handleMuscleGroupToggle(group.id)}
                                        style={{
                                            '--muscle-color': group.color,
                                            background: selectedMuscleGroups.includes(group.id) 
                                                ? `linear-gradient(135deg, ${group.color}20, ${group.color}40)`
                                                : '#f8f9fa'
                                        }}
                                    >
                                        <div 
                                            className="selection-icon"
                                            style={{ 
                                                backgroundColor: selectedMuscleGroups.includes(group.id) 
                                                    ? group.color 
                                                    : `${group.color}20`,
                                                color: selectedMuscleGroups.includes(group.id) ? 'white' : group.color
                                            }}
                                        >
                                            {group.icon}
                                        </div>
                                        <span className="selection-label">{group.label}</span>
                                        {selectedMuscleGroups.includes(group.id) && (
                                            <div className="selection-check">
                                                <div className="check-circle">
                                                    <span>✓</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            <div className="selection-summary">
                                <h4>Вы выбрали: {selectedMuscleGroups.length} групп мышц</h4>
                                <div className="selected-groups-list">
                                    {selectedMuscleGroups.map(groupId => {
                                        const group = muscleGroups.find(m => m.id === groupId);
                                        return group ? (
                                            <span key={groupId} className="selected-group-tag">
                                                <span className="tag-icon">{group.icon}</span>
                                                {group.label}
                                            </span>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button 
                                className="cancel-btn"
                                onClick={() => setShowMuscleSelection(false)}
                            >
                                Отмена
                            </button>
                            <button 
                                className="confirm-btn"
                                onClick={confirmProgramSelection}
                                disabled={selectedMuscleGroups.length === 0}
                            >
                                <span>Подтвердить выбор</span>
                                <span className="btn-icon">🎯</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {filteredByMuscleGroups.length === 0 && (
                <div className="no-results">
                    <div className="no-results-icon">🤔</div>
                    <h3>Программы не найдены</h3>
                    <p>Попробуйте изменить фильтры или выбрать другие группы мышц</p>
                    <button className="reset-filters" onClick={clearMuscleFilters}>
                        Сбросить все фильтры
                    </button>
                </div>
            )}

            <div className="current-program-section">
                <div className="section-title">
                    <h2>⭐ Текущая программа</h2>
                    <div className="section-decoration"></div>
                </div>
                {programs.filter(p => p.active).length > 0 ? (
                    programs
                        .filter(p => p.active)
                        .map(activeProgram => (
                            <div key={activeProgram.id} className="current-program-card">
                                <div className="current-program-banner">
                                    <div className="banner-icon">{activeProgram.icon}</div>
                                    <div className="banner-content">
                                        <h3>{activeProgram.title}</h3>
                                        <p>{activeProgram.description}</p>
                                    </div>
                                    <div className="active-badge">АКТИВНА</div>
                                </div>
                                <div className="program-progress">
                                    <div className="progress-header">
                                        <span>Прогресс</span>
                                        <span>45%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div 
                                            className="progress-fill"
                                            style={{ 
                                                width: '45%',
                                                background: `linear-gradient(90deg, ${activeProgram.color}, ${activeProgram.color}dd)`
                                            }}
                                        >
                                            <div className="progress-glow"></div>
                                        </div>
                                    </div>
                                    <div className="progress-info">
                                        <div className="progress-item">
                                            <span className="progress-label">Завершено:</span>
                                            <span className="progress-value">13 дней</span>
                                        </div>
                                        <div className="progress-item">
                                            <span className="progress-label">Осталось:</span>
                                            <span className="progress-value">17 дней</span>
                                        </div>
                                        <div className="progress-item">
                                            <span className="progress-label">Интенсивность:</span>
                                            <span 
                                                className="progress-value intensity"
                                                style={{ color: intensityColors[activeProgram.intensity] }}
                                            >
                                                {activeProgram.intensity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                ) : (
                    <div className="no-program-selected">
                        <div className="no-program-icon">🎯</div>
                        <div className="no-program-content">
                            <h3>Вы еще не выбрали программу</h3>
                            <p>Начните свой путь к идеальной форме прямо сейчас!</p>
                        </div>
                        <button className="select-program-btn" onClick={() => setSelectedCategory('all')}>
                            <span>Выбрать программу</span>
                            <span className="btn-icon">→</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Programs;