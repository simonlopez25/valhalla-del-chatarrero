import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomButton } from '../../../components/atoms/customButton/CustomButton';

describe('CustomButton', () => {
  it('should render with the given label', () => {
    render(<CustomButton label="Submit" />);

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should have type submit by default', () => {
    render(<CustomButton label="Submit" />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should accept custom type', () => {
    render(<CustomButton label="Click" type="button" />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<CustomButton label="Click" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<CustomButton label="Disabled" disabled />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should have the customButton class', () => {
    render(<CustomButton label="Test" />);

    expect(screen.getByRole('button').className).toContain('customButton');
  });
});
