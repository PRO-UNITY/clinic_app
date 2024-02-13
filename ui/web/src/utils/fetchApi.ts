import axios from 'axios';
import { BASE_URL } from './index';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      //   localStorage.clear();
      //   window.location.href = '/login';
      console.log('nooooooot token ');
    }
  }
);
export default api;
