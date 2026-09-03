import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomModal } from '../../../components/molecules/customModal/CustomModal';

describe('CustomModal', () => {
  it('should render children when isOpen is true', () => {
    render(
      <CustomModal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </CustomModal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should not render when isOpen is false', () => {
    render(
      <CustomModal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </CustomModal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('should render a close button', () => {
    render(
      <CustomModal isOpen={true} onClose={() => {}}>
        <div>Content</div>
      </CustomModal>
    );

    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <CustomModal isOpen={true} onClose={handleClose}>
        <div>Content</div>
      </CustomModal>
    );

    fireEvent.click(screen.getByText('✕'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should have fixed positioning style on overlay', () => {
    render(
      <CustomModal isOpen={true} onClose={() => {}}>
        <div>Content</div>
      </CustomModal>
    );

    const overlay = document.querySelector('div[style*="position: fixed"]');
    expect(overlay).toBeInTheDocument();
  });
});
