import { useEffect, useState } from "react";
import { fetchCurrentWeather } from "../../services/weatherService";
import "./WeatherWidget.css";

export function WeatherWidget() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
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
    }
  }, []);

  if (isLoading) return <span className="weatherLoader">Loading...</span>;
  if (!weatherData) return <span className="weatherError">--°C</span>;

  return (
    <div className="weatherWidget">
      <span className="temperature">
        {Math.round(weatherData.temperature)}°C
      </span>
      <span className="weatherIcon">☁</span>
    </div>
  );
}
