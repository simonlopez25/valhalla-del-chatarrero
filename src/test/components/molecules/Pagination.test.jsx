import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../../components/molecules/pagination/Pagination';

describe('Pagination', () => {
  it('should render current page info', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        currentCount={10}
        totalCount={50}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByText('Mostrando 10 registros de 50')).toBeInTheDocument();
  });

  it('should render previous and next buttons', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        currentCount={10}
        totalCount={50}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByText('ANT')).toBeInTheDocument();
    expect(screen.getByText('SIG')).toBeInTheDocument();
  });

  it('should call onPrevious when previous button is clicked', () => {
    const handlePrevious = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        currentCount={10}
        totalCount={50}
        onPrevious={handlePrevious}
        onNext={() => {}}
      />
    );

    fireEvent.click(screen.getByText('ANT'));

    expect(handlePrevious).toHaveBeenCalledTimes(1);
  });

  it('should call onNext when next button is clicked', () => {
    const handleNext = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        currentCount={10}
        totalCount={50}
        onPrevious={() => {}}
        onNext={handleNext}
      />
    );

    fireEvent.click(screen.getByText('SIG'));

    expect(handleNext).toHaveBeenCalledTimes(1);
  });

  it('should disable previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        currentCount={10}
        totalCount={50}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByText('ANT')).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        currentCount={10}
        totalCount={50}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByText('SIG')).toBeDisabled();
  });

  it('should enable both buttons on middle pages', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        currentCount={10}
        totalCount={50}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByText('ANT')).not.toBeDisabled();
    expect(screen.getByText('SIG')).not.toBeDisabled();
  });
});
