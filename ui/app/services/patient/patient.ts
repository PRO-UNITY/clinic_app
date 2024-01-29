import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../utils';
import api from '../../utils/fetchApi';
import axios from 'axios';

// get patients function
export const getPatients = async (data?: string) => {
  const response = await api.get(`/appointment/make_appointments/`);
  return response.data;
};

// get patient by id function
export const getPatientById = async (id: string) => {
  const response = await api.get(`/appointment/get_appointments/${id}/`);
  return response.data;
};

// get patients by date function
export const getPatientsByDate = async (date: string) => {
  const response = await api.get(
    `/appointment/make_appointments/?date=${date}`
  );
  return response.data;
};
