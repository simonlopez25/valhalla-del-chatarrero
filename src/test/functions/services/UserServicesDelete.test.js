import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

vi.mock('axios', () => ({
  default: {
    delete: vi.fn(),
  },
}));

import { deleteUser } from '../../../services/UserServicesDelete';

describe('UserServicesDelete', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should delete a user by ID', async () => {
    axios.delete.mockResolvedValueOnce({ status: 200 });

    await deleteUser(1);

    expect(axios.delete).toHaveBeenCalledWith(
      'https://api.escuelajs.co/api/v1/users/1'
    );
  });

  it('should delete a user with string ID', async () => {
    axios.delete.mockResolvedValueOnce({ status: 200 });

    await deleteUser('42');

    expect(axios.delete).toHaveBeenCalledWith(
      'https://api.escuelajs.co/api/v1/users/42'
    );
  });

  it('should propagate API errors', async () => {
    axios.delete.mockRejectedValueOnce(new Error('Network Error'));

    await expect(deleteUser(1)).rejects.toThrow('Network Error');
  });
});
