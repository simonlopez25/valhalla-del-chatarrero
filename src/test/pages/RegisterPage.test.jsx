import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterPage from '../../pages/registerPage/RegisterPage';

describe('RegisterPage', () => {
  it('should render the register page', () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should render the register form', () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Correo Electrónico')).toBeInTheDocument();
  });

  it('should have the registerPage class', () => {
    const { container } = render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    expect(container.querySelector('.registerPageContainer')).toBeInTheDocument();
  });
});
