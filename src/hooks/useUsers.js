import { useCallback } from 'react';
import { getUsers, createUser, updateUser, patchUser, deleteUser } from '../services/usersService';
import { useCrud } from './useCrud';

const userService = {
  list: ({ limit, offset, ...filters }) => getUsers({ limit, offset, ...filters }),
  create: createUser,
  update: (id, payload) => updateUser(id, payload),
  patch: (id, payload) => patchUser(id, payload),
  delete: deleteUser,
};

export function useUsers({ limit = 10, offset = 0 } = {}) {
  const crud = useCrud({
    service: userService,
    limit,
    offset,
  });

  const load = useCallback((options = {}) => crud.load({ ...options, limit, offset }), [
    crud,
    limit,
    offset,
  ]);

  return {
    ...crud,
    load,
  };
}
