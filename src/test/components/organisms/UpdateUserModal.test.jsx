import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UpdateUserModal from '../../../components/organisms/updateUserModal/UpdateUserModal';

const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: 'customer',
  avatar: 'https://example.com/avatar.jpg',
};

describe('UpdateUserModal', () => {
  it('should render when isOpen is true', () => {
    render(
      <UpdateUserModal
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        user={mockUser}
      />
    );

    expect(screen.getByText(/ACTUALIZAR REGISTRO/i)).toBeInTheDocument();
  });

  it('should not render when isOpen is false', () => {
    render(
      <UpdateUserModal
        isOpen={false}
        onClose={() => {}}
        onSubmit={() => {}}
        user={mockUser}
      />
    );

    expect(screen.queryByText(/ACTUALIZAR REGISTRO/i)).not.toBeInTheDocument();
  });

  it('should pre-fill form with user data', () => {
    render(
      <UpdateUserModal
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        user={mockUser}
      />
    );

    expect(screen.getByLabelText('Nombre')).toHaveValue('Test User');
    expect(screen.getByLabelText(/Correo Electrónico/i)).toHaveValue('test@example.com');
  });

  it('should call onClose when cancel button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <UpdateUserModal
        isOpen={true}
        onClose={handleClose}
        onSubmit={() => {}}
        user={mockUser}
      />
    );

    fireEvent.click(screen.getByText(/CANCELAR/i));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should have the updateUserModal class', () => {
    const { container } = render(
      <UpdateUserModal
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        user={mockUser}
      />
    );

    expect(container.querySelector('.updateModal')).toBeInTheDocument();
  });
});
