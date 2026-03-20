import apiClient from './apiClient';

export const getAllProducts = async (category) => {
  const params = category ? { category } : {};
  const response = await apiClient.get('/products', { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const adminGetAllProducts = async () => {
  const response = await apiClient.get('/admin/products');
  return response.data;
};

export const adminCreateProduct = async (formData) => {
  const response = await apiClient.post('/admin/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const adminUpdateProduct = async (id, formData) => {
  const response = await apiClient.put(`/admin/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const adminDeleteProduct = async (id) => {
  const response = await apiClient.delete(`/admin/products/${id}`);
  return response.data;
};

export const adminRestoreProduct = async (id) => {
  const response = await apiClient.patch(`/admin/products/${id}/restore`);
  return response.data;
};