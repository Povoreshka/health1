import React, { useState, useEffect, useRef } from 'react';
import { getProgressData } from '../../api/progress.api';
import './ProgressChart.css';

const ProgressChart = ({ period = 'week', height = 300 }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMetric, setSelectedMetric] = useState('weight');
    const canvasRef = useRef(null);

    const metrics = {
        weight: { label: 'Вес (кг)', color: '#2196f3' },
        bmi: { label: 'ИМТ', color: '#4caf50' },
        workouts: { label: 'Тренировки', color: '#ff9800' },
        calories: { label: 'Сожжено калорий', color: '#f44336' }
    };

    useEffect(() => {
        fetchProgressData();
    }, [period]);

    useEffect(() => {
        if (data.length > 0 && canvasRef.current) {
            drawChart();
        }
    }, [data, selectedMetric, period]);

    const fetchProgressData = async () => {
        try {
            const progressData = await getProgressData(period);
            setData(progressData);
        } catch (error) {
            console.error('Error fetching progress data:', error);
            // Mock data for demo
            setData(generateMockData());
        } finally {
            setLoading(false);
        }
    };

    const generateMockData = () => {
        const days = period === 'week' ? 7 : period === 'month' ? 30 : 90;
        return Array.from({ length: days }, (_, i) => ({
            date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000),
            weight: 70 + Math.random() * 4 - 2,
            bmi: 22 + Math.random() * 2 - 1,
            workouts: Math.floor(Math.random() * 3),
            calories: Math.floor(Math.random() * 500 + 200)
        }));
    };

    const drawChart = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const padding = { top: 20, right: 30, bottom: 40, left: 50 };

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        if (data.length === 0) return;

        // Get values for selected metric
        const values = data.map(d => d[selectedMetric]);
        const dates = data.map(d => d.date);

        // Calculate scales
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        // Draw grid
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;

        // Horizontal grid lines
        const gridLines = 5;
        for (let i = 0; i <= gridLines; i++) {
            const y = padding.top + (chartHeight / gridLines) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();

            // Y-axis labels
            ctx.fillStyle = '#666';
            ctx.font = '12px Arial';
            ctx.textAlign = 'right';
            const value = maxValue - ((maxValue - minValue) / gridLines) * i;
            ctx.fillText(value.toFixed(1), padding.left - 10, y + 4);
        }

        // Draw data line
        ctx.beginPath();
        ctx.strokeStyle = metrics[selectedMetric].color;
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';

        data.forEach((point, i) => {
            const x = padding.left + (chartWidth / (data.length - 1)) * i;
            const y = padding.top + chartHeight - ((point[selectedMetric] - minValue) / (maxValue - minValue)) * chartHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            // Draw points
            ctx.fillStyle = metrics[selectedMetric].color;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.stroke();

        // Draw X-axis labels (dates)
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';

        const labelStep = Math.ceil(data.length / 6);
        data.forEach((point, i) => {
            if (i % labelStep === 0 || i === data.length - 1) {
                const x = padding.left + (chartWidth / (data.length - 1)) * i;
                const dateStr = new Date(point.date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'short'
                });
                ctx.fillText(dateStr, x, height - 10);
            }
        });

        // Draw metric label
        ctx.fillStyle = metrics[selectedMetric].color;
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(metrics[selectedMetric].label, padding.left, padding.top - 10);
    };

    if (loading) {
        return <div className="progress-chart-loading">Загрузка графика...</div>;
    }

    return (
        <div className="progress-chart">
            <div className="chart-controls">
                <div className="period-selector">
                    <button 
                        className={`period-btn ${period === 'week' ? 'active' : ''}`}
                        onClick={() => fetchProgressData('week')}
                    >
                        Неделя
                    </button>
                    <button 
                        className={`period-btn ${period === 'month' ? 'active' : ''}`}
                        onClick={() => fetchProgressData('month')}
                    >
                        Месяц
                    </button>
                    <button 
                        className={`period-btn ${period === 'quarter' ? 'active' : ''}`}
                        onClick={() => fetchProgressData('quarter')}
                    >
                        3 месяца
                    </button>
                </div>
                
                <div className="metric-selector">
                    {Object.keys(metrics).map(metric => (
                        <button
                            key={metric}
                            className={`metric-btn ${selectedMetric === metric ? 'active' : ''}`}
                            onClick={() => setSelectedMetric(metric)}
                            style={{
                                color: selectedMetric === metric ? metrics[metric].color : '#666',
                                borderColor: selectedMetric === metric ? metrics[metric].color : '#ddd'
                            }}
                        >
                            {metrics[metric].label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="chart-container">
                <canvas 
                    ref={canvasRef}
                    width={800}
                    height={height}
                    className="chart-canvas"
                />
            </div>

            <div className="chart-stats">
                {data.length > 0 && (
                    <>
                        <div className="stat-item">
                            <span className="stat-label">Текущее:</span>
                            <span className="stat-value">
                                {data[data.length - 1][selectedMetric]}
                                {selectedMetric === 'weight' ? ' кг' : 
                                 selectedMetric === 'bmi' ? '' :
                                 selectedMetric === 'calories' ? ' ккал' : ''}
                            </span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Изменение:</span>
                            <span className={`stat-value ${
                                data[data.length - 1][selectedMetric] > data[0][selectedMetric] ? 'positive' :
                                data[data.length - 1][selectedMetric] < data[0][selectedMetric] ? 'negative' : 'neutral'
                            }`}>
                                {data[data.length - 1][selectedMetric] > data[0][selectedMetric] ? '↑' :
                                 data[data.length - 1][selectedMetric] < data[0][selectedMetric] ? '↓' : '→'}
                                {Math.abs(data[data.length - 1][selectedMetric] - data[0][selectedMetric]).toFixed(1)}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProgressChart;