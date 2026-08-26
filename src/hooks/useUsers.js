import { useState, useCallback } from 'react';
import { getUsers, createUser, updateUser, patchUser, deleteUser } from '../services/usersService';

export function useUsers({ limit = 10, offset = 0 } = {}) {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ limit, offset, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async (options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getUsers({ limit, offset, ...options });

      if (Array.isArray(data)) {
        setItems(data);
        setMeta((prev) => ({ ...prev, total: data.length }));
        return data;
      }

      setItems(data?.users ?? data);
      setMeta((prev) => ({ ...prev, total: data?.total ?? prev.total }));
      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [limit, offset]);

  const create = async (payload) => {
    const data = await createUser(payload);
    setItems((prev) => [...prev, data]);
    setMeta((prev) => ({ ...prev, total: prev.total + 1 }));
    return data;
  };

  const update = async (id, payload) => {
    const data = await updateUser(id, payload);
    setItems((prev) => prev.map((item) => (item.id === id ? data : item)));
    return data;
  };

  const patch = async (id, payload) => {
    const data = await patchUser(id, payload);
    setItems((prev) => prev.map((item) => (item.id === id ? data : item)));
    return data;
  };

  const remove = async (id) => {
    await deleteUser(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    setMeta((prev) => ({ ...prev, total: prev.total - 1 }));
  };

  return { items, meta, loading, error, load, create, update, patch, remove };
}
