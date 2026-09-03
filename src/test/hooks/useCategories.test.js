import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

vi.mock('../../services/products.js', () => ({
  fetchCategories: vi.fn(),
}));

import { fetchCategories } from '../../services/products.js';
import useCategories from '../../components/organisms/product-modal/hooks/useCategories.js';

describe('useCategories', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should start with empty categories and loading true while fetching', () => {
    fetchCategories.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useCategories());

    expect(result.current.categories).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should set loading to true while fetching', async () => {
    let resolve;
    fetchCategories.mockImplementation(() => new Promise((r) => { resolve = r; }));
    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(fetchCategories).toHaveBeenCalled();
    });

    resolve([{ id: 1, name: 'Test' }]);
  });

  it('should populate categories on successful fetch', async () => {
    const mockCategories = [
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Clothing' },
    ];
    fetchCategories.mockResolvedValueOnce(mockCategories);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.categories).toEqual(mockCategories);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle non-array response gracefully', async () => {
    fetchCategories.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.categories).toEqual([]);
    });
  });

  it('should set error on fetch failure', async () => {
    const mockError = new Error('Network Error');
    fetchCategories.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.categories).toEqual([]);
  });

  it('should ignore stale responses after unmount', async () => {
    let resolve;
    fetchCategories.mockImplementation(() => new Promise((r) => { resolve = r; }));

    const { result, unmount } = renderHook(() => useCategories());

    unmount();
    resolve([{ id: 1, name: 'Stale' }]);

    expect(result.current.categories).toEqual([]);
  });
});
