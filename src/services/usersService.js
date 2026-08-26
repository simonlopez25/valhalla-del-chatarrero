import request from './api';

export const getUsers = ({ limit = 10, offset = 0 } = {}) => {
  const params = new URLSearchParams();

  params.set('limit', String(limit));
  params.set('offset', String(offset));

  return request(`/users?${params.toString()}`);
};

export const getUser = (id) => request(`/users/${id}`);

export const createUser = (payload) => request('/users', { method: 'POST', body: payload });

export const updateUser = (id, payload) => request(`/users/${id}`, { method: 'PUT', body: payload });

export const patchUser = (id, payload) => request(`/users/${id}`, { method: 'PATCH', body: payload });

export const deleteUser = (id) => request(`/users/${id}`, { method: 'DELETE' });
