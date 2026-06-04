import axios from 'axios';

export const baseApiUrl = "http://127.0.0.1:8000/api/";
export const baseUrl = "http://127.0.0.1:8000/";

const api = axios.create({
    baseURL: baseApiUrl,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

// টোকেন হ্যান্ডেল করার জন্য Interceptor যোগ করুন
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;