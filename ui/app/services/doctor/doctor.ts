import { BASE_URL } from '../../utils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// get doctors
export const getDoctors = async () => {
  const response = await axios.get(`${BASE_URL}/doctors`);
  return response.data;
};

// make appointment with doctor
export const makeAppointment = async (data: any) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.post(
    `${BASE_URL}/appointment/make_appointments/`,
    data,
    { headers }
  );
  return response.data;
};

// get appointment doctors
export const getAppointmentDoctors = async () => {
  const token = await AsyncStorage.getItem('token');
  console.log(token);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(
    `${BASE_URL}/appointment/make_appointments/`,
    { headers }
  );
  return response.data;
};
