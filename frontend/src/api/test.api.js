import api from "./axios";

export const dbTest = () => {
  return api.get("/db-test");
};
