import { BASE_URL } from '../../utils/index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// register user with phone and password
export const registerUser = async (data: any) => {
  const response = await axios.post(`${BASE_URL}/auth/send-code`, data);
  return response.data;
};

// login user with phone and password
export const loginUser = async (data: any) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, data);
  return response.data;
};

// verify user with phone and code
export const verifyUser = async (data: any) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('Token undefined');
      return null;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(`${BASE_URL}/auth/verify`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('Error user:', error);
    throw error;
  }
};
