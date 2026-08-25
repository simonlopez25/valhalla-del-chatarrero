import axios from "axios";

export const fetchCurrentWeather = async (latitude, longitude) => {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
  );
  return response.data.current_weather;
};
