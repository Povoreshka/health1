import React from 'react';
import { Link } from 'react-router-dom';
import './WorkoutCard.css';

const WorkoutCard = ({ workout, compact = false }) => {
    if (!workout) return null;

    const formatDuration = (minutes) => {
        if (minutes < 60) return `${minutes} мин`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours} ч ${mins} мин` : `${hours} ч`;
    };

    const getIntensityColor = (intensity) => {
        switch (intensity?.toLowerCase()) {
            case 'низкая': return '#4caf50';
            case 'средняя': return '#ff9800';
            case 'высокая': return '#f44336';
            default: return '#9e9e9e';
        }
    };

    return (
        <div className={`workout-card ${compact ? 'compact' : ''}`}>
            <div className="workout-card-header">
                <div className="workout-type-icon">
                    {workout.type === 'силовая' ? '🏋️' : 
                     workout.type === 'кардио' ? '🏃' : 
                     workout.type === 'йога' ? '🧘' : '💪'}
                </div>
                <div className="workout-info">
                    <h3 className="workout-title">{workout.title}</h3>
                    <div className="workout-meta">
                        <span className="workout-type">{workout.type}</span>
                        {!compact && workout.muscle_groups && (
                            <span className="workout-muscles">{workout.muscle_groups.join(', ')}</span>
                        )}
                    </div>
                </div>
                {workout.completed && (
                    <div className="completed-badge">✓</div>
                )}
            </div>

            <div className="workout-stats">
                <div className="stat">
                    <span className="stat-label">⏱️</span>
                    <span className="stat-value">{formatDuration(workout.duration || 0)}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">🔥</span>
                    <span className="stat-value">{workout.calories || 0} ккал</span>
                </div>
                <div className="stat">
                    <span className="stat-label">⚡</span>
                    <span 
                        className="stat-value intensity"
                        style={{ color: getIntensityColor(workout.intensity) }}
                    >
                        {workout.intensity || 'Средняя'}
                    </span>
                </div>
            </div>

            {!compact && workout.description && (
                <p className="workout-description">{workout.description}</p>
            )}

            <div className="workout-card-footer">
                <span className="workout-date">
                    {new Date(workout.date || workout.created_at).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'short'
                    })}
                </span>
                <div className="workout-actions">
                    {workout.completed ? (
                        <button className="btn-outline" disabled>
                            Завершена
                        </button>
                    ) : (
                        <Link 
                            to={`/programs/${workout.id}`}
                            className="btn-primary"
                        >
                            Начать
                        </Link>
                    )}
                    {!compact && (
                        <Link 
                            to={`/programs/${workout.id}/details`}
                            className="btn-text"
                        >
                            Подробнее
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkoutCard;