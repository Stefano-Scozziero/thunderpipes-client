import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://thunderpipes-server.onrender.com";

const api = axios.create({
    baseURL: `${API_URL}/api`,
    withCredentials: true,
});

// Interceptor for responses to handle common errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default api;
