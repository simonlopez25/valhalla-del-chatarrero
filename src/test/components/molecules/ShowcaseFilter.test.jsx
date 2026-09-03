import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ShowcaseFilter from '../../../components/molecules/showcaseFilter/ShowcaseFilter';

const mockCategories = [
  { id: 1, name: 'Electrónica' },
  { id: 2, name: 'Ropa' },
];

describe('ShowcaseFilter', () => {
  it('should render category filter label', () => {
    render(
      <ShowcaseFilter
        categories={mockCategories}
        activeCategoryId=""
        sort="price-asc"
        onCategoryChange={() => {}}
        onSortChange={() => {}}
      />
    );

    expect(screen.getByText('Filtrar por categoría:')).toBeInTheDocument();
  });

  it('should render sort filter label', () => {
    render(
      <ShowcaseFilter
        categories={mockCategories}
        activeCategoryId=""
        sort="price-asc"
        onCategoryChange={() => {}}
        onSortChange={() => {}}
      />
    );

    expect(screen.getByText('Ordenar por:')).toBeInTheDocument();
  });

  it('should render all category options', () => {
    render(
      <ShowcaseFilter
        categories={mockCategories}
        activeCategoryId=""
        sort="priceAsc"
        onCategoryChange={() => {}}
        onSortChange={() => {}}
      />
    );

    expect(screen.getAllByText('TODAS').length).toBeGreaterThan(0);
    expect(screen.getByText('Electrónica')).toBeInTheDocument();
    expect(screen.getByText('Ropa')).toBeInTheDocument();
  });

  it('should call onCategoryChange when category selection changes', () => {
    const handleCategoryChange = vi.fn();
    render(
      <ShowcaseFilter
        categories={mockCategories}
        activeCategoryId=""
        sort="priceAsc"
        onCategoryChange={handleCategoryChange}
        onSortChange={() => {}}
      />
    );

    const categorySelect = screen.getByLabelText('Filtrar por categoría:');
    fireEvent.change(categorySelect, {
      target: { value: '1' },
    });

    expect(handleCategoryChange).toHaveBeenCalledWith('1');
  });

  it('should call onSortChange when sort selection changes', () => {
    const handleSortChange = vi.fn();
    render(
      <ShowcaseFilter
        categories={mockCategories}
        activeCategoryId=""
        sort="priceAsc"
        onCategoryChange={() => {}}
        onSortChange={handleSortChange}
      />
    );

    const sortSelect = screen.getByLabelText('Ordenar por:');
    fireEvent.change(sortSelect, { target: { value: 'priceDesc' } });

    expect(handleSortChange).toHaveBeenCalledWith('priceDesc');
  });

  it('should display "TODAS" as active label when no category is selected', () => {
    render(
      <ShowcaseFilter
        categories={mockCategories}
        activeCategoryId=""
        sort="priceAsc"
        onCategoryChange={() => {}}
        onSortChange={() => {}}
      />
    );

    expect(screen.getAllByText('TODAS').length).toBeGreaterThan(0);
  });

  it('should display category name as active label when a category is selected', () => {
    render(
      <ShowcaseFilter
        categories={mockCategories}
        activeCategoryId="1"
        sort="priceAsc"
        onCategoryChange={() => {}}
        onSortChange={() => {}}
      />
    );

    expect(screen.getByText('ELECTRÓNICA')).toBeInTheDocument();
  });
});
