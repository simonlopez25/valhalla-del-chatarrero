import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EditProductModal from '../../../components/organisms/editProductModal/EditProductModal';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 100,
  description: 'Test description',
  category: { id: 1, name: 'Electronics' },
  images: ['https://example.com/img.jpg'],
};

describe('EditProductModal', () => {
  it('should render when product is provided', () => {
    render(
      <EditProductModal
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        product={mockProduct}
        categories={[]}
      />
    );

    expect(screen.getByText(/EDITAR ARTEFACTO/i)).toBeInTheDocument();
  });

  it('should pre-fill form with product data', () => {
    render(
      <EditProductModal
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        product={mockProduct}
        categories={[]}
      />
    );

    expect(screen.getByLabelText('Título')).toHaveValue('Test Product');
    expect(screen.getByLabelText(/Precio/i)).toHaveValue(100);
  });

  it('should call onClose when cancel button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <EditProductModal
        isOpen={true}
        onClose={handleClose}
        onSubmit={() => {}}
        product={mockProduct}
        categories={[]}
      />
    );

    fireEvent.click(screen.getByText('CANCELAR'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should have the editProductModal class', () => {
    const { container } = render(
      <EditProductModal
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        product={mockProduct}
        categories={[]}
      />
    );

    expect(container.querySelector('.updateModal')).toBeInTheDocument();
  });
});
