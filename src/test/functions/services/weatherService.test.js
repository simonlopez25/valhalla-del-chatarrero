import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

import { fetchCurrentWeather } from '../../../services/weatherService';

describe('weatherService - fetchCurrentWeather', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should fetch weather data and return formatted response', async () => {
    const mockResponse = {
      data: {
        current_weather: {
          temperature: 25.5,
          windspeed: 12.3,
          weathercode: 1,
        },
      },
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    const result = await fetchCurrentWeather(40.4168, -3.7038);

    expect(result).toEqual({
      temperature: 25.5,
      windspeed: 12.3,
      weathercode: 1,
      condition: 'Despejado',
    });
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.open-meteo.com/v1/forecast',
      {
        params: {
          latitude: 40.4168,
          longitude: -3.7038,
          current_weather: true,
        },
      }
    );
  });

  it('should return "Despejado" for weather code 0', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        current_weather: { temperature: 30, windspeed: 5, weathercode: 0 },
      },
    });

    const result = await fetchCurrentWeather(0, 0);

    expect(result.condition).toBe('Despejado');
  });

  it('should return "Nublado" for weather code 2', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        current_weather: { temperature: 20, windspeed: 8, weathercode: 2 },
      },
    });

    const result = await fetchCurrentWeather(0, 0);

    expect(result.condition).toBe('Nublado');
  });

  it('should return "Lluvia" for weather code 61', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        current_weather: { temperature: 15, windspeed: 10, weathercode: 61 },
      },
    });

    const result = await fetchCurrentWeather(0, 0);

    expect(result.condition).toBe('Lluvia');
  });

  it('should return "Nieve" for weather code 71', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        current_weather: { temperature: -2, windspeed: 15, weathercode: 71 },
      },
    });

    const result = await fetchCurrentWeather(0, 0);

    expect(result.condition).toBe('Nieve');
  });

  it('should return "Tormenta" for weather code 95', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        current_weather: { temperature: 18, windspeed: 25, weathercode: 95 },
      },
    });

    const result = await fetchCurrentWeather(0, 0);

    expect(result.condition).toBe('Tormenta');
  });

  it('should return "Despejado" for unknown weather codes', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        current_weather: { temperature: 22, windspeed: 5, weathercode: 999 },
      },
    });

    const result = await fetchCurrentWeather(0, 0);

    expect(result.condition).toBe('Despejado');
  });

  it('should propagate API errors', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    await expect(fetchCurrentWeather(0, 0)).rejects.toThrow('Network Error');
  });
});
