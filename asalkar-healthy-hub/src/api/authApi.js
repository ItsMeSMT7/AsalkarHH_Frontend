import apiClient from './apiClient';

export const signup = async (data) => {
  const response = await apiClient.post('/auth/signup', data);
  return response.data;
};

export const login = async (data) => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
};

export const adminLogin = async (data) => {
  const response = await apiClient.post('/admin/login', data);
  return response.data;
};

export const getProfile = async () => {
  const response = await apiClient.get('/user/profile');
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await apiClient.put('/user/profile', data);
  return response.data;
};