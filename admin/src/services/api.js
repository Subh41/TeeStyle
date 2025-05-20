import axios from 'axios';
import { mockAPI } from './mockApi';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Use mock API for development
const USE_MOCK_API = true;

// Admin-specific API functions
export const adminAPI = USE_MOCK_API ? mockAPI : {
  // Auth
  login: (credentials) => api.post('/admin/login', credentials),
  
  // Dashboard
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  
  // Products
  getProducts: (params) => api.get('/admin/products', { params }),
  getProduct: (id) => api.get(`/admin/products/${id}`),
  createProduct: (product) => api.post('/admin/products', product),
  updateProduct: (id, product) => api.put(`/admin/products/${id}`, product),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  
  // Orders
  getOrders: (params) => api.get('/admin/orders', { params }),
  getOrder: (id) => api.get(`/admin/orders/${id}`),
  updateOrderStatus: (id, status) => api.put(`/admin/orders/${id}/status`, { status }),
  
  // Users
  getUsers: (params) => api.get('/admin/users', { params }),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  
  // Categories
  getCategories: () => api.get('/admin/categories'),
  createCategory: (category) => api.post('/admin/categories', category),
  updateCategory: (id, category) => api.put(`/admin/categories/${id}`, category),
  deleteCategory: (id) => api.delete(`/admin/categories/${id}`),
};

export default adminAPI;
