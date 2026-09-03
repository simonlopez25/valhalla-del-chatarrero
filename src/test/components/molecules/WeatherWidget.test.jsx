import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

vi.mock('../../../services/weatherService', () => ({
  fetchCurrentWeather: vi.fn(),
}));

import { fetchCurrentWeather } from '../../../services/weatherService';
import { WeatherWidget } from '../../../components/molecules/weatherWidget/WeatherWidget';

describe('WeatherWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete navigator.geolocation;
  });

  it('should show loading state initially', () => {
    navigator.geolocation = {
      getCurrentPosition: vi.fn((success) => {
        success({ coords: { latitude: 40, longitude: -3 } });
      }),
    };
    fetchCurrentWeather.mockReturnValue(new Promise(() => {}));

    render(<WeatherWidget />);

    expect(screen.getByText('--°C')).toBeInTheDocument();
  });

  it('should display weather data after successful fetch', async () => {
    navigator.geolocation = {
      getCurrentPosition: vi.fn((success) => {
        success({ coords: { latitude: 40, longitude: -3 } });
      }),
    };
    fetchCurrentWeather.mockResolvedValueOnce({
      temperature: 25,
      windspeed: 10,
      weathercode: 1,
      condition: 'Despejado',
    });

    render(<WeatherWidget />);

    await waitFor(() => {
      expect(screen.getByText('25°C')).toBeInTheDocument();
    });

    expect(screen.getByText('Despejado')).toBeInTheDocument();
  });

  it('should show error state when geolocation is not available', async () => {
    navigator.geolocation = undefined;

    render(<WeatherWidget />);

    await waitFor(() => {
      expect(screen.getByText('--°C')).toBeInTheDocument();
    });
  });

  it('should show error state when geolocation fails', async () => {
    navigator.geolocation = {
      getCurrentPosition: vi.fn((success, error) => {
        error();
      }),
    };

    render(<WeatherWidget />);

    await waitFor(() => {
      expect(screen.getByText('--°C')).toBeInTheDocument();
    });
  });

  it('should show error state when weather API fails', async () => {
    navigator.geolocation = {
      getCurrentPosition: vi.fn((success) => {
        success({ coords: { latitude: 40, longitude: -3 } });
      }),
    };
    fetchCurrentWeather.mockRejectedValueOnce(new Error('API Error'));

    render(<WeatherWidget />);

    await waitFor(() => {
      expect(screen.getByText('--°C')).toBeInTheDocument();
    });
  });
});
