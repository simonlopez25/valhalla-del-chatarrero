import { describe, it, expect } from 'vitest';
import {
  isValidImageUrl,
  resolveProductImage,
  productPrice,
} from '../../../services/productsService';

describe('productsService - isValidImageUrl', () => {
  it('should return true for valid image URLs', () => {
    expect(isValidImageUrl('https://example.com/image.jpg')).toBe(true);
    expect(isValidImageUrl('http://picsum.photos/600/600')).toBe(true);
  });

  it('should return false for placeholder image URLs', () => {
    expect(isValidImageUrl('https://placehold.co/600x600')).toBe(false);
    expect(isValidImageUrl('https://placeimg.com/600/600')).toBe(false);
    expect(isValidImageUrl('https://pravatar.cc/300')).toBe(false);
    expect(isValidImageUrl('https://api.escuelajs.co/api/v1/files/img.jpg')).toBe(false);
  });

  it('should return false for empty or non-string values', () => {
    expect(isValidImageUrl('')).toBe(false);
    expect(isValidImageUrl(null)).toBe(false);
    expect(isValidImageUrl(undefined)).toBe(false);
    expect(isValidImageUrl(123)).toBe(false);
  });

  it('should return false for whitespace-only strings', () => {
    expect(isValidImageUrl('   ')).toBe(false);
  });
});

describe('productsService - resolveProductImage', () => {
  it('should return the first valid image from product images array', () => {
    const product = {
      id: 1,
      images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    };
    expect(resolveProductImage(product)).toBe('https://example.com/image1.jpg');
  });

  it('should skip invalid image URLs and return the first valid one', () => {
    const product = {
      id: 1,
      images: ['https://placehold.co/600x600', 'https://example.com/valid.jpg'],
    };
    expect(resolveProductImage(product)).toBe('https://example.com/valid.jpg');
  });

  it('should return picsum fallback when no valid images exist', () => {
    const product = { id: 42, images: ['https://placehold.co/600x600'] };
    expect(resolveProductImage(product)).toBe('https://picsum.photos/seed/42/600/600');
  });

  it('should return picsum fallback when images array is empty', () => {
    const product = { id: 10, images: [] };
    expect(resolveProductImage(product)).toBe('https://picsum.photos/seed/10/600/600');
  });

  it('should handle JSON-stringified image arrays', () => {
    const product = {
      id: 1,
      images: ['["https://example.com/img1.jpg","https://example.com/img2.jpg"]'],
    };
    expect(resolveProductImage(product)).toBe('https://example.com/img1.jpg');
  });

  it('should handle product with no images property', () => {
    const product = { id: 5 };
    expect(resolveProductImage(product)).toBe('https://picsum.photos/seed/5/600/600');
  });

  it('should use "desconocido" for fallback when product has no id', () => {
    const product = { images: [] };
    expect(resolveProductImage(product)).toBe('https://picsum.photos/seed/desconocido/600/600');
  });
});

describe('productsService - productPrice', () => {
  it('should return the price as a number for valid products', () => {
    expect(productPrice({ price: 100 })).toBe(100);
    expect(productPrice({ price: '50' })).toBe(50);
    expect(productPrice({ price: 0.99 })).toBe(0.99);
  });

  it('should return 0 for products with price 0', () => {
    expect(productPrice({ price: 0 })).toBe(0);
  });

  it('should return 0 for products with negative price', () => {
    expect(productPrice({ price: -10 })).toBe(0);
  });

  it('should return 0 for products with non-numeric price', () => {
    expect(productPrice({ price: 'free' })).toBe(0);
    expect(productPrice({ price: null })).toBe(0);
    expect(productPrice({ price: undefined })).toBe(0);
  });

  it('should return 0 for products with no price property', () => {
    expect(productPrice({})).toBe(0);
    expect(productPrice(null)).toBe(0);
    expect(productPrice(undefined)).toBe(0);
  });
});
