import apiClient from './apiClient';

export const getMyOrders = async () => {
  const response = await apiClient.get('/user/orders');
  return response.data;
};

export const getMyOrderById = async (id) => {
  const response = await apiClient.get(`/user/orders/${id}`);
  return response.data;
};

export const cancelOrder = async (id, data) => {
  const response = await apiClient.post(`/user/orders/${id}/cancel`, data);
  return response.data;
};