import request from './apiClient';

export const getUsers = ({ limit = 10, offset = 0 } = {}) => {
  const params = new URLSearchParams();

  params.set('limit', String(limit));
  params.set('offset', String(offset));

  return request(`/users?${params.toString()}`);
};

export const fetchAllUsers = async () => {
  const users = await request('/users');
  return Array.isArray(users) ? users : [];
};
