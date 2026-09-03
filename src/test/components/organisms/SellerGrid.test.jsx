import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SellerGrid from '../../../components/organisms/sellerGrid/SellerGrid';

const mockSellers = [
  {
    id: 'ID: 001-ALPHA',
    name: 'MARÍA JOSÉ',
    role: 'CHATARRERA JEFE',
    description: 'Líder táctica especialista.',
    status: 'ESTADO: OPERATIVO',
    statusIcon: '🔧',
    imageSrc: 'https://example.com/avatar1.jpg',
    imageAlt: 'Maria Jose',
  },
  {
    id: 'ID: 002-BETA',
    name: 'PATRI',
    role: 'CHATARRERA',
    description: 'Especialista en metales.',
    status: 'ESTADO: OPERATIVO',
    statusIcon: '🔧',
    imageSrc: 'https://example.com/avatar2.jpg',
    imageAlt: 'Patri',
  },
];

describe('SellerGrid', () => {
  it('should render all sellers', () => {
    render(<SellerGrid sellers={mockSellers} />);

    expect(screen.getByText('MARÍA JOSÉ')).toBeInTheDocument();
    expect(screen.getByText('PATRI')).toBeInTheDocument();
  });

  it('should render seller cards', () => {
    render(<SellerGrid sellers={mockSellers} />);

    const cards = document.querySelectorAll('.sellerCard');
    expect(cards).toHaveLength(2);
  });

  it('should render empty state when no sellers', () => {
    render(<SellerGrid sellers={[]} />);

    expect(screen.queryByText('MARÍA JOSÉ')).not.toBeInTheDocument();
  });

  it('should have the sellerGrid class', () => {
    const { container } = render(<SellerGrid sellers={mockSellers} />);

    expect(container.querySelector('.sellerGrid')).toBeInTheDocument();
  });
});
