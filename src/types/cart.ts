import { Product } from './product';

export interface CartItem {
  id: string; // unique item id: product.id + size + color
  product: Product;
  selectedSize: string;
  selectedColor?: string;
  quantity: number;
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  subtotalIdr: number;
  estimatedShipping: number;
  estimatedShippingIdr: number;
  tax: number;
  total: number;
  totalIdr: number;
}
