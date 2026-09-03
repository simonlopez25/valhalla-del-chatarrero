import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SellerCard from '../../../components/molecules/sellerCard/SellerCard';

const mockSeller = {
  id: 'ID: 001-ALPHA',
  name: 'MARÍA JOSÉ',
  role: 'CHATARRERA JEFE',
  description: 'Líder táctica especialista.',
  status: 'ESTADO: OPERATIVO',
  statusIcon: '🔧',
  imageSrc: 'https://example.com/avatar.jpg',
  imageAlt: 'Maria Jose',
};

describe('SellerCard', () => {
  it('should render the seller name', () => {
    render(<SellerCard seller={mockSeller} />);

    expect(screen.getByText('MARÍA JOSÉ')).toBeInTheDocument();
  });

  it('should render the seller role', () => {
    render(<SellerCard seller={mockSeller} />);

    expect(screen.getByText('CHATARRERA JEFE')).toBeInTheDocument();
  });

  it('should render the seller description', () => {
    render(<SellerCard seller={mockSeller} />);

    expect(screen.getByText('Líder táctica especialista.')).toBeInTheDocument();
  });

  it('should render the seller ID', () => {
    render(<SellerCard seller={mockSeller} />);

    expect(screen.getByText('ID: ID: 001-ALPHA')).toBeInTheDocument();
  });

  it('should render the status', () => {
    render(<SellerCard seller={mockSeller} />);

    expect(screen.getByText('ESTADO: OPERATIVO')).toBeInTheDocument();
  });

  it('should render the status icon', () => {
    render(<SellerCard seller={mockSeller} />);

    expect(screen.getByText('🔧')).toBeInTheDocument();
  });

  it('should render the avatar image', () => {
    render(<SellerCard seller={mockSeller} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(img).toHaveAttribute('alt', 'Maria Jose');
  });

  it('should have the sellerCard class', () => {
    const { container } = render(<SellerCard seller={mockSeller} />);

    expect(container.querySelector('.sellerCard')).toBeInTheDocument();
  });
});
