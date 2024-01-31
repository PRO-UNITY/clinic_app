import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigateToLoginPage } from './navigateToLogin';
import { BASE_URL } from './index';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const authToken = await AsyncStorage.getItem('token');
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
      navigateToLoginPage();
    }
  }
);
export default api;
