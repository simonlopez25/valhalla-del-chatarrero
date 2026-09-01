import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1/users';


export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};