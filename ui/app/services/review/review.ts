import api from '../../utils/fetchApi';

// post review with api function
export const postReview = (data: any) => {
  return api.post('/review/', data);
};
