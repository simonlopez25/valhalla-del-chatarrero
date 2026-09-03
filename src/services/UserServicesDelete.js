import axios from 'axios';

const apiUrl = 'https://api.escuelajs.co/api/v1/users';

export const deleteUser = async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
};