import axios from "axios";

const api = axios.create({
  baseURL: "https://l3p47wf3-8000.asse.devtunnels.ms/", 
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
