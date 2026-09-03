import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RoleBadge from '../../../components/atoms/roleBadge/RoleBadge';

describe('RoleBadge', () => {
  it('should render the label text', () => {
    render(<RoleBadge label="ADMIN" />);

    expect(screen.getByText('ADMIN')).toBeInTheDocument();
  });

  it('should have the roleBadge class', () => {
    const { container } = render(<RoleBadge label="Test" />);

    expect(container.querySelector('.roleBadge')).toBeInTheDocument();
  });

  it('should render as a span element', () => {
    const { container } = render(<RoleBadge label="Test" />);

    const span = container.querySelector('span.roleBadge');
    expect(span).toBeInTheDocument();
  });
});
