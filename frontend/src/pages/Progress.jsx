import React, { useState } from 'react';
import ProgressChart from '../components/charts/ProgressChart';
import WorkoutHistory from '../components/workouts/WorkoutHistory';

const Progress = () => {
    const [timeRange, setTimeRange] = useState('month');

    return (
        <div className="progress-page">
            <div className="page-header">
                <h1>Мой прогресс</h1>
                <div className="time-filters">
                    <button 
                        className={`btn ${timeRange === 'week' ? 'btn-active' : 'btn-outline'}`}
                        onClick={() => setTimeRange('week')}
                    >
                        Неделя
                    </button>
                    <button 
                        className={`btn ${timeRange === 'month' ? 'btn-active' : 'btn-outline'}`}
                        onClick={() => setTimeRange('month')}
                    >
                        Месяц
                    </button>
                    <button 
                        className={`btn ${timeRange === 'year' ? 'btn-active' : 'btn-outline'}`}
                        onClick={() => setTimeRange('year')}
                    >
                        Год
                    </button>
                </div>
            </div>
            
            <div className="charts-section">
                <div className="chart-card">
                    <h3>Прогресс веса</h3>
                    <ProgressChart type="weight" timeRange={timeRange} />
                </div>
                
                <div className="chart-card">
                    <h3>Прогресс тренировок</h3>
                    <ProgressChart type="workouts" timeRange={timeRange} />
                </div>
            </div>
            
            <div className="history-section">
                <h2>История тренировок</h2>
                <WorkoutHistory />
            </div>
            
            <div className="achievements">
                <h2>Достижения</h2>
                <div className="achievements-grid">
                    <div className="achievement">
                        <div className="achievement-icon">🏆</div>
                        <h4>Первая тренировка</h4>
                        <p>Выполнена 15.01.2024</p>
                    </div>
                    <div className="achievement">
                        <div className="achievement-icon">🔥</div>
                        <h4>10 тренировок подряд</h4>
                        <p>Достигнуто 20.01.2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Progress;