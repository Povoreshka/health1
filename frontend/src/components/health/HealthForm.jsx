import { useState } from "react";
import api from "../../api/axios";

const HealthForm = () => {
  const [data, setData] = useState({
    heart_rate: "",
    pressure: "",
    bmi: ""
  });

  const submit = e => {
    e.preventDefault();
    api.post("/health", data);
  };

  return (
    <form onSubmit={submit}>
      <h3>Показатели здоровья</h3>
      <input placeholder="Пульс" onChange={e => setData({...data, heart_rate: e.target.value})} />
      <input placeholder="Давление" onChange={e => setData({...data, pressure: e.target.value})} />
      <input placeholder="BMI" onChange={e => setData({...data, bmi: e.target.value})} />
      <button>Добавить</button>
    </form>
  );
};

export default HealthForm;
