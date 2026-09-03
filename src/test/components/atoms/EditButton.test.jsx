import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EditButton from '../../../components/atoms/editButton/EditButton';

describe('EditButton', () => {
  it('should render a button', () => {
    render(<EditButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<EditButton onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have type button', () => {
    render(<EditButton />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('should have the editButton class', () => {
    render(<EditButton />);

    expect(screen.getByRole('button').className).toContain('editButton');
  });

  it('should have the actionButton class', () => {
    render(<EditButton />);

    expect(screen.getByRole('button').className).toContain('actionButton');
  });

  it('should have default aria-label', () => {
    render(<EditButton />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Editar');
  });

  it('should accept custom aria-label', () => {
    render(<EditButton ariaLabel="Edit User" />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Edit User');
  });

  it('should accept custom className', () => {
    render(<EditButton className="extra-class" />);

    expect(screen.getByRole('button').className).toContain('extra-class');
  });

  it('should render an SVG icon', () => {
    const { container } = render(<EditButton />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
