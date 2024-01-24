import api from '../../utils/fetchApi';
//

// get categories function
export const getCategories = async () => {
  const response = await api.get('/category/');
  return response.data;
};
