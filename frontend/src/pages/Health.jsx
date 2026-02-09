// Health.jsx
import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import './Health.css';

const Health = () => {
  const [fitnessData, setFitnessData] = useState(() => {
    const savedData = localStorage.getItem('fitnessData');
    return savedData ? JSON.parse(savedData) : [];
  });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    
    // Основные показатели
    weight: '',
    bodyFat: '',
    muscleMass: '',
    
    // Обхваты тела
    chest: '',
    waist: '',
    hips: '',
    thigh: '',
    biceps: '',
    
    // Сердечно-сосудистая система
    avgHeartRate: '',
    maxHeartRate: '',
    
    // Питание
    calories: '',
    protein: '',
    fats: '',
    carbs: '',
    water: '',
    
    // Самочувствие
    energyLevel: '5',
    painLevel: '0',
    sleepQuality: '5',
    
    notes: ''
  });
  
  const [editingIndex, setEditingIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('form');

  // Сохраняем данные в localStorage
  useEffect(() => {
    localStorage.setItem('fitnessData', JSON.stringify(fitnessData));
  }, [fitnessData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Валидация
    const totalMacros = parseInt(formData.protein || 0) + parseInt(formData.fats || 0) + parseInt(formData.carbs || 0);
    if (totalMacros > 100) {
      alert('Сумма БЖУ не может превышать 100%');
      return;
    }
    
    if (editingIndex !== null) {
      const updatedData = [...fitnessData];
      updatedData[editingIndex] = formData;
      setFitnessData(updatedData);
      setEditingIndex(null);
    } else {
      setFitnessData(prev => [formData, ...prev]);
    }
    
    // Сброс формы
    setFormData({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      bodyFat: '',
      muscleMass: '',
      chest: '',
      waist: '',
      hips: '',
      thigh: '',
      biceps: '',
      avgHeartRate: '',
      maxHeartRate: '',
      calories: '',
      protein: '',
      fats: '',
      carbs: '',
      water: '',
      energyLevel: '5',
      painLevel: '0',
      sleepQuality: '5',
      notes: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(fitnessData[index]);
    setEditingIndex(index);
    setActiveTab('form');
  };

  const handleDelete = (index) => {
    if (window.confirm('Удалить эту запись?')) {
      setFitnessData(prev => prev.filter((_, i) => i !== index));
    }
  };

  const calculateProgress = () => {
    if (fitnessData.length < 2) return null;
    
    const sortedData = [...fitnessData].sort((a, b) => new Date(a.date) - new Date(b.date));
    const latest = sortedData[sortedData.length - 1];
    const earliest = sortedData[0];
    
    const calculateDiff = (field) => {
      if (latest[field] && earliest[field]) {
        const diff = (parseFloat(latest[field]) - parseFloat(earliest[field])).toFixed(1);
        return {
          value: diff,
          diff: parseFloat(diff)
        };
      }
      return null;
    };

    return {
      weight: calculateDiff('weight'),
      bodyFat: calculateDiff('bodyFat'),
      waist: calculateDiff('waist'),
      chest: calculateDiff('chest'),
      avgHeartRate: calculateDiff('avgHeartRate'),
      energyLevel: calculateDiff('energyLevel'),
      sleepQuality: calculateDiff('sleepQuality')
    };
  };

  const progress = calculateProgress();

  const getLevelColor = (level, type = 'energy') => {
    const levels = {
      energy: ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'],
      pain: ['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444'],
      sleep: ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e']
    };
    
    const colors = levels[type] || levels.energy;
    const index = Math.min(Math.max(Math.floor(parseInt(level) / 2), 0), 4);
    return colors[index];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { weekday: 'short' });
  };

  // Расчет средних значений
  const calculateAverages = () => {
    if (fitnessData.length === 0) return null;
    
    const fields = ['weight', 'bodyFat', 'waist', 'chest', 'avgHeartRate', 'energyLevel', 'sleepQuality'];
    const averages = {};
    
    fields.forEach(field => {
      const values = fitnessData
        .map(d => parseFloat(d[field]))
        .filter(v => !isNaN(v));
      
      if (values.length > 0) {
        const sum = values.reduce((a, b) => a + b, 0);
        averages[field] = (sum / values.length).toFixed(1);
      }
    });
    
    return averages;
  };

  const averages = calculateAverages();

  // Последние 7 записей для графика
  const last7Records = fitnessData
    .filter(record => record.weight)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7)
    .reverse();

  return (
    <div className="health-container">
      
      <header className="health-header">
        <h1>📖 Дневник Здоровья</h1>
        <p>Отслеживайте свои показатели здоровья и самочувствия каждый день</p>
        <button className="back-button" onClick={() => navigate('/home')}>
            <span className="back-arrow">←</span>
        </button>
      </header>

      <div className="health-tabs">
        <button 
          className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          ✍️ Новая запись
        </button>
        <button 
          className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          📊 Статистика
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          🗓️ История
        </button>
      </div>

      {activeTab === 'form' && (
        <div className="health-grid">
          <div className="left-column">
            {/* Основные показатели */}
            <div className="health-card">
              <h2><i>⚖️</i> Основные показатели</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Дата измерения:</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Вес (кг):</label>
                  <input
                    type="number"
                    step="0.1"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="70.5"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>% Жира:</label>
                  <input
                    type="number"
                    step="0.1"
                    name="bodyFat"
                    value={formData.bodyFat}
                    onChange={handleInputChange}
                    placeholder="20.0"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Мышцы (кг):</label>
                  <input
                    type="number"
                    step="0.1"
                    name="muscleMass"
                    value={formData.muscleMass}
                    onChange={handleInputChange}
                    placeholder="55.0"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Обхваты тела */}
            <div className="health-card">
              <h2><i>📏</i> Обхваты тела (см)</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Грудь:</label>
                  <input
                    type="number"
                    step="0.1"
                    name="chest"
                    value={formData.chest}
                    onChange={handleInputChange}
                    placeholder="100.0"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Талия:</label>
                  <input
                    type="number"
                    step="0.1"
                    name="waist"
                    value={formData.waist}
                    onChange={handleInputChange}
                    placeholder="80.0"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Таз/Бедра:</label>
                  <input
                    type="number"
                    step="0.1"
                    name="hips"
                    value={formData.hips}
                    onChange={handleInputChange}
                    placeholder="95.0"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Бедро:</label>
                  <input
                    type="number"
                    step="0.1"
                    name="thigh"
                    value={formData.thigh}
                    onChange={handleInputChange}
                    placeholder="55.0"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Плечо/Бицепс:</label>
                  <input
                    type="number"
                    step="0.1"
                    name="biceps"
                    value={formData.biceps}
                    onChange={handleInputChange}
                    placeholder="35.0"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Пульс */}
            <div className="health-card">
              <h2><i>❤️</i> Сердечный ритм</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Средний пульс (уд/мин):</label>
                  <input
                    type="number"
                    name="avgHeartRate"
                    value={formData.avgHeartRate}
                    onChange={handleInputChange}
                    placeholder="70"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Макс. пульс (уд/мин):</label>
                  <input
                    type="number"
                    name="maxHeartRate"
                    value={formData.maxHeartRate}
                    onChange={handleInputChange}
                    placeholder="160"
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="right-column">
            {/* Питание */}
            <div className="health-card">
              <h2><i>🥗</i> Питание</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Калории (ккал):</label>
                  <input
                    type="number"
                    name="calories"
                    value={formData.calories}
                    onChange={handleInputChange}
                    placeholder="2500"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Вода (л):</label>
                  <input
                    type="number"
                    step="0.1"
                    name="water"
                    value={formData.water}
                    onChange={handleInputChange}
                    placeholder="2.0"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="macros-section">
                <h3>Баланс БЖУ (%)</h3>
                <div className="macros-row">
                  <div className="macro-group">
                    <label>Белки:</label>
                    <input
                      type="number"
                      name="protein"
                      value={formData.protein}
                      onChange={handleInputChange}
                      placeholder="30"
                      className="form-input macro-input"
                    />
                  </div>
                  
                  <div className="macro-group">
                    <label>Жиры:</label>
                    <input
                      type="number"
                      name="fats"
                      value={formData.fats}
                      onChange={handleInputChange}
                      placeholder="25"
                      className="form-input macro-input"
                    />
                  </div>
                  
                  <div className="macro-group">
                    <label>Углеводы:</label>
                    <input
                      type="number"
                      name="carbs"
                      value={formData.carbs}
                      onChange={handleInputChange}
                      placeholder="45"
                      className="form-input macro-input"
                    />
                  </div>
                </div>
                <div className="macros-sum">
                  Всего: {parseInt(formData.protein || 0) + parseInt(formData.fats || 0) + parseInt(formData.carbs || 0)}%
                </div>
              </div>
            </div>

            {/* Самочувствие */}
            <div className="health-card">
              <h2><i>😊</i> Самочувствие</h2>
              
              <div className="slider-group">
                <label>Уровень энергии (1-10):</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.energyLevel}
                    onChange={(e) => handleSliderChange('energyLevel', e.target.value)}
                    className="slider"
                    style={{ '--slider-color': getLevelColor(formData.energyLevel, 'energy') }}
                  />
                  <div className="slider-value">{formData.energyLevel}/10</div>
                </div>
              </div>

              <div className="slider-group">
                <label>Болевые ощущения (0-10):</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={formData.painLevel}
                    onChange={(e) => handleSliderChange('painLevel', e.target.value)}
                    className="slider"
                    style={{ '--slider-color': getLevelColor(formData.painLevel, 'pain') }}
                  />
                  <div className="slider-value">{formData.painLevel}/10</div>
                </div>
              </div>

              <div className="slider-group">
                <label>Качество сна (1-10):</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.sleepQuality}
                    onChange={(e) => handleSliderChange('sleepQuality', e.target.value)}
                    className="slider"
                    style={{ '--slider-color': getLevelColor(formData.sleepQuality, 'sleep') }}
                  />
                  <div className="slider-value">{formData.sleepQuality}/10</div>
                </div>
              </div>
            </div>

            {/* Заметки и кнопки */}
            <div className="health-card">
              <div className="form-group">
                <label>Заметки:</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Как прошел день, самочувствие, тренировка..."
                  rows="4"
                  className="form-input"
                />
              </div>

              <div className="form-buttons">
                <button type="button" onClick={handleSubmit} className="btn-primary">
                  {editingIndex !== null ? 'Сохранить изменения' : '📝 Добавить запись'}
                </button>
                {editingIndex !== null && (
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => {
                      setEditingIndex(null);
                      setFormData({
                        date: new Date().toISOString().split('T')[0],
                        weight: '',
                        bodyFat: '',
                        muscleMass: '',
                        chest: '',
                        waist: '',
                        hips: '',
                        thigh: '',
                        biceps: '',
                        avgHeartRate: '',
                        maxHeartRate: '',
                        calories: '',
                        protein: '',
                        fats: '',
                        carbs: '',
                        water: '',
                        energyLevel: '5',
                        painLevel: '0',
                        sleepQuality: '5',
                        notes: ''
                      });
                    }}
                  >
                    ✖️ Отмена
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="stats-grid">
          {/* Прогресс */}
          {progress && (
            <div className="health-card">
              <h2><i>📈</i> Динамика показателей</h2>
              <div className="progress-cards-grid">
                {progress.weight && (
                  <div className={`progress-card ${
                    progress.weight.diff < 0 ? 'positive' : 
                    progress.weight.diff > 0 ? 'negative' : 'neutral'
                  }`}>
                    <h3>Вес</h3>
                    <div className="value">{progress.weight.value} кг</div>
                    <div className="change">
                      {progress.weight.diff > 0 ? '+' : ''}{progress.weight.value}
                    </div>
                  </div>
                )}
                {progress.waist && (
                  <div className={`progress-card ${
                    progress.waist.diff < 0 ? 'positive' : 
                    progress.waist.diff > 0 ? 'negative' : 'neutral'
                  }`}>
                    <h3>Талия</h3>
                    <div className="value">{progress.waist.value} см</div>
                    <div className="change">
                      {progress.waist.diff > 0 ? '+' : ''}{progress.waist.value}
                    </div>
                  </div>
                )}
                {progress.avgHeartRate && (
                  <div className={`progress-card ${
                    progress.avgHeartRate.diff < 0 ? 'positive' : 
                    progress.avgHeartRate.diff > 0 ? 'negative' : 'neutral'
                  }`}>
                    <h3>Пульс</h3>
                    <div className="value">{progress.avgHeartRate.value} уд/мин</div>
                    <div className="change">
                      {progress.avgHeartRate.diff > 0 ? '+' : ''}{progress.avgHeartRate.value}
                    </div>
                  </div>
                )}
                {progress.energyLevel && (
                  <div className={`progress-card ${
                    progress.energyLevel.diff > 0 ? 'positive' : 
                    progress.energyLevel.diff < 0 ? 'negative' : 'neutral'
                  }`}>
                    <h3>Энергия</h3>
                    <div className="value">{progress.energyLevel.value}/10</div>
                    <div className="change">
                      {progress.energyLevel.diff > 0 ? '+' : ''}{progress.energyLevel.value}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Средние значения */}
          {averages && (
            <div className="health-card">
              <h2><i>📊</i> Средние показатели</h2>
              <div className="averages-grid">
                {averages.weight && (
                  <div className="average-item">
                    <div className="average-label">Вес:</div>
                    <div className="average-value">{averages.weight} кг</div>
                  </div>
                )}
                {averages.waist && (
                  <div className="average-item">
                    <div className="average-label">Талия:</div>
                    <div className="average-value">{averages.waist} см</div>
                  </div>
                )}
                {averages.avgHeartRate && (
                  <div className="average-item">
                    <div className="average-label">Пульс:</div>
                    <div className="average-value">{averages.avgHeartRate} уд/мин</div>
                  </div>
                )}
                {averages.energyLevel && (
                  <div className="average-item">
                    <div className="average-label">Энергия:</div>
                    <div className="average-value">{averages.energyLevel}/10</div>
                  </div>
                )}
                {averages.sleepQuality && (
                  <div className="average-item">
                    <div className="average-label">Сон:</div>
                    <div className="average-value">{averages.sleepQuality}/10</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* График веса */}
          {last7Records.length > 1 && (
            <div className="health-card">
              <h2><i>📉</i> Динамика веса за неделю</h2>
              <div className="chart-container">
                <div className="chart-wrapper">
                  <div className="chart-grid">
                    {last7Records.map((record, index) => {
                      const weight = parseFloat(record.weight);
                      const weights = last7Records.map(r => parseFloat(r.weight));
                      const minWeight = Math.min(...weights);
                      const maxWeight = Math.max(...weights);
                      const range = maxWeight - minWeight;
                      const height = range > 0 ? ((weight - minWeight) / range) * 80 + 20 : 50;
                      
                      return (
                        <div key={index} className="chart-column">
                          <div 
                            className="chart-bar" 
                            style={{ height: `${height}%` }}
                          >
                            <div className="chart-value">{weight} кг</div>
                          </div>
                          <div className="chart-date">
                            {getDayOfWeek(record.date)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="health-card">
          <h2><i>🗓️</i> История записей</h2>
          {fitnessData.length === 0 ? (
            <div className="empty-state">
              <i>📝</i>
              <p>Данных пока нет. Добавьте первую запись!</p>
            </div>
          ) : (
            <div className="records-container">
              <table className="records-table">
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Вес</th>
                    <th>Талия</th>
                    <th>Грудь</th>
                    <th>Пульс</th>
                    <th>Энергия</th>
                    <th>Сон</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {fitnessData.map((record, index) => (
                    <tr key={index}>
                      <td>{formatDate(record.date)}</td>
                      <td>{record.weight ? `${record.weight} кг` : '-'}</td>
                      <td>{record.waist ? `${record.waist} см` : '-'}</td>
                      <td>{record.chest ? `${record.chest} см` : '-'}</td>
                      <td>{record.avgHeartRate ? `${record.avgHeartRate} уд/мин` : '-'}</td>
                      <td>
                        {record.energyLevel && (
                          <div className="level-indicator" style={{
                            backgroundColor: getLevelColor(record.energyLevel, 'energy')
                          }}>
                            {record.energyLevel}/10
                          </div>
                        )}
                      </td>
                      <td>
                        {record.sleepQuality && (
                          <div className="level-indicator" style={{
                            backgroundColor: getLevelColor(record.sleepQuality, 'sleep')
                          }}>
                            {record.sleepQuality}/10
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="table-actions">
                          <button 
                            onClick={() => handleEdit(index)} 
                            className="icon-btn icon-btn-edit"
                            title="Редактировать"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDelete(index)} 
                            className="icon-btn icon-btn-delete"
                            title="Удалить"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Health;