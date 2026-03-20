import apiClient from './apiClient';

export const createPaymentOrder = async (orderId) => {
  const response = await apiClient.post(`/payment/create-order/${orderId}`);
  return response.data;
};

export const verifyPayment = async (data) => {
  const response = await apiClient.post('/payment/verify', data);
  return response.data;
};