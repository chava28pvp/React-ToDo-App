import axios from 'axios';
import type { User, LoginData } from '../types/authTypes';

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData: User) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

export const loginUser = async (loginData: LoginData) => {
  const response = await axios.post(`${API_URL}/users/login`, loginData);
  return response.data;
};