import { Product, ProductCategory } from '../types/product';
import { MOCK_PRODUCTS } from '../mocks/products.mock';
import { MOCK_CATEGORIES } from '../mocks/categories.mock';
import { API_BASE_URL, USE_MOCK_DATA } from './api.config';

export interface ProductFilters {
  category?: string;
  size?: string;
  color?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}

class ProductsService {
  private products: Product[] = [...MOCK_PRODUCTS];
  private categories: ProductCategory[] = [...MOCK_CATEGORIES];

  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    if (!USE_MOCK_DATA) {
      const query = new URLSearchParams();
      if (filters?.category) query.append('category', filters.category);
      if (filters?.search) query.append('q', filters.search);
      const res = await fetch(`${API_BASE_URL}/products?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json();
    }

    // Filter deterministic mock data
    let result = [...this.products];

    if (filters?.category && filters.category !== 'all') {
      result = result.filter((p) => p.category.toLowerCase() === filters.category?.toLowerCase());
    }

    if (filters?.size && filters.size !== 'all' && filters.size !== 'ALL') {
      result = result.filter((p) => p.sizes.includes(filters.size!));
    }

    if (filters?.color && filters.color !== 'all' && filters.color !== 'ALL') {
      result = result.filter((p) =>
        p.colors.some((c) => c.name.toLowerCase() === filters.color?.toLowerCase())
      );
    }

    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
      );
    }

    if (filters?.sort) {
      if (filters.sort === 'price-asc') result.sort((a, b) => a.price - b.price);
      if (filters.sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    }

    return result;
  }

  async getProductById(id: string): Promise<Product | null> {
    if (!USE_MOCK_DATA) {
      const res = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!res.ok) return null;
      return await res.json();
    }
    return this.products.find((p) => p.id === id || p.slug === id) || null;
  }

  async getCategories(): Promise<ProductCategory[]> {
    if (!USE_MOCK_DATA) {
      const res = await fetch(`${API_BASE_URL}/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return await res.json();
    }
    return this.categories;
  }

  // Admin mutation methods
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Product not found');
    this.products[index] = { ...this.products[index], ...updates };
    return this.products[index];
  }

  async addProduct(newProduct: Omit<Product, 'id'>): Promise<Product> {
    const product: Product = {
      ...newProduct,
      id: `prod-${Date.now()}`,
    };
    this.products.unshift(product);
    return product;
  }
}

export const productsService = new ProductsService();
