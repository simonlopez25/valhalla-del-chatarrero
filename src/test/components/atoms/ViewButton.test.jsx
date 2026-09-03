import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ViewButton from '../../../components/atoms/viewButton/ViewButton';

describe('ViewButton', () => {
  it('should render a button', () => {
    render(<ViewButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should have type button', () => {
    render(<ViewButton />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('should have the viewButton class', () => {
    render(<ViewButton />);

    expect(screen.getByRole('button').className).toContain('viewButton');
  });

  it('should have the actionButton class', () => {
    render(<ViewButton />);

    expect(screen.getByRole('button').className).toContain('actionButton');
  });

  it('should have a title attribute', () => {
    render(<ViewButton />);

    expect(screen.getByRole('button')).toHaveAttribute('title', 'Sujeto no identificado');
  });

  it('should render an SVG icon', () => {
    const { container } = render(<ViewButton />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should show alert when clicked', () => {
    window.alert = vi.fn();
    render(<ViewButton />);

    fireEvent.click(screen.getByRole('button'));

    expect(window.alert).toHaveBeenCalledWith('Sujeto no identificado');
  });
});
