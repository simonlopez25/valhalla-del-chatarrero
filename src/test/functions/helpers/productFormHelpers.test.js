import { describe, it, expect } from 'vitest';
import {
  emptyProductForm,
  getCategoryOptions,
  getProductFieldErrors,
} from '../../../components/organisms/productForm/productFormHelpers';

describe('productFormHelpers - emptyProductForm', () => {
  it('should have all required fields as empty strings', () => {
    expect(emptyProductForm).toEqual({
      title: '',
      price: '',
      description: '',
      categoryId: '',
      image: '',
    });
  });
});

describe('productFormHelpers - getCategoryOptions', () => {
  it('should return a default option plus mapped categories', () => {
    const categories = [
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Clothing' },
    ];

    const result = getCategoryOptions(categories);

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ value: '', label: 'Selecciona una categoría' });
    expect(result[1]).toEqual({ value: '1', label: 'Electronics' });
    expect(result[2]).toEqual({ value: '2', label: 'Clothing' });
  });

  it('should handle empty categories array', () => {
    const result = getCategoryOptions([]);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ value: '', label: 'Selecciona una categoría' });
  });

  it('should convert category IDs to strings', () => {
    const categories = [{ id: 42, name: 'Test' }];
    const result = getCategoryOptions(categories);

    expect(result[1].value).toBe('42');
    expect(typeof result[1].value).toBe('string');
  });
});

describe('productFormHelpers - getProductFieldErrors', () => {
  it('should return no errors for a valid form', () => {
    const form = {
      title: 'Valid Product',
      price: '100',
      description: 'A valid description',
      categoryId: '1',
      image: 'https://example.com/image.jpg',
    };

    const errors = getProductFieldErrors(form);

    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('should return error for empty title', () => {
    const form = {
      title: '',
      price: '100',
      description: 'Description',
      categoryId: '1',
      image: 'https://example.com/img.jpg',
    };

    const errors = getProductFieldErrors(form);

    expect(errors).toHaveProperty('title');
  });

  it('should return error for whitespace-only title', () => {
    const form = {
      title: '   ',
      price: '100',
      description: 'Description',
      categoryId: '1',
      image: 'https://example.com/img.jpg',
    };

    const errors = getProductFieldErrors(form);

    expect(errors).toHaveProperty('title');
  });

  it('should return error for price of 0', () => {
    const form = {
      title: 'Product',
      price: '0',
      description: 'Description',
      categoryId: '1',
      image: 'https://example.com/img.jpg',
    };

    const errors = getProductFieldErrors(form);

    expect(errors).toHaveProperty('price');
  });

  it('should return error for negative price', () => {
    const form = {
      title: 'Product',
      price: '-10',
      description: 'Description',
      categoryId: '1',
      image: 'https://example.com/img.jpg',
    };

    const errors = getProductFieldErrors(form);

    expect(errors).toHaveProperty('price');
  });

  it('should return error for non-numeric price', () => {
    const form = {
      title: 'Product',
      price: 'abc',
      description: 'Description',
      categoryId: '1',
      image: 'https://example.com/img.jpg',
    };

    const errors = getProductFieldErrors(form);

    expect(errors).toHaveProperty('price');
  });

  it('should return error for empty description', () => {
    const form = {
      title: 'Product',
      price: '100',
      description: '',
      categoryId: '1',
      image: 'https://example.com/img.jpg',
    };

    const errors = getProductFieldErrors(form);

    expect(errors).toHaveProperty('description');
  });

  it('should return error for empty categoryId', () => {
    const form = {
      title: 'Product',
      price: '100',
      description: 'Description',
      categoryId: '',
      image: 'https://example.com/img.jpg',
    };

    const errors = getProductFieldErrors(form);

    expect(errors).toHaveProperty('categoryId');
  });

  it('should return error for invalid image URL', () => {
    const form = {
      title: 'Product',
      price: '100',
      description: 'Description',
      categoryId: '1',
      image: 'not-a-url',
    };

    const errors = getProductFieldErrors(form);

    expect(errors).toHaveProperty('image');
  });

  it('should return error for empty image URL', () => {
    const form = {
      title: 'Product',
      price: '100',
      description: 'Description',
      categoryId: '1',
      image: '',
    };

    const errors = getProductFieldErrors(form);

    expect(errors).toHaveProperty('image');
  });

  it('should return multiple errors for invalid form', () => {
    const form = {
      title: '',
      price: '0',
      description: '',
      categoryId: '',
      image: 'invalid',
    };

    const errors = getProductFieldErrors(form);

    expect(Object.keys(errors)).toHaveLength(5);
    expect(errors).toHaveProperty('title');
    expect(errors).toHaveProperty('price');
    expect(errors).toHaveProperty('description');
    expect(errors).toHaveProperty('categoryId');
    expect(errors).toHaveProperty('image');
  });
});
