import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ShowcasePage from '../../pages/showcase/ShowcasePage';
import * as productsService from '../../services/productsService';

describe('ShowcasePage', () => {
  it('should render the showcase page', async () => {
    vi.spyOn(productsService, 'getVisibleProducts').mockResolvedValue([]);
    const { container } = render(
      <BrowserRouter>
        <ShowcasePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(container.querySelector('.showcasePage')).toBeInTheDocument();
    });
  });

  it('should render the showcase title', async () => {
    vi.spyOn(productsService, 'getVisibleProducts').mockResolvedValue([]);
    render(
      <BrowserRouter>
        <ShowcasePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/VITRINA DEL CHATARRERO/i)).toBeInTheDocument();
    });
  });

  it('should have the showcasePage class', async () => {
    vi.spyOn(productsService, 'getVisibleProducts').mockResolvedValue([]);
    const { container } = render(
      <BrowserRouter>
        <ShowcasePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(container.querySelector('.showcasePage')).toBeInTheDocument();
    });
  });
});
