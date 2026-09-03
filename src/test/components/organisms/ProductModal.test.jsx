import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductModal from '../../../components/organisms/product-modal/ProductModal';

describe('ProductModal', () => {
  it('should render when isOpen is true', () => {
    render(
      <ProductModal
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        categories={[]}
      />
    );

    expect(screen.getByText(/Nuevo producto/i)).toBeInTheDocument();
  });

  it('should not render when isOpen is false', () => {
    render(
      <ProductModal
        isOpen={false}
        onClose={() => {}}
        onSubmit={() => {}}
        categories={[]}
      />
    );

    expect(screen.queryByText(/Nuevo producto/i)).not.toBeInTheDocument();
  });

  it('should render form fields', () => {
    render(
      <ProductModal
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        categories={[]}
      />
    );

    expect(screen.getByLabelText(/Nombre del producto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Precio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
  });

  it('should call onClose when cancel/close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <ProductModal
        isOpen={true}
        onClose={handleClose}
        onSubmit={() => {}}
        categories={[]}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: '×' }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should have the productModal class', () => {
    const { container } = render(
      <ProductModal
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        categories={[]}
      />
    );

    expect(container.querySelector('.product-modal')).toBeInTheDocument();
  });
});
