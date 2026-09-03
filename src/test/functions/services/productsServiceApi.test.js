import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../services/apiClient', () => ({
  default: vi.fn(),
}));

vi.mock('axios', () => ({
  default: {
    delete: vi.fn(),
  },
}));

import request from '../../../services/apiClient';
import axios from 'axios';
import {
  getCategories,
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../../../services/productsService';

describe('productsService - getCategories', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should fetch categories from the API', async () => {
    const mockCategories = [{ id: 1, name: 'Electrónica' }];
    request.mockResolvedValueOnce(mockCategories);

    const result = await getCategories();

    expect(result).toEqual(mockCategories);
    expect(request).toHaveBeenCalledWith('/categories');
  });
});

describe('productsService - getProducts', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should fetch products with default limit and offset', async () => {
    const mockProducts = [{ id: 1, title: 'Product' }];
    request.mockResolvedValueOnce(mockProducts);

    const result = await getProducts();

    expect(result).toEqual(mockProducts);
    expect(request).toHaveBeenCalledWith('/products?limit=50&offset=0', expect.any(Object));
  });

  it('should fetch products with custom limit and offset', async () => {
    request.mockResolvedValueOnce([]);

    await getProducts({ limit: 20, offset: 10 });

    expect(request).toHaveBeenCalledWith('/products?limit=20&offset=10', expect.any(Object));
  });

  it('should pass additional filter parameters', async () => {
    request.mockResolvedValueOnce([]);

    await getProducts({ limit: 10, offset: 0, title: 'Test', price_min: 100 });

    expect(request).toHaveBeenCalledWith(expect.stringContaining('title=Test'), expect.any(Object));
    expect(request).toHaveBeenCalledWith(expect.stringContaining('price_min=100'), expect.any(Object));
  });

  it('should skip undefined, null, and empty filter values', async () => {
    request.mockResolvedValueOnce([]);

    await getProducts({ limit: 10, offset: 0, title: '', price: null, category: undefined });

    expect(request).toHaveBeenCalledWith('/products?limit=10&offset=0', expect.any(Object));
  });

  it('should pass signal to the request', async () => {
    const controller = new AbortController();
    request.mockResolvedValueOnce([]);

    await getProducts({ signal: controller.signal });

    expect(request).toHaveBeenCalledWith(expect.any(String), { signal: controller.signal });
  });
});

describe('productsService - getProduct', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should fetch a single product by ID', async () => {
    const mockProduct = { id: 1, title: 'Test Product' };
    request.mockResolvedValueOnce(mockProduct);

    const result = await getProduct(1);

    expect(result).toEqual(mockProduct);
    expect(request).toHaveBeenCalledWith('/products/1');
  });
});

describe('productsService - deleteProduct', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should delete a product by ID using axios.delete', async () => {
    axios.delete.mockResolvedValueOnce({ status: 200 });

    await deleteProduct(1);

    expect(axios.delete).toHaveBeenCalledWith(
      'https://api.escuelajs.co/api/v1/products/1'
    );
  });
});

describe('productsService - createProduct', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should create a product via POST request', async () => {
    const productData = { title: 'New Product', price: 100 };
    request.mockResolvedValueOnce({ id: 1, ...productData });

    const result = await createProduct(productData);

    expect(result).toEqual({ id: 1, ...productData });
    expect(request).toHaveBeenCalledWith('/products', {
      method: 'POST',
      data: productData,
    });
  });
});

describe('productsService - updateProduct', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should update a product via PUT request', async () => {
    const productData = { title: 'Updated Product' };
    request.mockResolvedValueOnce({ id: 1, ...productData });

    const result = await updateProduct(1, productData);

    expect(result).toEqual({ id: 1, ...productData });
    expect(request).toHaveBeenCalledWith('/products/1', {
      method: 'PUT',
      data: productData,
    });
  });
});
