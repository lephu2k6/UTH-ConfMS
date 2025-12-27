import axios from "axios";

const api = axios.create({
  baseURL: "https://l3p47wf3-8000.asse.devtunnels.ms/",
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Phiên đăng nhập hết hạn hoặc chưa đăng nhập.");
    }
    return Promise.reject(error);
  }
);

export default api;