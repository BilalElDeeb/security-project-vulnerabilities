import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add token to request headers if available
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Ensure token is stored after login
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;
