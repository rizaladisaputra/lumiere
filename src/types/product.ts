export interface ProductImage {
  url: string;
  alt: string;
  aspect?: string;
  isEditorialMain?: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductDetails {
  sustainability?: string;
  care?: string;
  composition?: string;
  sku?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  collection: string;
  category: 'dresses' | 'outerwear' | 'accessories' | 'footwear' | 'tailoring';
  price: number; // in USD
  priceIdr: number; // in IDR
  material: string;
  origin: string;
  description: string;
  details: ProductDetails;
  sizes: string[];
  colors: ProductColor[];
  images: ProductImage[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isLimitedEdition?: boolean;
  layoutVariant?: 'wide-portrait' | 'square-detail' | 'tall-vertical' | 'wide-landscape' | 'small-detail' | 'editorial-frame';
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  imageUrl: string;
  itemCount: number;
}
