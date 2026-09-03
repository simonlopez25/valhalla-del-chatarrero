import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HeroSection from '../../../components/organisms/heroSection/HeroSection';

describe('HeroSection', () => {
  it('should render the hero section', () => {
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('should render the main heading', () => {
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/RECOLECTA/)).toBeInTheDocument();
  });

  it('should render the subtitle', () => {
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );

    expect(screen.getByText(/chatarra/i)).toBeInTheDocument();
  });

  it('should render a call-to-action button', () => {
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );

    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('should have the heroSection class', () => {
    const { container } = render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );

    expect(container.querySelector('.heroWrapper')).toBeInTheDocument();
  });
});
