import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ShowcaseCard from '../../../components/molecules/showcaseCard/ShowcaseCard';

const mockItem = {
  id: 1,
  title: 'Auriculares Bluetooth',
  description: 'Auriculares inalámbricos con cancelación de ruido',
  price: 150,
  category: { name: 'Electrónica' },
  images: ['https://example.com/headphones.jpg'],
};

describe('ShowcaseCard', () => {
  it('should render the product title', () => {
    render(<ShowcaseCard item={mockItem} />);

    expect(screen.getByText('Auriculares Bluetooth')).toBeInTheDocument();
  });

  it('should render the product description', () => {
    render(<ShowcaseCard item={mockItem} />);

    expect(screen.getByText('Auriculares inalámbricos con cancelación de ruido')).toBeInTheDocument();
  });

  it('should render the category', () => {
    render(<ShowcaseCard item={mockItem} />);

    expect(screen.getByText('Electrónica')).toBeInTheDocument();
  });

  it('should render the price formatted', () => {
    render(<ShowcaseCard item={mockItem} />);

    expect(screen.getByText('$150')).toBeInTheDocument();
  });

  it('should render the product image', () => {
    render(<ShowcaseCard item={mockItem} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Auriculares Bluetooth');
  });

  it('should render an add button', () => {
    render(<ShowcaseCard item={mockItem} />);

    expect(screen.getByText('AÑADIR')).toBeInTheDocument();
  });

  it('should handle missing category gracefully', () => {
    const itemWithoutCategory = { ...mockItem, category: null };
    render(<ShowcaseCard item={itemWithoutCategory} />);

    expect(screen.getByText('SIN CATEGORÍA')).toBeInTheDocument();
  });

  it('should handle missing title gracefully', () => {
    const itemWithoutTitle = { ...mockItem, title: null };
    render(<ShowcaseCard item={itemWithoutTitle} />);

    expect(screen.getByText('Artefacto desconocido')).toBeInTheDocument();
  });

  it('should handle missing description gracefully', () => {
    const itemWithoutDesc = { ...mockItem, description: null };
    render(<ShowcaseCard item={itemWithoutDesc} />);

    expect(screen.getByText('Sin descripción registrada.')).toBeInTheDocument();
  });
});
