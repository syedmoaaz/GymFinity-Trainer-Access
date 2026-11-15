import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("trainerToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const url = String(error?.config?.url || "");
    if ((status === 401 || status === 403) && !url.includes("/trainer-portal/login")) {
      localStorage.removeItem("trainerToken");
      localStorage.removeItem("trainerProfile");
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
