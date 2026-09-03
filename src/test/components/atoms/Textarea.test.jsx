import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Textarea from '../../../components/atoms/textarea/Textarea';

describe('Textarea', () => {
  it('should render a label', () => {
    render(<Textarea label="Description" name="desc" value="" onChange={() => {}} />);

    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('should render a textarea element', () => {
    render(<Textarea label="Test" name="test" value="" onChange={() => {}} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should display the current value', () => {
    render(<Textarea label="Test" name="test" value="Hello World" onChange={() => {}} />);

    expect(screen.getByRole('textbox')).toHaveValue('Hello World');
  });

  it('should call onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<Textarea label="Test" name="test" value="" onChange={handleChange} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new text' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should render placeholder', () => {
    render(
      <Textarea label="Test" name="test" value="" placeholder="Enter description" onChange={() => {}} />
    );

    expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
  });

  it('should render error message when error is provided', () => {
    render(<Textarea label="Test" name="test" value="" onChange={() => {}} error="Required" />);

    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('should not render error when not provided', () => {
    const { container } = render(<Textarea label="Test" name="test" value="" onChange={() => {}} />);

    expect(container.querySelector('.atom-textareaError')).not.toBeInTheDocument();
  });

  it('should use id for htmlFor when provided', () => {
    render(<Textarea label="Test" name="test" value="" onChange={() => {}} id="custom-id" />);

    expect(screen.getByText('Test').closest('label')).toHaveAttribute('for', 'custom-id');
  });
});
