import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Users from '../../pages/users/Users';
import * as usersService from '../../services/usersService';

describe('Users', () => {
  it('should render the users page', async () => {
    vi.spyOn(usersService, 'fetchAllUsers').mockResolvedValue([]);
    render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });

  it('should render the users title', async () => {
    vi.spyOn(usersService, 'fetchAllUsers').mockResolvedValue([]);
    render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/REGISTRO DE SUPERVIVIENTES/i)).toBeInTheDocument();
    });
  });

  it('should have the usersPage class', async () => {
    vi.spyOn(usersService, 'fetchAllUsers').mockResolvedValue([]);
    const { container } = render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(container.querySelector('.usersMainContainer')).toBeInTheDocument();
    });
  });
});
