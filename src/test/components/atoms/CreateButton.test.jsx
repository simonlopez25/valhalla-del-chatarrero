import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateButton from '../../../components/atoms/createButton/CreateButton';

describe('CreateButton', () => {
  it('should render with default label', () => {
    render(<CreateButton />);

    expect(screen.getByText('NUEVO REGISTRO')).toBeInTheDocument();
  });

  it('should render with custom label', () => {
    render(<CreateButton label="CREAR PRODUCTO" />);

    expect(screen.getByText('CREAR PRODUCTO')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<CreateButton onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render with userPlus icon by default', () => {
    const { container } = render(<CreateButton />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should render with package icon when specified', () => {
    const { container } = render(<CreateButton icon="package" />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should have the createButton class', () => {
    render(<CreateButton />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('createButton');
  });

  it('should have type button', () => {
    render(<CreateButton />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });
});
