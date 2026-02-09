import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nutrition.css';

const Nutrition = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('weightGain');

    const nutritionData = {
        weightGain: {
            title: "Питание для набора мышечной массы",
            description: "Сбалансированный рацион для увеличения мышечной массы и силы",
            dailyCalories: "2800-3500 ккал",
            meals: [
                { time: "08:00", name: "Завтрак", items: ["Овсянка с бананом", "Яичница из 3 яиц", "Цельнозерновой хлеб", "Стакан молока"] },
                { time: "11:00", name: "Перекус", items: ["Греческий йогурт", "Горсть орехов", "Протеиновый коктейль"] },
                { time: "14:00", name: "Обед", items: ["Куриная грудка (200г)", "Гречка (150г)", "Овощной салат", "Авокадо"] },
                { time: "17:00", name: "Перекус", items: ["Творог (200г)", "Мед (1 ст.л.)", "Фрукты"] },
                { time: "20:00", name: "Ужин", items: ["Лосось (200г)", "Бурый рис (150г)", "Спаржевая фасоль", "Оливковое масло"] }
            ],
            tips: [
                "Ешьте каждые 3-4 часа",
                "Увеличьте потребление сложных углеводов",
                "Не забывайте про полезные жиры",
                "Пейте достаточно воды (2-3 литра в день)"
            ]
        },
        protein: {
            title: "Белковое питание",
            description: "Рацион с акцентом на белковые продукты для роста мышц",
            dailyCalories: "2500-3000 ккал",
            proteinSources: [
                { name: "Куриная грудка", protein: "25г на 100г", icon: "🍗" },
                { name: "Говядина", protein: "26г на 100г", icon: "🥩" },
                { name: "Лосось", protein: "20г на 100г", icon: "🐟" },
                { name: "Яйца", protein: "6г на яйцо", icon: "🥚" },
                { name: "Творог", protein: "18г на 100г", icon: "🧀" },
                { name: "Греческий йогурт", protein: "10г на 100г", icon: "🥛" },
                { name: "Тофу", protein: "15г на 100г", icon: "🥢" },
                { name: "Чечевица", protein: "9г на 100г", icon: "🌱" }
            ],
            recipes: [
                { name: "Протеиновый омлет", ingredients: ["3 яйца", "100г творога", "Зелень", "Специи"], protein: "35г" },
                { name: "Курица с киноа", ingredients: ["200г курицы", "100г киноа", "Овощи", "Лимонный сок"], protein: "55г" },
                { name: "Творожная запеканка", ingredients: ["250г творога", "2 яйца", "Овсяные хлопья", "Ягоды"], protein: "40г" }
            ]
        },
        healthy: {
            title: "Здоровое питание",
            description: "Сбалансированный рацион для поддержания здоровья и энергии",
            dailyCalories: "2000-2500 ккал",
            principles: [
                { title: "Баланс", description: "Правильное соотношение белков, жиров и углеводов", icon: "⚖️" },
                { title: "Разнообразие", description: "Разные овощи, фрукты и источники белка", icon: "🌈" },
                { title: "Регулярность", description: "5-6 приемов пищи в день небольшими порциями", icon: "⏰" },
                { title: "Натуральность", description: "Минимум обработанных продуктов", icon: "🌿" }
            ],
            superfoods: [
                { name: "Авокадо", benefit: "Полезные жиры, клетчатка", icon: "🥑" },
                { name: "Ягоды", benefit: "Антиоксиданты, витамины", icon: "🫐" },
                { name: "Орехи", benefit: "Омега-3, белок", icon: "🌰" },
                { name: "Брокколи", benefit: "Клетчатка, витамин C", icon: "🥦" },
                { name: "Киноа", benefit: "Полноценный белок", icon: "🌾" },
                { name: "Имбирь", benefit: "Противовоспалительное", icon: "🫚" }
            ]
        },
        weightLoss: {
            title: "Питание для похудения",
            description: "Дефицит калорий без потери мышечной массы",
            dailyCalories: "1500-1800 ккал",
            rules: [
                "Создайте дефицит 300-500 ккал в день",
                "Увеличьте потребление белка",
                "Сократите простые углеводы",
                "Добавьте больше овощей",
                "Пейте воду перед едой",
                "Избегайте сладких напитков"
            ],
            lowCalorieFoods: [
                { name: "Огурцы", calories: "15 ккал/100г", icon: "🥒" },
                { name: "Сельдерей", calories: "16 ккал/100г", icon: "🥬" },
                { name: "Грейпфрут", calories: "42 ккал/100г", icon: "🍊" },
                { name: "Куриная грудка", calories: "165 ккал/100г", icon: "🍗" },
                { name: "Творог 0%", calories: "71 ккал/100г", icon: "🧀" },
                { name: "Шпинат", calories: "23 ккал/100г", icon: "🌿" }
            ]
        }
    };

    const renderContent = () => {
        const data = nutritionData[activeTab];
        
        switch(activeTab) {
            case 'weightGain':
                return (
                    <div className="nutrition-content">
                        <div className="content-header">
                            <h2>{data.title}</h2>
                            <p className="description">{data.description}</p>
                            <div className="calories-badge">
                                <span>💪</span>
                                <div>
                                    <div className="calories-title">Рекомендуемая норма</div>
                                    <div className="calories-value">{data.dailyCalories}</div>
                                </div>
                            </div>
                        </div>

                        <div className="meal-plan">
                            <h3>Пример плана питания</h3>
                            <div className="meals-timeline">
                                {data.meals.map((meal, index) => (
                                    <div key={index} className="meal-card">
                                        <div className="meal-time">{meal.time}</div>
                                        <h4>{meal.name}</h4>
                                        <ul>
                                            {meal.items.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="tips-section">
                            <h3>Советы</h3>
                            <div className="tips-grid">
                                {data.tips.map((tip, index) => (
                                    <div key={index} className="tip-card">
                                        <div className="tip-number">{index + 1}</div>
                                        <p>{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'protein':
                return (
                    <div className="nutrition-content">
                        <div className="content-header">
                            <h2>{data.title}</h2>
                            <p className="description">{data.description}</p>
                            <div className="protein-target">
                                <div className="target-info">
                                    <div className="target-icon">🎯</div>
                                    <div>
                                        <div className="target-title">Цель по белку</div>
                                        <div className="target-value">1.6-2.2 г на кг веса</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="protein-sources">
                            <h3>Источники белка</h3>
                            <div className="sources-grid">
                                {data.proteinSources.map((source, index) => (
                                    <div key={index} className="source-card">
                                        <div className="source-icon">{source.icon}</div>
                                        <div className="source-info">
                                            <h4>{source.name}</h4>
                                            <p>{source.protein} белка</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="recipes-section">
                            <h3>Белковые рецепты</h3>
                            <div className="recipes-grid">
                                {data.recipes.map((recipe, index) => (
                                    <div key={index} className="recipe-card">
                                        <div className="recipe-header">
                                            <h4>{recipe.name}</h4>
                                            <div className="recipe-protein">{recipe.protein} белка</div>
                                        </div>
                                        <ul className="recipe-ingredients">
                                            {recipe.ingredients.map((ingredient, idx) => (
                                                <li key={idx}>{ingredient}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'healthy':
                return (
                    <div className="nutrition-content">
                        <div className="content-header">
                            <h2>{data.title}</h2>
                            <p className="description">{data.description}</p>
                            <div className="macros-info">
                                <div className="macro-item">
                                    <div className="macro-value">30%</div>
                                    <div className="macro-label">Белки</div>
                                </div>
                                <div className="macro-item">
                                    <div className="macro-value">40%</div>
                                    <div className="macro-label">Углеводы</div>
                                </div>
                                <div className="macro-item">
                                    <div className="macro-value">30%</div>
                                    <div className="macro-label">Жиры</div>
                                </div>
                            </div>
                        </div>

                        <div className="principles-section">
                            <h3>Принципы здорового питания</h3>
                            <div className="principles-grid">
                                {data.principles.map((principle, index) => (
                                    <div key={index} className="principle-card">
                                        <div className="principle-icon">{principle.icon}</div>
                                        <h4>{principle.title}</h4>
                                        <p>{principle.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="superfoods-section">
                            <h3>Суперфуды</h3>
                            <div className="superfoods-grid">
                                {data.superfoods.map((food, index) => (
                                    <div key={index} className="superfood-card">
                                        <div className="superfood-icon">{food.icon}</div>
                                        <div className="superfood-info">
                                            <h4>{food.name}</h4>
                                            <p>{food.benefit}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'weightLoss':
                return (
                    <div className="nutrition-content">
                        <div className="content-header">
                            <h2>{data.title}</h2>
                            <p className="description">{data.description}</p>
                            <div className="calories-badge">
                                <span>⚡</span>
                                <div>
                                    <div className="calories-title">Дефицит калорий</div>
                                    <div className="calories-value">{data.dailyCalories}</div>
                                </div>
                            </div>
                        </div>

                        <div className="rules-section">
                            <h3>Основные правила</h3>
                            <div className="rules-list">
                                {data.rules.map((rule, index) => (
                                    <div key={index} className="rule-item">
                                        <div className="rule-check">✓</div>
                                        <p>{rule}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="low-calorie-foods">
                            <h3>Низкокалорийные продукты</h3>
                            <div className="foods-grid">
                                {data.lowCalorieFoods.map((food, index) => (
                                    <div key={index} className="food-card">
                                        <div className="food-icon">{food.icon}</div>
                                        <div className="food-info">
                                            <h4>{food.name}</h4>
                                            <p>{food.calories}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="nutrition-page">
            <div className="nutrition-header">
                <h1>Правильное питание</h1>
                <button className="back-button" onClick={() => navigate('/home')}>
                    ← 
                </button>
            </div>

            <div className="nutrition-tabs">
                <button 
                    className={`tab-button ${activeTab === 'weightGain' ? 'active' : ''}`}
                    onClick={() => setActiveTab('weightGain')}
                >
                    <span className="tab-icon">💪</span>
                    <span className="tab-text">Набор массы</span>
                </button>
                <button 
                    className={`tab-button ${activeTab === 'protein' ? 'active' : ''}`}
                    onClick={() => setActiveTab('protein')}
                >
                    <span className="tab-icon">🥩</span>
                    <span className="tab-text">Белки</span>
                </button>
                <button 
                    className={`tab-button ${activeTab === 'healthy' ? 'active' : ''}`}
                    onClick={() => setActiveTab('healthy')}
                >
                    <span className="tab-icon">🥗</span>
                    <span className="tab-text">Здоровое</span>
                </button>
                <button 
                    className={`tab-button ${activeTab === 'weightLoss' ? 'active' : ''}`}
                    onClick={() => setActiveTab('weightLoss')}
                >
                    <span className="tab-icon">⚖️</span>
                    <span className="tab-text">Похудение</span>
                </button>
            </div>

            <div className="nutrition-main">
                {renderContent()}
            </div>

            <div className="nutrition-tips">
                <div className="tip-card global-tip">
                    <div className="tip-icon">💡</div>
                    <div>
                        <h4>Полезный совет</h4>
                        <p>Пейте достаточное количество воды (30-35 мл на 1 кг веса) для оптимального метаболизма</p>
                    </div>
                </div>
                <div className="tip-card global-tip">
                    <div className="tip-icon">⏰</div>
                    <div>
                        <h4>Регулярность</h4>
                        <p>Старайтесь есть в одно и то же время каждый день для стабильного обмена веществ</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nutrition;