import { Order } from '../types/order';
import { MOCK_PRODUCTS } from './products.mock';
import { MOCK_USERS } from './users.mock';
import { convertUsdToIdr } from '../lib/format-currency';

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'LUM-2024-8842',
    userId: MOCK_USERS[0].id,
    customerName: MOCK_USERS[0].name,
    customerEmail: MOCK_USERS[0].email,
    items: [
      {
        id: 'ord-item-01',
        product: MOCK_PRODUCTS[0], // Fluid Silk Slip Dress
        selectedSize: 'S',
        selectedColor: 'Noir',
        quantity: 1,
      },
      {
        id: 'ord-item-02',
        product: MOCK_PRODUCTS[8], // Vault Clutch
        selectedSize: 'ONE SIZE',
        selectedColor: 'Noir',
        quantity: 1,
      },
    ],
    shippingAddress: MOCK_USERS[0].addresses[0],
    shippingMethod: {
      id: 'ship-express',
      name: 'Curated White-Glove Express',
      estimatedDelivery: '2-3 Business Days',
      price: 0,
      priceIdr: 0,
    },
    subtotal: 2140,
    subtotalIdr: convertUsdToIdr(2140),
    shippingFee: 0,
    shippingFeeIdr: 0,
    discount: 0,
    discountIdr: 0,
    total: 2140,
    totalIdr: convertUsdToIdr(2140),
    currency: 'USD',
    status: 'DELIVERED',
    paymentStatus: 'SIMULATED_PAID',
    paymentMethod: 'Test Card (Ending in 4242)',
    createdAt: '2026-09-28T14:20:00Z',
    trackingNumber: 'LUM-EXP-9921471',
  },
  {
    id: 'ord-002',
    orderNumber: 'LUM-2024-9104',
    userId: MOCK_USERS[0].id,
    customerName: MOCK_USERS[0].name,
    customerEmail: MOCK_USERS[0].email,
    items: [
      {
        id: 'ord-item-03',
        product: MOCK_PRODUCTS[1], // The Archival Trench
        selectedSize: 'M',
        selectedColor: 'Obsidian',
        quantity: 1,
      },
    ],
    shippingAddress: MOCK_USERS[0].addresses[0],
    shippingMethod: {
      id: 'ship-express',
      name: 'Curated White-Glove Express',
      estimatedDelivery: '1-2 Business Days',
      price: 0,
      priceIdr: 0,
    },
    subtotal: 1240,
    subtotalIdr: convertUsdToIdr(1240),
    shippingFee: 0,
    shippingFeeIdr: 0,
    discount: 0,
    discountIdr: 0,
    total: 1240,
    totalIdr: convertUsdToIdr(1240),
    currency: 'USD',
    status: 'SHIPPED',
    paymentStatus: 'SIMULATED_PAID',
    paymentMethod: 'Bank Transfer (BCA Virtual Account)',
    createdAt: '2026-10-10T09:15:00Z',
    trackingNumber: 'LUM-EXP-1102948',
  },
];
