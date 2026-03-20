import apiClient from './apiClient';

export const getAllAddresses = async () => {
  const response = await apiClient.get('/user/addresses');
  return response.data;
};

export const createAddress = async (data) => {
  const response = await apiClient.post('/user/addresses', data);
  return response.data;
};

export const updateAddress = async (id, data) => {
  const response = await apiClient.put(`/user/addresses/${id}`, data);
  return response.data;
};

export const deleteAddress = async (id) => {
  const response = await apiClient.delete(`/user/addresses/${id}`);
  return response.data;
};

export const setDefaultAddress = async (id) => {
  const response = await apiClient.patch(`/user/addresses/${id}/set-default`);
  return response.data;
};