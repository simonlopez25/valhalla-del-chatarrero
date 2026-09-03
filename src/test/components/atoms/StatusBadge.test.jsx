import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../../../components/atoms/statusBadge/StatusBadge';

describe('StatusBadge', () => {
  it('should render status text with "ESTADO:" prefix when not already present', () => {
    render(<StatusBadge status="OPERATIVO" icon="🔧" />);

    expect(screen.getByText('ESTADO: OPERATIVO')).toBeInTheDocument();
  });

  it('should render status text as-is when already has "ESTADO:" prefix', () => {
    render(<StatusBadge status="ESTADO: OPERATIVO" icon="🔧" />);

    expect(screen.getByText('ESTADO: OPERATIVO')).toBeInTheDocument();
  });

  it('should render the icon', () => {
    render(<StatusBadge status="OPERATIVO" icon="🔧" />);

    expect(screen.getByText('🔧')).toBeInTheDocument();
  });

  it('should have the statusBadge class on container', () => {
    const { container } = render(<StatusBadge status="Test" icon="X" />);

    expect(container.querySelector('.statusBadge')).toBeInTheDocument();
  });

  it('should have the statusBadgeText class on text span', () => {
    const { container } = render(<StatusBadge status="Test" icon="X" />);

    expect(container.querySelector('.statusBadgeText')).toBeInTheDocument();
  });

  it('should have the statusBadgeIcon class on icon span', () => {
    const { container } = render(<StatusBadge status="Test" icon="X" />);

    expect(container.querySelector('.statusBadgeIcon')).toBeInTheDocument();
  });
});
