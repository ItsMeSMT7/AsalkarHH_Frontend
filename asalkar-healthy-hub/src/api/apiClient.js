import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vitahub_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('vitahub_token');
        localStorage.removeItem('vitahub_user');
        if (
          window.location.pathname !== '/login' &&
          window.location.pathname !== '/signup'
        ) {
          window.location.href = `/login?returnUrl=${encodeURIComponent(
            window.location.pathname
          )}`;
        }
      }
      const message =
        error.response.data?.message ||
        error.response.data?.error ||
        'Something went wrong. Please try again.';
      return Promise.reject({ ...error, message });
    } else if (error.request) {
      return Promise.reject({
        ...error,
        message:
          'Unable to connect to server. Please check your internet connection.',
      });
    }
    return Promise.reject(error);
  }
);

export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '/placeholder-product.jpg';
  if (imageUrl.startsWith('http')) return imageUrl;
  return `${API_BASE_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
};

export default apiClient;