import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteButton from '../../../components/atoms/deleteButton/DeleteButton';

describe('DeleteButton', () => {
  it('should render a button', () => {
    render(<DeleteButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<DeleteButton onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have type button', () => {
    render(<DeleteButton />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('should have the deleteButton class', () => {
    render(<DeleteButton />);

    expect(screen.getByRole('button').className).toContain('deleteButton');
  });

  it('should have the actionButton class', () => {
    render(<DeleteButton />);

    expect(screen.getByRole('button').className).toContain('actionButton');
  });

  it('should have a title attribute', () => {
    render(<DeleteButton />);

    expect(screen.getByRole('button')).toHaveAttribute('title', 'Eliminar');
  });

  it('should render an SVG icon', () => {
    const { container } = render(<DeleteButton />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
