import axios from 'axios';

const baseUrl = 'https://api.escuelajs.co/api/v1';

const request = async (endpoint, options = {}) => {
  const { signal, ...rest } = options;
  const url = `${baseUrl}${endpoint}`;

  const config = {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
    },
    url,
    signal,
  };

  if (config.body && typeof config.body === 'object') {
    config.data = config.body;
    delete config.body;
  }

  try {
    const response = await axios.request(config);

    if (response.status === 204) {
      return null;
    }

    return response.data;
  } catch (error) {
    const responseBody = error?.response?.data;
    const message =
      responseBody?.message ||
      responseBody?.error ||
      error.message ||
      'Error de conexión con la API';

    throw new Error(message);
  }
};

export default request;
