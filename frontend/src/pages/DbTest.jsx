import { useEffect, useState } from "react";
import { dbTest } from "../api/test.api";

const DbTest = () => {
  const [status, setStatus] = useState("Проверка...");
  const [error, setError] = useState(null);

  useEffect(() => {
    dbTest()
      .then(res => {
        setStatus(res.data.db);
      })
      .catch(err => {
        setError(err.response?.data?.error || "Ошибка подключения");
      });
  }, []);

  if (error) return <h2>❌ {error}</h2>;

  return (
    <div>
      <h2>Статус БД</h2>
      <p>PostgreSQL: <b>{status}</b></p>
    </div>
  );
};

export default DbTest;
