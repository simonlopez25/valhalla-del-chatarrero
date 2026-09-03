import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../services/api.js', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

import api from '../../../services/api.js';
import { createProduct, fetchCategories } from '../../../services/products';

describe('products service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createProduct', () => {
    it('should create a product via POST /products', async () => {
      const productData = {
        title: 'New Product',
        price: 100,
        description: 'A test product',
        categoryId: 1,
        images: ['https://example.com/img.jpg'],
      };
      const mockResponse = { data: { id: 1, ...productData } };
      api.post.mockResolvedValueOnce(mockResponse);

      const result = await createProduct(productData);

      expect(result).toEqual({ id: 1, ...productData });
      expect(api.post).toHaveBeenCalledWith('/products', productData);
    });

    it('should propagate API errors', async () => {
      api.post.mockRejectedValueOnce(new Error('API Error'));

      await expect(createProduct({ title: 'Test' })).rejects.toThrow('API Error');
    });
  });

  describe('fetchCategories', () => {
    it('should fetch categories via GET /categories', async () => {
      const mockCategories = [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Clothing' },
      ];
      api.get.mockResolvedValueOnce({ data: mockCategories });

      const result = await fetchCategories();

      expect(result).toEqual(mockCategories);
      expect(api.get).toHaveBeenCalledWith('/categories');
    });

    it('should propagate API errors', async () => {
      api.get.mockRejectedValueOnce(new Error('Network Error'));

      await expect(fetchCategories()).rejects.toThrow('Network Error');
    });
  });
});
