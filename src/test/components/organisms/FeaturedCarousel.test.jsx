import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import FeaturedCarousel from '../../../components/organisms/featuredCarousel/FeaturedCarousel';
import * as productsService from '../../../services/productsService';

const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description 1',
    price: 100,
    category: { name: 'Electronics' },
    images: ['https://example.com/img1.jpg'],
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Description 2',
    price: 200,
    category: { name: 'Clothing' },
    images: ['https://example.com/img2.jpg'],
  },
];

describe('FeaturedCarousel', () => {
  it('should render the carousel', async () => {
    vi.spyOn(productsService, 'getVisibleProducts').mockResolvedValue(mockProducts);
    render(<FeaturedCarousel />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
  });

  it('should render multiple products', async () => {
    vi.spyOn(productsService, 'getVisibleProducts').mockResolvedValue(mockProducts);
    render(<FeaturedCarousel />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  it('should render product images', async () => {
    vi.spyOn(productsService, 'getVisibleProducts').mockResolvedValue(mockProducts);
    render(<FeaturedCarousel />);

    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it('should have the featuredCarousel class', async () => {
    vi.spyOn(productsService, 'getVisibleProducts').mockResolvedValue(mockProducts);
    const { container } = render(<FeaturedCarousel />);

    await waitFor(() => {
      expect(container.querySelector('.carouselContainer')).toBeInTheDocument();
    });
  });
});
