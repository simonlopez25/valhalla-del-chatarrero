import axios from "axios";

const usersApiUrl =
  import.meta.env.VITE_USERS_API_URL || "https://api.escuelajs.co/api/v1/users";

export const fetchUsers = async () => {
  const response = await axios.get(usersApiUrl);
  return Array.isArray(response.data) ? response.data : [];
};
