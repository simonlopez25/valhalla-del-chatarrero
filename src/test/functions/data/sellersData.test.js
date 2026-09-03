import { describe, it, expect } from 'vitest';
import { sellersData } from '../../../data/sellersData';

describe('sellersData', () => {
  it('should be an array', () => {
    expect(Array.isArray(sellersData)).toBe(true);
  });

  it('should contain 8 sellers', () => {
    expect(sellersData).toHaveLength(8);
  });

  it('should have all required fields for each seller', () => {
    sellersData.forEach((seller) => {
      expect(seller).toHaveProperty('id');
      expect(seller).toHaveProperty('name');
      expect(seller).toHaveProperty('role');
      expect(seller).toHaveProperty('description');
      expect(seller).toHaveProperty('status');
      expect(seller).toHaveProperty('statusIcon');
      expect(seller).toHaveProperty('imageSrc');
      expect(seller).toHaveProperty('imageAlt');
    });
  });

  it('should have unique IDs for each seller', () => {
    const ids = sellersData.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have non-empty string fields', () => {
    sellersData.forEach((seller) => {
      expect(typeof seller.id).toBe('string');
      expect(seller.id.length).toBeGreaterThan(0);
      expect(typeof seller.name).toBe('string');
      expect(seller.name.length).toBeGreaterThan(0);
      expect(typeof seller.role).toBe('string');
      expect(seller.role.length).toBeGreaterThan(0);
      expect(typeof seller.description).toBe('string');
      expect(seller.description.length).toBeGreaterThan(0);
      expect(typeof seller.status).toBe('string');
      expect(seller.status.length).toBeGreaterThan(0);
      expect(typeof seller.statusIcon).toBe('string');
      expect(seller.statusIcon.length).toBeGreaterThan(0);
      expect(typeof seller.imageAlt).toBe('string');
      expect(seller.imageAlt.length).toBeGreaterThan(0);
    });
  });

  it('should have valid image source imports', () => {
    sellersData.forEach((seller) => {
      expect(seller.imageSrc).toBeDefined();
      expect(seller.imageSrc).toBeTruthy();
    });
  });

  it('should contain expected seller names', () => {
    const names = sellersData.map((s) => s.name);
    expect(names).toContain('MARÍA JOSÉ');
    expect(names).toContain('PATRI');
    expect(names).toContain('SIMÓN');
    expect(names).toContain('BEA');
    expect(names).toContain('MARGARITA');
    expect(names).toContain('JOSÉ');
    expect(names).toContain('JHOJANN');
    expect(names).toContain('WILLFREDY');
  });

  it('should have status fields starting with "ESTADO:"', () => {
    sellersData.forEach((seller) => {
      expect(seller.status).toMatch(/^ESTADO:/);
    });
  });
});
