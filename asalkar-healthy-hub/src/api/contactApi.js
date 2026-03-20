import apiClient from './apiClient';

export const submitContact = async (data) => {
  const response = await apiClient.post('/contact', data);
  return response.data;
};