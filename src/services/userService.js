import axios from "axios";

const usersApiUrl =
  import.meta.env.VITE_USERS_API_URL || "https://api.escuelajs.co/api/v1/users";

export const fetchUsers = async () => {
  const response = await axios.get(usersApiUrl);
  return Array.isArray(response.data) ? response.data : [];
};
export const createUser = async (userData) => {
  try {
    const response = await axios.post(usersApiUrl, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Error de conexión con la API");
  }
};