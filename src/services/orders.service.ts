import { Order, OrderStatus } from '../types/order';
import { MOCK_ORDERS } from '../mocks/orders.mock';
import { API_BASE_URL, USE_MOCK_DATA } from './api.config';

class OrdersService {
  private orders: Order[] = [...MOCK_ORDERS];

  async getOrders(): Promise<Order[]> {
    if (!USE_MOCK_DATA) {
      const res = await fetch(`${API_BASE_URL}/orders`);
      if (!res.ok) throw new Error('Failed to fetch orders');
      return await res.json();
    }
    return this.orders;
  }

  async getOrderById(id: string): Promise<Order | null> {
    if (!USE_MOCK_DATA) {
      const res = await fetch(`${API_BASE_URL}/orders/${id}`);
      if (!res.ok) return null;
      return await res.json();
    }
    return this.orders.find((o) => o.id === id || o.orderNumber === id) || null;
  }

  async createOrder(order: Order): Promise<Order> {
    if (!USE_MOCK_DATA) {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (!res.ok) throw new Error('Failed to create order');
      return await res.json();
    }
    this.orders.unshift(order);
    return order;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) throw new Error('Order not found');
    order.status = status;
    return order;
  }
}

export const ordersService = new OrdersService();
