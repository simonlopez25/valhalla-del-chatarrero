import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

vi.mock('../../services/products.js', () => ({
  createProduct: vi.fn(),
}));

import { createProduct } from '../../services/products.js';
import useCreateProduct from '../../components/organisms/product-modal/hooks/useCreateProduct.js';

describe('useCreateProduct', () => {
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockOnSuccess.mockClear();
  });

  it('should start with initial state', () => {
    const { result } = renderHook(() => useCreateProduct(mockOnSuccess));

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submitError).toBeNull();
    expect(result.current.success).toBe(false);
  });

  it('should set isSubmitting to true while submitting', async () => {
    let resolve;
    createProduct.mockImplementation(() => new Promise((r) => { resolve = r; }));

    const { result } = renderHook(() => useCreateProduct(mockOnSuccess));

    act(() => {
      result.current.submitProduct({ title: 'Test' });
    });

    expect(result.current.isSubmitting).toBe(true);

    await act(async () => {
      resolve({ id: 1, title: 'Test' });
    });
  });

  it('should set success to true and call onSuccess on successful creation', async () => {
    createProduct.mockResolvedValueOnce({ id: 1, title: 'Test Product' });

    const { result } = renderHook(() => useCreateProduct(mockOnSuccess));

    await act(async () => {
      const success = await result.current.submitProduct({ title: 'Test Product' });
      expect(success).toBe(true);
    });

    expect(result.current.success).toBe(true);
    expect(result.current.isSubmitting).toBe(false);
    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('should set submitError on failed creation', async () => {
    const mockError = new Error('API Error');
    createProduct.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useCreateProduct(mockOnSuccess));

    await act(async () => {
      const success = await result.current.submitProduct({ title: 'Test' });
      expect(success).toBe(false);
    });

    expect(result.current.submitError).toBe(mockError);
    expect(result.current.success).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('should reset state when resetState is called', async () => {
    createProduct.mockResolvedValueOnce({ id: 1 });

    const { result } = renderHook(() => useCreateProduct(mockOnSuccess));

    await act(async () => {
      await result.current.submitProduct({ title: 'Test' });
    });

    expect(result.current.success).toBe(true);

    act(() => {
      result.current.resetState();
    });

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submitError).toBeNull();
    expect(result.current.success).toBe(false);
  });

  it('should work without onSuccess callback', async () => {
    createProduct.mockResolvedValueOnce({ id: 1 });

    const { result } = renderHook(() => useCreateProduct());

    await act(async () => {
      const success = await result.current.submitProduct({ title: 'Test' });
      expect(success).toBe(true);
    });

    expect(result.current.success).toBe(true);
  });

  it('should clear previous error on new submission', async () => {
    createProduct.mockRejectedValueOnce(new Error('First error'));
    const { result } = renderHook(() => useCreateProduct());

    await act(async () => {
      await result.current.submitProduct({ title: 'Test' });
    });

    expect(result.current.submitError).toBeTruthy();

    createProduct.mockResolvedValueOnce({ id: 1 });

    await act(async () => {
      await result.current.submitProduct({ title: 'Test' });
    });

    expect(result.current.submitError).toBeNull();
    expect(result.current.success).toBe(true);
  });
});
