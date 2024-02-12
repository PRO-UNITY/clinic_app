import axios from "axios";
import { BASE_URL } from "../utils/BaseUrl";

export const SignUpUser = async (data: any) => {
  const response = await axios.post(`${BASE_URL}/auth/signup`, data);
  return response.data;
};
export const SignInUser = async (data: any) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, data);
  return response.data;
};
