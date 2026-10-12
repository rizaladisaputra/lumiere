import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ordersService } from '../../services/orders.service';
import { Order } from '../../types/order';
import { useCartStore } from '../../stores/cart.store';
import { formatCurrency } from '../../lib/format-currency';
import { Button } from '../../components/ui/Button';
import { Package, ArrowRight, Clock } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { currency } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await ordersService.getOrders();
        setOrders(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="pt-24 pb-36 px-6 max-w-screen-xl mx-auto">
      <header className="mb-16">
        <p className="font-label text-[0.6875rem] uppercase tracking-[0.2em] text-outline mb-2">
          Private Client Records
        </p>
        <h1 className="font-headline text-5xl md:text-6xl italic leading-tight">Order History</h1>
      </header>

      {loading ? (
        <div className="py-24 text-center">
          <p className="font-label text-xs uppercase tracking-widest text-outline animate-pulse">
            Retrieving client acquisitions...
          </p>
        </div>
      ) : orders.length === 0 ? (
        <div className="py-24 text-center border-t border-outline-variant/15">
          <Package className="w-12 h-12 stroke-[1] text-outline mx-auto mb-4" />
          <h2 className="font-headline text-3xl mb-4">No Acquisitions on Record</h2>
          <p className="font-body text-sm text-outline mb-8 max-w-md mx-auto">
            You do not have any orders recorded yet. Explore our latest seasonal lookbook.
          </p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Explore Collections
          </Button>
        </div>
      ) : (
        <div className="space-y-12">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-surface-container-lowest border border-outline-variant/20 p-6 sm:p-10 transition-all hover:border-primary/40"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-outline-variant/15 gap-4">
                <div>
                  <span className="font-label text-[10px] uppercase tracking-widest text-outline">
                    Order Reference
                  </span>
                  <h3 className="font-headline text-2xl">{order.orderNumber}</h3>
                  <p className="font-body text-xs text-outline mt-1">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`font-label text-[10px] uppercase tracking-widest px-3 py-1 ${
                      order.status === 'DELIVERED'
                        ? 'bg-surface-container-high text-primary font-bold'
                        : 'bg-primary text-on-primary'
                    }`}
                  >
                    {order.status}
                  </span>

                  <Link
                    to={`/orders/${order.id}`}
                    className="flex items-center gap-1 font-label text-xs uppercase tracking-wider text-primary border-b border-primary pb-0.5 hover:opacity-70 transition-opacity"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Items Preview */}
              <div className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-20 bg-surface-dim overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]?.url}
                        alt={item.product.title}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                    <div>
                      <h4 className="font-headline text-sm">{item.product.title}</h4>
                      <p className="font-label text-[10px] text-outline uppercase tracking-wider mt-1">
                        Size: {item.selectedSize} • Qty: {item.quantity}
                      </p>
                      <p className="font-body text-xs font-medium mt-1">
                        {formatCurrency(
                          currency === 'USD' ? item.product.price : item.product.priceIdr,
                          currency
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total & Tracking Info */}
              <div className="pt-6 border-t border-outline-variant/15 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-4">
                <div className="flex items-center gap-2 text-outline">
                  <Clock className="w-4 h-4" />
                  <span>
                    Tracking: <span className="font-mono text-primary">{order.trackingNumber || 'Processing'}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-label text-[10px] uppercase tracking-widest text-outline">
                    Total Acquisition:
                  </span>
                  <span className="font-headline text-xl font-bold">
                    {formatCurrency(
                      currency === 'USD' ? order.total : order.totalIdr,
                      currency
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
