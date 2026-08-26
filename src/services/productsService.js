import request from './api';

export const getCategories = () => request('/categories');

export const getProducts = ({ limit = 10, offset = 0, ...filters } = {}) => {
  const params = new URLSearchParams();

  params.set('limit', String(limit));
  params.set('offset', String(offset));

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, value);
    }
  });

  return request(`/products?${params.toString()}`);
};

export const getProduct = (id) => request(`/products/${id}`);

export const createProduct = (payload) => request('/products', { method: 'POST', body: payload });

export const updateProduct = (id, payload) => request(`/products/${id}`, { method: 'PUT', body: payload });

export const patchProduct = (id, payload) => request(`/products/${id}`, { method: 'PATCH', body: payload });

export const deleteProduct = (id) => request(`/products/${id}`, { method: 'DELETE' });
