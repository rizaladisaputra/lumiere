import { Address } from './user';
import { CartItem } from './cart';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
export type PaymentStatus = 'UNPAID' | 'SIMULATED_PAID' | 'FAILED';

export interface ShippingMethod {
  id: string;
  name: string;
  estimatedDelivery: string;
  price: number;
  priceIdr: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  shippingAddress: Address;
  shippingMethod: ShippingMethod;
  subtotal: number;
  subtotalIdr: number;
  shippingFee: number;
  shippingFeeIdr: number;
  discount: number;
  discountIdr: number;
  total: number;
  totalIdr: number;
  currency: 'USD' | 'IDR';
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  createdAt: string;
  trackingNumber?: string;
}
