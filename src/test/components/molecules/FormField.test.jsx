import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormField } from '../../../components/molecules/formField/FormField';

describe('FormField', () => {
  it('should render a text input by default', () => {
    render(
      <FormField
        id="test"
        labelText="Test Label"
        type="text"
        name="test"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should render a select when type is select', () => {
    render(
      <FormField
        id="test"
        labelText="Category"
        type="select"
        name="category"
        value=""
        onChange={() => {}}
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render a textarea when type is textarea', () => {
    render(
      <FormField
        id="test"
        labelText="Description"
        type="textarea"
        name="desc"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render error message when error is provided', () => {
    render(
      <FormField
        id="test"
        labelText="Test"
        type="text"
        name="test"
        value=""
        onChange={() => {}}
        error="This field is required"
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should not render error when not provided', () => {
    const { container } = render(
      <FormField
        id="test"
        labelText="Test"
        type="text"
        name="test"
        value=""
        onChange={() => {}}
      />
    );

    expect(container.querySelector('.fieldError')).not.toBeInTheDocument();
  });

  it('should call onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(
      <FormField
        id="test"
        labelText="Test"
        type="text"
        name="test"
        value=""
        onChange={handleChange}
      />
    );

    fireEvent.change(screen.getByLabelText('Test'), { target: { value: 'new' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should handle string options for select', () => {
    render(
      <FormField
        id="test"
        labelText="Role"
        type="select"
        name="role"
        value=""
        onChange={() => {}}
        options={['admin', 'customer']}
      />
    );

    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('customer')).toBeInTheDocument();
  });

  it('should set aria-invalid when error is present', () => {
    render(
      <FormField
        id="test"
        labelText="Test"
        type="text"
        name="test"
        value=""
        onChange={() => {}}
        error="Error"
      />
    );

    expect(screen.getByLabelText('Test')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should disable input when disabled prop is true', () => {
    render(
      <FormField
        id="test"
        labelText="Test"
        type="text"
        name="test"
        value=""
        onChange={() => {}}
        disabled
      />
    );

    expect(screen.getByLabelText('Test')).toBeDisabled();
  });
});
