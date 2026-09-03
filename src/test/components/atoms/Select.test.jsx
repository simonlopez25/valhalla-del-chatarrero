import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../../../components/atoms/select/Select';

describe('Select', () => {
  const options = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
  ];

  it('should render a label', () => {
    render(<Select label="Category" name="category" value="" onChange={() => {}} options={options} />);

    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('should render a select element', () => {
    render(<Select label="Test" name="test" value="" onChange={() => {}} options={options} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render a default option', () => {
    render(<Select label="Test" name="test" value="" onChange={() => {}} options={options} />);

    expect(screen.getByText('Seleccionar...')).toBeInTheDocument();
  });

  it('should render all options', () => {
    render(<Select label="Test" name="test" value="" onChange={() => {}} options={options} />);

    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Clothing')).toBeInTheDocument();
  });

  it('should call onChange when selection changes', () => {
    const handleChange = vi.fn();
    render(<Select label="Test" name="test" value="" onChange={handleChange} options={options} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should display the selected value', () => {
    render(<Select label="Test" name="test" value="2" onChange={() => {}} options={options} />);

    expect(screen.getByRole('combobox')).toHaveValue('2');
  });

  it('should render error message when error is provided', () => {
    render(
      <Select label="Test" name="test" value="" onChange={() => {}} options={options} error="Required" />
    );

    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('should not render error when not provided', () => {
    const { container } = render(
      <Select label="Test" name="test" value="" onChange={() => {}} options={options} />
    );

    expect(container.querySelector('.atom-selectError')).not.toBeInTheDocument();
  });
});
