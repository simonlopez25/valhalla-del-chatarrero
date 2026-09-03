import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

vi.mock('axios', () => ({
  default: {
    put: vi.fn(),
    isCancel: vi.fn(() => false),
    isAxiosError: vi.fn(() => false),
  },
}));

import { updateUser } from '../../../services/updateUserService';

describe('updateUserService - updateUser API calls', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should successfully update a user with valid data', async () => {
    const mockResponse = { id: 1, name: 'Updated User', email: 'test@test.com' };
    axios.put.mockResolvedValueOnce({ data: mockResponse });

    const result = await updateUser(1, { name: 'Updated User' });

    expect(result).toEqual(mockResponse);
    expect(axios.put).toHaveBeenCalledWith(
      expect.stringContaining('/users/1'),
      { name: 'Updated User' },
      expect.objectContaining({
        timeout: 10000,
        headers: { contentType: 'application/json' },
      })
    );
  });

  it('should trim name and email before sending', async () => {
    axios.put.mockResolvedValueOnce({ data: { id: 1 } });

    await updateUser(1, { name: '  John  ', email: '  john@test.com  ' });

    expect(axios.put).toHaveBeenCalledWith(
      expect.any(String),
      { name: 'John', email: 'john@test.com' },
      expect.any(Object)
    );
  });

  it('should accept valid roles (admin, customer)', async () => {
    axios.put.mockResolvedValueOnce({ data: { id: 1, role: 'admin' } });

    const result = await updateUser(1, { role: 'admin' });

    expect(result.role).toBe('admin');
  });

  it('should accept password with 6+ characters', async () => {
    axios.put.mockResolvedValueOnce({ data: { id: 1 } });

    await updateUser(1, { password: 'secure123' });

    expect(axios.put).toHaveBeenCalledWith(
      expect.any(String),
      { password: 'secure123' },
      expect.any(Object)
    );
  });

  it('should pass custom timeout and signal', async () => {
    axios.put.mockResolvedValueOnce({ data: { id: 1 } });
    const controller = new AbortController();

    await updateUser(1, { name: 'Test' }, { timeout: 5000, signal: controller.signal });

    expect(axios.put).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object),
      expect.objectContaining({
        timeout: 5000,
        signal: controller.signal,
      })
    );
  });
});
