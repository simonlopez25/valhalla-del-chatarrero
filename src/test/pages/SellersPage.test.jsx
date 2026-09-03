import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SellersPage from '../../pages/sellersPage/SellersPage';

describe('SellersPage', () => {
  it('should render the sellers page', () => {
    render(
      <BrowserRouter>
        <SellersPage />
      </BrowserRouter>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should render the seller grid', () => {
    render(
      <BrowserRouter>
        <SellersPage />
      </BrowserRouter>
    );

    expect(screen.getByText('MARÍA JOSÉ')).toBeInTheDocument();
  });

  it('should have the sellersPage class', () => {
    const { container } = render(
      <BrowserRouter>
        <SellersPage />
      </BrowserRouter>
    );

    expect(container.querySelector('.sellersPageContainer')).toBeInTheDocument();
  });
});
