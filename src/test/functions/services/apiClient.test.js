import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

vi.mock('axios', () => ({
  default: {
    request: vi.fn(),
  },
}));

import request from '../../../services/apiClient';

describe('apiClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('successful requests', () => {
    it('should make a GET request and return data', async () => {
      const mockData = [{ id: 1, name: 'Test' }];
      axios.request.mockResolvedValueOnce({ data: mockData, status: 200 });

      const result = await request('/test');

      expect(result).toEqual(mockData);
      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://api.escuelajs.co/api/v1/test',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    it('should make a POST request with data', async () => {
      const mockData = { id: 1, title: 'New Product' };
      axios.request.mockResolvedValueOnce({ data: mockData, status: 201 });

      const result = await request('/products', {
        method: 'POST',
        data: { title: 'New Product' },
      });

      expect(result).toEqual(mockData);
      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://api.escuelajs.co/api/v1/products',
          method: 'POST',
          data: { title: 'New Product' },
        })
      );
    });

    it('should make a PUT request with data', async () => {
      const mockData = { id: 1, title: 'Updated' };
      axios.request.mockResolvedValueOnce({ data: mockData, status: 200 });

      const result = await request('/products/1', {
        method: 'PUT',
        data: { title: 'Updated' },
      });

      expect(result).toEqual(mockData);
    });

    it('should return null for 204 No Content responses', async () => {
      axios.request.mockResolvedValueOnce({ data: null, status: 204 });

      const result = await request('/products/1', { method: 'DELETE' });

      expect(result).toBeNull();
    });

    it('should convert body to data when body is an object', async () => {
      axios.request.mockResolvedValueOnce({ data: {}, status: 200 });

      await request('/test', { body: { key: 'value' } });

      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { key: 'value' },
        })
      );
      expect(axios.request).toHaveBeenCalledWith(
        expect.not.objectContaining({
          body: expect.anything(),
        })
      );
    });
  });

  describe('error handling', () => {
    it('should throw error with response data message on API error', async () => {
      axios.request.mockRejectedValueOnce({
        response: { data: { message: 'Not found' }, status: 404 },
      });

      await expect(request('/products/999')).rejects.toThrow('Not found');
    });

    it('should throw error with response error field when message is absent', async () => {
      axios.request.mockRejectedValueOnce({
        response: { data: { error: 'Bad request' }, status: 400 },
      });

      await expect(request('/test')).rejects.toThrow('Bad request');
    });

    it('should throw error with fallback message when no response data', async () => {
      axios.request.mockRejectedValueOnce({
        message: 'Network Error',
      });

      await expect(request('/test')).rejects.toThrow('Network Error');
    });

    it('should throw default connection error when no error details', async () => {
      axios.request.mockRejectedValueOnce({});

      await expect(request('/test')).rejects.toThrow('Error de conexión con la API');
    });
  });

  describe('signal handling', () => {
    it('should pass signal to axios request config', async () => {
      const controller = new AbortController();
      axios.request.mockResolvedValueOnce({ data: [], status: 200 });

      await request('/test', { signal: controller.signal });

      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          signal: controller.signal,
        })
      );
    });
  });
});
