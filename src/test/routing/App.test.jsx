import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContent } from '../../App';
import * as productsService from '../../services/productsService';
import * as usersService from '../../services/usersService';

describe('App Routing', () => {
  it('should render HomePage for "/" route', () => {
    vi.spyOn(productsService, 'getVisibleProducts').mockResolvedValue([]);
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppContent />
      </MemoryRouter>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should render SellersPage for "/sellersPage" route', () => {
    render(
      <MemoryRouter initialEntries={['/sellersPage']}>
        <AppContent />
      </MemoryRouter>
    );

    expect(screen.getByText('MARÍA JOSÉ')).toBeInTheDocument();
  });

  it('should render History for "/history" route', () => {
    render(
      <MemoryRouter initialEntries={['/history']}>
        <AppContent />
      </MemoryRouter>
    );

    expect(screen.getByText(/NUESTRA HISTORIA/i)).toBeInTheDocument();
  });

  it('should render ShowcasePage for "/showcase" route', async () => {
    vi.spyOn(productsService, 'getVisibleProducts').mockResolvedValue([]);
    render(
      <MemoryRouter initialEntries={['/showcase']}>
        <AppContent />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/VITRINA DEL CHATARRERO/i)).toBeInTheDocument();
    });
  });

  it('should render Users for "/users" route', async () => {
    vi.spyOn(usersService, 'fetchAllUsers').mockResolvedValue([]);
    render(
      <MemoryRouter initialEntries={['/users']}>
        <AppContent />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/REGISTRO DE SUPERVIVIENTES/i)).toBeInTheDocument();
    });
  });

  it('should render RegisterPage for "/registerPage" route', () => {
    render(
      <MemoryRouter initialEntries={['/registerPage']}>
        <AppContent />
      </MemoryRouter>
    );

    expect(screen.getByText('Nombre')).toBeInTheDocument();
  });

  it('should render header on all routes', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppContent />
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render footer on all routes', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppContent />
      </MemoryRouter>
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
