import { useEffect, useState } from "react";
import { fetchCurrentWeather } from "../../services/weatherService";
import "./WeatherWidget.css";

export function WeatherWidget() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      const timer = setTimeout(() => setIsLoading(false), 0);
      return () => clearTimeout(timer);
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await fetchCurrentWeather(
            position.coords.latitude,
            position.coords.longitude,
          );

          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather:", error);
        } finally {
          setIsLoading(false);
        }
      },
      () => setIsLoading(false),
    );
  }, []);

  if (isLoading) return <span className="weatherLoader">--°C</span>;
  if (!weatherData) return <span className="weatherError">--°C</span>;

  const weatherCondition =
    weatherData.condition || weatherData.description || "Despejado";

  return (
    <div className="weatherWidget">
      <span className="weatherCondition">{weatherCondition}</span>

      <span className="temperature">
        {Math.round(weatherData.temperature)}°C
      </span>

      {weatherData.icon ? (
        <img
          src={weatherData.icon}
          alt={weatherCondition}
          className="weatherIconImg"
        />
      ) : (
        <span className="weatherIcon">☁</span>
      )}
    </div>
  );
}
