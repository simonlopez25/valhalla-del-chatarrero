import api from './api.js';

export async function createProduct(data) {
  const response = await api.post('/products', data);
  return response.data;
}

export async function fetchCategories() {
  const response = await api.get('/categories');
  return response.data;
}
