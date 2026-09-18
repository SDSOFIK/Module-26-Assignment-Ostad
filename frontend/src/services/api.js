import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',  
});

api.interceptors.request.use((config) => {
  const authData = localStorage.getItem('auth-storage');
  if (authData) {
    const { state } = JSON.parse(authData);
    if (state?.token) {
      config.headers.Authorization = `Bearer ${state.token}`;
    }
  }
  return config;
});

export default api;