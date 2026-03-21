import apiClient from './apiClient';

export const placeOrder = async (data) => {
  const response = await apiClient.post('/orders', data);
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await apiClient.get(`/orders/${id}`);
  return response.data;
};

export const getWhatsAppMessage = async (id) => {
  const response = await apiClient.get(`/orders/${id}/whatsapp`);
  return response.data;
};