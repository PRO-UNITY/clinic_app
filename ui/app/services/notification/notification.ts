import api from '../../utils/fetchApi';

// export const getNotifications = async (page: number) => {
//   const response = await api.get(`/notification/?page=${page}`);
//   return response.data;
// };

export const getNotifications = async (page: number) => {
  try {
    const response = await api.get(`/notification/?page=${page}`);
    console.log('API Response:', response); // Log the response to inspect its structure.
    return response.data;
  } catch (error) {
    console.error('Error in getNotifications:', error);
    throw error;
  }
};

export const getUnreadNotifications = async () => {
  const response = await api.get(`/notification/unread/`);
  return response.data;
};

export const markAsRead = async (id: number) => {
  const response = await api.get(`/notification/${id}/`);
  return response.data;
};
