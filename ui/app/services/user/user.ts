import api from '../../utils/fetchApi';

// get user function
export const getUserProfile = async () => {
  const response = await api.get('/profile');
  return response.data;
};

// get user by id function
export const getUserById = async (id: string) => {
  const response = await api.get(`/profile/${id}`);
  return response.data;
};

// update user function
export const updateUserProfile = async (id: string, data: any) => {
  const response = await api.put(`/profile/${id}`, data);
  return response.data;
};

//get gender function
export const getGender = async () => {
  const response = await api.get('/gender');
  return response.data;
};
