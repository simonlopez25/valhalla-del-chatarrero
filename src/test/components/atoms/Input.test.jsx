import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/atoms/input/Input';

describe('Input', () => {
  it('should render a label', () => {
    render(<Input label="Username" name="username" value="" onChange={() => {}} />);

    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('should render an input field', () => {
    render(<Input label="Test" name="test" value="" onChange={() => {}} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should display the current value', () => {
    render(<Input label="Test" name="test" value="Hello" onChange={() => {}} />);

    expect(screen.getByRole('textbox')).toHaveValue('Hello');
  });

  it('should call onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<Input label="Test" name="test" value="" onChange={handleChange} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should render with the given type', () => {
    render(<Input label="Password" name="password" type="password" value="" onChange={() => {}} />);

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('should default to text type', () => {
    render(<Input label="Test" name="test" value="" onChange={() => {}} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('should render placeholder', () => {
    render(
      <Input label="Test" name="test" value="" placeholder="Enter value" onChange={() => {}} />
    );

    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
  });

  it('should render error message when error is provided', () => {
    render(<Input label="Test" name="test" value="" onChange={() => {}} error="Required field" />);

    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('should not render error when error is not provided', () => {
    const { container } = render(<Input label="Test" name="test" value="" onChange={() => {}} />);

    expect(container.querySelector('.atom-inputError')).not.toBeInTheDocument();
  });

  it('should use id for htmlFor when provided', () => {
    render(<Input label="Test" name="test" value="" onChange={() => {}} id="custom-id" />);

    expect(screen.getByText('Test').closest('label')).toHaveAttribute('for', 'custom-id');
  });

  it('should use name for htmlFor when id is not provided', () => {
    render(<Input label="Test" name="myfield" value="" onChange={() => {}} />);

    expect(screen.getByText('Test').closest('label')).toHaveAttribute('for', 'myfield');
  });
});
