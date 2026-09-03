import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../../components/organisms/header/Header';

describe('Header', () => {
  it('should render the header element', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render the logo', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText(/VALHALLA/i)).toBeInTheDocument();
  });

  it('should render the navbar', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should have the header class', () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(container.querySelector('.headerContainer')).toBeInTheDocument();
  });
});
