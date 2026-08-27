import { useState, useCallback } from 'react';

export function useCrud({ service, limit = 10, offset = 0, isFakeItem } = {}) {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ limit, offset, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async (options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await service.list({ limit, offset, ...options });

      const rawItems = Array.isArray(data) ? data : data?.products ?? data;
      const finalItems = Array.isArray(rawItems)
        ? rawItems.filter((item) => !isFakeItem?.(item))
        : [];

      if (Array.isArray(data)) {
        setItems(finalItems);
        setMeta((prev) => ({ ...prev, total: finalItems.length }));
        return finalItems;
      }

      setItems(finalItems);
      setMeta((prev) => ({ ...prev, total: data?.total ?? finalItems.length }));
      return finalItems;
    } catch (err) {
      setError(err);
      setItems([]);
      setMeta((prev) => ({ ...prev, total: 0 }));
      return [];
    } finally {
      setLoading(false);
    }
  }, [limit, offset, service, isFakeItem]);

  const create = async (payload) => {
    const data = await service.create(payload);
    setItems((prev) => [...prev, data]);
    setMeta((prev) => ({ ...prev, total: prev.total + 1 }));
    return data;
  };

  const update = async (id, payload) => {
    const data = await service.update(id, payload);
    setItems((prev) => prev.map((item) => (item.id === id ? data : item)));
    return data;
  };

  const patch = async (id, payload) => {
    const data = await service.patch(id, payload);
    setItems((prev) => prev.map((item) => (item.id === id ? data : item)));
    return data;
  };

  const remove = async (id) => {
    await service.delete(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    setMeta((prev) => ({ ...prev, total: prev.total - 1 }));
  };

  return { items, meta, loading, error, load, create, update, patch, remove };
}
