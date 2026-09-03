import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../../../components/organisms/registerForm/RegisterForm';

describe('RegisterForm', () => {
  it('should render the form', () => {
    render(<RegisterForm />);

    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Correo Electrónico')).toBeInTheDocument();
    expect(screen.getByText('Contraseña')).toBeInTheDocument();
  });

  it('should render avatar input', () => {
    render(<RegisterForm />);

    expect(screen.getByText(/Avatar/i)).toBeInTheDocument();
  });

  it('should render submit button', () => {
    render(<RegisterForm />);

    expect(screen.getByText(/Crear Usuario/i)).toBeInTheDocument();
  });

  it('should have the registerForm class', () => {
    const { container } = render(<RegisterForm />);

    expect(container.querySelector('.registerForm')).toBeInTheDocument();
  });
});
