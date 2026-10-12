import { Address } from '../types/user';
import { CartItem } from '../types/cart';
import { ShippingMethod, Order } from '../types/order';
import { generateOrderNumber } from '../lib/utils';
import { cartService } from './cart.service';

export interface CheckoutPayload {
  customerName: string;
  customerEmail: string;
  shippingAddress: Address;
  shippingMethod: ShippingMethod;
  items: CartItem[];
  paymentMethod: string;
  currency: 'USD' | 'IDR';
}

export const AVAILABLE_SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'ship-complimentary',
    name: 'Curated White-Glove Express (Complimentary)',
    estimatedDelivery: '2-3 Business Days',
    price: 0,
    priceIdr: 0,
  },
  {
    id: 'ship-same-day',
    name: 'Private Courier Same-Day Delivery',
    estimatedDelivery: 'Within 24 Hours',
    price: 65,
    priceIdr: 1040000,
  },
];

class CheckoutService {
  async processSimulatedCheckout(payload: CheckoutPayload): Promise<Order> {
    // Artificial latency for simulation feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    const summary = cartService.calculateSummary(payload.items);
    const orderNumber = generateOrderNumber();

    const order: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      userId: 'user-cust-01',
      customerName: payload.customerName,
      customerEmail: payload.customerEmail,
      items: payload.items,
      shippingAddress: payload.shippingAddress,
      shippingMethod: payload.shippingMethod,
      subtotal: summary.subtotal,
      subtotalIdr: summary.subtotalIdr,
      shippingFee: payload.shippingMethod.price,
      shippingFeeIdr: payload.shippingMethod.priceIdr,
      discount: 0,
      discountIdr: 0,
      total: summary.subtotal + payload.shippingMethod.price,
      totalIdr: summary.subtotalIdr + payload.shippingMethod.priceIdr,
      currency: payload.currency,
      status: 'CONFIRMED',
      paymentStatus: 'SIMULATED_PAID',
      paymentMethod: payload.paymentMethod,
      createdAt: new Date().toISOString(),
      trackingNumber: `LUM-EXP-${Math.floor(1000000 + Math.random() * 9000000)}`,
    };

    return order;
  }
}

export const checkoutService = new CheckoutService();
