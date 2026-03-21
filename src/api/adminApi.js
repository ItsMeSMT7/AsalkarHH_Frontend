import apiClient from './apiClient';

// Dashboard
export const getDashboard = async () => {
  const response = await apiClient.get('/admin/dashboard');
  return response.data;
};

// Orders
export const getAdminOrders = async () => {
  const response = await apiClient.get('/admin/orders');
  return response.data;
};

export const getAdminOrderById = async (id) => {
  const response = await apiClient.get(`/admin/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id, data) => {
  const response = await apiClient.put(`/admin/orders/${id}/status`, data);
  return response.data;
};

export const getOrderHistory = async () => {
  const response = await apiClient.get('/admin/orders/history');
  return response.data;
};

// Products
export const getAdminProducts = async () => {
  const response = await apiClient.get('/admin/products');
  return response.data;
};

export const createProduct = async (formData) => {
  const response = await apiClient.post('/admin/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateProduct = async (id, formData) => {
  const response = await apiClient.put(`/admin/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await apiClient.delete(`/admin/products/${id}`);
  return response.data;
};

export const restoreProduct = async (id) => {
  const response = await apiClient.patch(`/admin/products/${id}/restore`);
  return response.data;
};

// Cancel Requests (Inquiries)
export const getPendingCancelRequests = async () => {
  const response = await apiClient.get('/admin/inquiries');
  return response.data;
};

export const getAllCancelRequests = async () => {
  const response = await apiClient.get('/admin/inquiries/all');
  return response.data;
};

export const respondToCancelRequest = async (id, data) => {
  const response = await apiClient.put(`/admin/inquiries/${id}/respond`, data);
  return response.data;
};

// Contact Enquiries
export const getEnquiries = async (status) => {
  const params = status ? { status } : {};
  const response = await apiClient.get('/admin/enquiries', { params });
  return response.data;
};

export const updateEnquiryStatus = async (id, data) => {
  const response = await apiClient.put(`/admin/enquiries/${id}/status`, data);
  return response.data;
};

export const deleteEnquiry = async (id) => {
  const response = await apiClient.delete(`/admin/enquiries/${id}`);
  return response.data;
};

export const getEnquiryCount = async () => {
  const response = await apiClient.get('/admin/enquiries/count');
  return response.data;
};

// Users
export const getAdminUsers = async () => {
  const response = await apiClient.get('/admin/users');
  return response.data;
};

export const getAdminUserById = async (id) => {
  const response = await apiClient.get(`/admin/users/${id}`);
  return response.data;
};