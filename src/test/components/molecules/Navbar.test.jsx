import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../../../components/molecules/navbar/Navbar';

describe('Navbar', () => {
  it('should render navigation element', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should render all navigation items', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('PORTAL')).toBeInTheDocument();
    expect(screen.getAllByText('EQUIPO').length).toBeGreaterThan(0);
    expect(screen.getAllByText('HISTORIA').length).toBeGreaterThan(0);
    expect(screen.getAllByText('TIENDA').length).toBeGreaterThan(0);
    expect(screen.getAllByText('USUARIOS').length).toBeGreaterThan(0);
  });

  it('should render links with correct paths', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/sellersPage');
    expect(links[2]).toHaveAttribute('href', '/history');
    expect(links[3]).toHaveAttribute('href', '/showcase');
    expect(links[4]).toHaveAttribute('href', '/users');
  });

  it('should have the navbar class', () => {
    const { container } = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(container.querySelector('.navbar')).toBeInTheDocument();
  });
});
