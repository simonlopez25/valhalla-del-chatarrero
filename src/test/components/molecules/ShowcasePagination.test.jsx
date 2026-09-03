import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ShowcasePagination from '../../../components/molecules/showcasePagination/ShowcasePagination';

describe('ShowcasePagination', () => {
  it('should render page numbers', () => {
    render(
      <ShowcasePagination page={1} totalPages={5} onPageChange={() => {}} />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should call onPageChange when a page number is clicked', () => {
    const handlePageChange = vi.fn();
    render(
      <ShowcasePagination page={1} totalPages={5} onPageChange={handlePageChange} />
    );

    fireEvent.click(screen.getByText('3'));

    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  it('should call onPageChange with previous page when left arrow is clicked', () => {
    const handlePageChange = vi.fn();
    render(
      <ShowcasePagination page={3} totalPages={5} onPageChange={handlePageChange} />
    );

    fireEvent.click(screen.getByLabelText('Página anterior'));

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange with next page when right arrow is clicked', () => {
    const handlePageChange = vi.fn();
    render(
      <ShowcasePagination page={3} totalPages={5} onPageChange={handlePageChange} />
    );

    fireEvent.click(screen.getByLabelText('Página siguiente'));

    expect(handlePageChange).toHaveBeenCalledWith(4);
  });

  it('should disable previous button on first page', () => {
    render(
      <ShowcasePagination page={1} totalPages={5} onPageChange={() => {}} />
    );

    expect(screen.getByLabelText('Página anterior')).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    render(
      <ShowcasePagination page={5} totalPages={5} onPageChange={() => {}} />
    );

    expect(screen.getByLabelText('Página siguiente')).toBeDisabled();
  });

  it('should highlight the active page', () => {
    render(
      <ShowcasePagination page={3} totalPages={5} onPageChange={() => {}} />
    );

    const activeButton = screen.getByText('3');
    expect(activeButton.className).toContain('showcasePageBtnActive');
  });

  it('should show ellipsis when there are more pages than window size', () => {
    render(
      <ShowcasePagination page={5} totalPages={20} onPageChange={() => {}} />
    );

    const ellipsis = document.querySelectorAll('.showcasePageEllipsis');
    expect(ellipsis.length).toBeGreaterThan(0);
  });
});
