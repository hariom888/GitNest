import axios from 'axios';

const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${base}/api/v1/auth`;

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use((config) => {
  const state = JSON.parse(localStorage.getItem('auth-storage'));
  if (state && state.state && state.state.token) {
    config.headers.Authorization = `Bearer ${state.state.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Centralized response handling for auth-related errors
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const message = (typeof data === 'string' ? data : data?.message) || error.message;
      // Map server validation shape to a useful message
      if (status === 401) {
        // Unauthorized — token invalid/expired
        return Promise.reject({ code: 401, message: message || 'Unauthorized' });
      }
      if (status === 429) {
        return Promise.reject({ code: 429, message: message || 'Too many requests, please try later' });
      }
      if (status === 400 && data && data.errors) {
        return Promise.reject({ code: 400, message: message || 'Validation failed', errors: data.errors });
      }
      return Promise.reject({ code: status, message });
    }
    return Promise.reject({ code: 0, message: error.message });
  }
);

export const registerUser = async (userData) => {
  const response = await authApi.post('/register', userData);
  return response.data.data;
};

export const loginUser = async (userData) => {
  const response = await authApi.post('/login', userData);
  return response.data.data;
};

export const getMe = async () => {
  const response = await authApi.get('/me');
  return response.data.data;
};

export default authApi;
