import { CartItem, CartSummary } from '../types/cart';
import { convertUsdToIdr } from '../lib/format-currency';

class CartService {
  calculateSummary(items: CartItem[]): CartSummary {
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const subtotalIdr = items.reduce((acc, item) => acc + item.product.priceIdr * item.quantity, 0);

    // Curated orders over $500 enjoy complimentary express white-glove shipping
    const estimatedShipping = subtotal > 500 || subtotal === 0 ? 0 : 45;
    const estimatedShippingIdr = estimatedShipping > 0 ? convertUsdToIdr(estimatedShipping) : 0;
    const tax = 0; // Editorial pricing includes luxury duty

    return {
      itemCount,
      subtotal,
      subtotalIdr,
      estimatedShipping,
      estimatedShippingIdr,
      tax,
      total: subtotal + estimatedShipping + tax,
      totalIdr: subtotalIdr + estimatedShippingIdr,
    };
  }
}

export const cartService = new CartService();
