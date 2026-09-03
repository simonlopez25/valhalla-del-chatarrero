import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import IdBadge from '../../../components/atoms/idBadge/IdBadge';

describe('IdBadge', () => {
  it('should render the ID with "ID:" prefix', () => {
    render(<IdBadge id="001-ALPHA" />);

    expect(screen.getByText('ID: 001-ALPHA')).toBeInTheDocument();
  });

  it('should render numeric IDs', () => {
    render(<IdBadge id={42} />);

    expect(screen.getByText('ID: 42')).toBeInTheDocument();
  });

  it('should have the idBadge class on container', () => {
    const { container } = render(<IdBadge id="test" />);

    expect(container.querySelector('.idBadge')).toBeInTheDocument();
  });

  it('should have the idBadgeText class on text span', () => {
    const { container } = render(<IdBadge id="test" />);

    expect(container.querySelector('.idBadgeText')).toBeInTheDocument();
  });

  it('should have the idBadgeDot class on dot span', () => {
    const { container } = render(<IdBadge id="test" />);

    expect(container.querySelector('.idBadgeDot')).toBeInTheDocument();
  });
});
