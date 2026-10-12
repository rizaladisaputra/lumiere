import { describe, it, expect } from 'vitest';
import { cartService } from '../src/services/cart.service';
import { CartItem } from '../src/types/cart';
import { MOCK_PRODUCTS } from '../src/mocks/products.mock';
import { formatCurrency, convertUsdToIdr } from '../src/lib/format-currency';

describe('CartService & Currency Calculations', () => {
  const item1: CartItem = {
    id: 'test-1',
    product: MOCK_PRODUCTS[0], // $890
    selectedSize: 'S',
    quantity: 2,
  };

  const item2: CartItem = {
    id: 'test-2',
    product: MOCK_PRODUCTS[2], // $480
    selectedSize: 'M',
    quantity: 1,
  };

  it('calculates total item count and subtotals accurately', () => {
    const summary = cartService.calculateSummary([item1, item2]);
    expect(summary.itemCount).toBe(3);
    expect(summary.subtotal).toBe(890 * 2 + 480);
    // Over $500 orders have complimentary express shipping
    expect(summary.estimatedShipping).toBe(0);
    expect(summary.total).toBe(890 * 2 + 480);
  });

  it('correctly converts USD to Indonesian Rupiah', () => {
    const usd = 100;
    const idr = convertUsdToIdr(usd);
    expect(idr).toBe(1600000);
    expect(formatCurrency(idr, 'IDR')).toContain('1.600.000');
  });

  it('formats USD currency correctly', () => {
    expect(formatCurrency(1240, 'USD')).toBe('$1,240');
  });
});
