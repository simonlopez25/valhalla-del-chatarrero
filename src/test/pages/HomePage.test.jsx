import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/homePage/HomePage';
import * as productsService from '../../services/productsService';

describe('HomePage', () => {
  it('should render the home page', async () => {
    vi.spyOn(productsService, 'getVisibleProducts').mockResolvedValue([]);
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(container.querySelector('.homeContainer')).toBeInTheDocument();
  });

  it('should render the hero section', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('should have the homePage class', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(container.querySelector('.homeContainer')).toBeInTheDocument();
  });
});
