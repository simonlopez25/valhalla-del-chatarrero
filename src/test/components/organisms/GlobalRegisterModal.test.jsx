import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GlobalRegisterModal from '../../../components/organisms/globalRegisterModal/GlobalRegisterModal';

describe('GlobalRegisterModal', () => {
  it('should render when isOpen is true', () => {
    render(
      <GlobalRegisterModal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </GlobalRegisterModal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should not render when isOpen is false', () => {
    render(
      <GlobalRegisterModal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </GlobalRegisterModal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <GlobalRegisterModal isOpen={true} onClose={handleClose}>
        <div>Content</div>
      </GlobalRegisterModal>
    );

    fireEvent.click(screen.getByText('✕'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should have the globalRegisterModal class', () => {
    const { container } = render(
      <GlobalRegisterModal isOpen={true} onClose={() => {}}>
        <div>Content</div>
      </GlobalRegisterModal>
    );

    expect(container.querySelector('.globalRegisterModal')).toBeInTheDocument();
  });
});
