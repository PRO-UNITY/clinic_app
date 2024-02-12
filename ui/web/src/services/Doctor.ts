import { api } from "../axios/Api";

export const GetCategories = async () => {
  const response = await api.get("/category/");
  return response.data;
};
export const AddDoctors = async (data: any) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
export const GetDoctors = async (page: number) => {
  const response = await api.get(`/doctors/?page=${page}`);
  return response.data;
};
export const GetDoctorId = async (id: string) => {
  const response = await api.get(`/profile/${id}`);
  return response.data;
};
export const DeleteDoctors = async (id: number) => {
  const response = await api.delete(`/profile/${id}`);
  return response.data;
};
