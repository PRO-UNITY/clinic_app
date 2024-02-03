import api from '../../utils/fetchApi';

// get chat rooms function
export const getChatRooms = async (page: number) => {
  const response = await api.get(`/chat/rooms/?page=${page}`);
  return response.data;
};

// get chat conversation function by id
export const getChatConversationById = async (
  convo_id: string,
  page: number
) => {
  const response = await api.get(
    `/chat/conversation/${convo_id}/?page=${page}`
  );
  return response.data;
};

// put chat conversation function by id
export const putChatConversationById = async (convo_id: string, data: any) => {
  const response = await api.put(`/chat/conversation/${convo_id}/`, data);
  return response.data;
};

export const getChatAppointment = async (id: number) => {
  const response = await api.get(`/chat/appointment-message/${id}/`);
  return response.data;
};
