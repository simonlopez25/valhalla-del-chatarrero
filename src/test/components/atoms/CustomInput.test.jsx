import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomInput } from '../../../components/atoms/customInput/CustomInput';

describe('CustomInput', () => {
  it('should render an input element', () => {
    render(<CustomInput id="test" name="test" value="" onChange={() => {}} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render with the given type', () => {
    render(<CustomInput id="email" name="email" type="email" value="" onChange={() => {}} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('should render with the given value', () => {
    render(<CustomInput id="test" name="test" value="Hello" onChange={() => {}} />);

    expect(screen.getByRole('textbox')).toHaveValue('Hello');
  });

  it('should render with the given placeholder', () => {
    render(
      <CustomInput id="test" name="test" value="" placeholder="Enter text" onChange={() => {}} />
    );

    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should call onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<CustomInput id="test" name="test" value="" onChange={handleChange} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should render with the given name', () => {
    render(<CustomInput id="test" name="username" value="" onChange={() => {}} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'username');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<CustomInput id="test" name="test" value="" onChange={() => {}} disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('should set aria-invalid when provided', () => {
    render(
      <CustomInput id="test" name="test" value="" onChange={() => {}} aria-invalid="true" />
    );

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should have the customInput class', () => {
    render(<CustomInput id="test" name="test" value="" onChange={() => {}} />);

    expect(screen.getByRole('textbox').className).toContain('customInput');
  });
});
