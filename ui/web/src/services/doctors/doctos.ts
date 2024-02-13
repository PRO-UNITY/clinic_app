import api from '../../utils/fetchApi';

//get doctors list with api
export const getDoctors = async (page: number | string) => {
  const response = await api.get(`/doctors/?page=${page}`);
  return response.data;
};

// get doctor by id
export const getDoctorById = async (id: any) => {
  const response = await api.get(`/profile/${id}`);
  return response.data;
};
