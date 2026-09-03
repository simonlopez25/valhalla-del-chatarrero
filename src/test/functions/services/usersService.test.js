import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../services/apiClient', () => ({
  default: vi.fn(),
}));

import request from '../../../services/apiClient';
import { getUsers, fetchAllUsers, createUser } from '../../../services/usersService';

describe('usersService - getUsers', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should fetch users with default limit and offset', async () => {
    const mockUsers = [{ id: 1, name: 'Test User' }];
    request.mockResolvedValueOnce(mockUsers);

    const result = await getUsers();

    expect(result).toEqual(mockUsers);
    expect(request).toHaveBeenCalledWith('/users?limit=10&offset=0');
  });

  it('should fetch users with custom limit and offset', async () => {
    request.mockResolvedValueOnce([]);

    await getUsers({ limit: 20, offset: 5 });

    expect(request).toHaveBeenCalledWith('/users?limit=20&offset=5');
  });
});

describe('usersService - fetchAllUsers', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should fetch all users from the API', async () => {
    const mockUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ];
    request.mockResolvedValueOnce(mockUsers);

    const result = await fetchAllUsers();

    expect(result).toEqual(mockUsers);
    expect(request).toHaveBeenCalledWith('/users');
  });

  it('should return empty array when API returns non-array', async () => {
    request.mockResolvedValueOnce(null);

    const result = await fetchAllUsers();

    expect(result).toEqual([]);
  });

  it('should return empty array when API returns undefined', async () => {
    request.mockResolvedValueOnce(undefined);

    const result = await fetchAllUsers();

    expect(result).toEqual([]);
  });
});

describe('usersService - createUser', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should create a user via POST request', async () => {
    const userData = {
      name: 'New User',
      email: 'user@test.com',
      password: 'password123',
      avatar: 'https://example.com/avatar.jpg',
    };
    request.mockResolvedValueOnce({ id: 1, ...userData });

    const result = await createUser(userData);

    expect(result).toEqual({ id: 1, ...userData });
    expect(request).toHaveBeenCalledWith('/users', {
      method: 'POST',
      data: userData,
    });
  });
});
