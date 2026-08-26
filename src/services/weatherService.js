import axios from "axios";

const getWeatherDescription = (code) => {
  const weatherCodes = {
    0: "Despejado",
    1: "Despejado",
    2: "Nublado",
    3: "Cubierto",
    45: "Niebla",
    48: "Niebla",
    51: "Llovizna",
    53: "Llovizna",
    55: "Llovizna",
    61: "Lluvia",
    63: "Lluvia",
    65: "Lluvia",
    71: "Nieve",
    73: "Nieve",
    75: "Nieve",
    80: "Chubascos",
    81: "Chubascos",
    82: "Chubascos",
    95: "Tormenta",
  };

  return weatherCodes[code] || "Despejado";
};

export const fetchCurrentWeather = async (latitude, longitude) => {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
  );

  const currentWeather = response.data.current_weather;

  return {
    temperature: currentWeather.temperature,
    windspeed: currentWeather.windspeed,
    weathercode: currentWeather.weathercode,
    condition: getWeatherDescription(currentWeather.weathercode),
  };
};