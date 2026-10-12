import { describe, it, expect } from 'vitest';
import { productsService } from '../src/services/products.service';

describe('ProductsService Data Contracts', () => {
  it('retrieves all mock products by default', async () => {
    const products = await productsService.getProducts();
    expect(products.length).toBeGreaterThanOrEqual(10);
    expect(products.some((p) => p.title === 'Fluid Silk Slip Dress')).toBe(true);
  });

  it('filters products by category correctly', async () => {
    const outerwear = await productsService.getProducts({ category: 'outerwear' });
    expect(outerwear.length).toBeGreaterThan(0);
    expect(outerwear.every((p) => p.category === 'outerwear')).toBe(true);
  });

  it('retrieves single product by slug or id', async () => {
    const found = await productsService.getProductById('fluid-silk-slip-dress');
    expect(found).not.toBeNull();
    expect(found?.title).toBe('Fluid Silk Slip Dress');
    expect(found?.price).toBe(890);
  });

  it('returns categories matching Stitch design specifications', async () => {
    const categories = await productsService.getCategories();
    expect(categories.length).toBe(5);
    const slugs = categories.map((c) => c.slug);
    expect(slugs).toContain('dresses');
    expect(slugs).toContain('outerwear');
    expect(slugs).toContain('tailoring');
  });
});
