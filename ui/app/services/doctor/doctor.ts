import { BASE_URL } from '../../utils';
import api from '../../utils/fetchApi';

// get doctors
export const getDoctors = async () => {
  const response = await api.get(`${BASE_URL}/doctors`);
  return response.data;
};

// get doctor by id
export const getDoctorById = async (id: number) => {
  const response = await api.get(`/profile/${id}`);
  return response.data;
};

//make appointment with doctor
export const makeAppointment = async (data: any) => {
  const response = await api.post(`/appointment/make_appointments/`, data);
  return response.data;
};

// get appointment doctors

// get appointment doctors with api call
export const getAppointmentDoctors = async () => {
  const response = await api.get(`/appointment/make_appointments/`);
  return response.data;
};
