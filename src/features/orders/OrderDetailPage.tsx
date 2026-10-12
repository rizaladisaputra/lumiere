import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ordersService } from '../../services/orders.service';
import { Order } from '../../types/order';
import { useCartStore } from '../../stores/cart.store';
import { formatCurrency } from '../../lib/format-currency';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { currency } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const found = await ordersService.getOrderById(id);
        setOrder(found);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-48 text-center">
        <p className="font-label text-xs uppercase tracking-widest text-outline animate-pulse">
          Retrieving order details...
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-32 pb-48 text-center px-6">
        <h2 className="font-headline text-3xl mb-4">Order Not Found</h2>
        <p className="font-body text-sm text-outline mb-8">
          The requested order reference could not be located.
        </p>
        <Button variant="primary" onClick={() => navigate('/orders')}>
          Return to Order History
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-36 px-6 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-outline hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Orders</span>
        </Link>
      </div>

      <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <p className="font-label text-[0.6875rem] uppercase tracking-[0.2em] text-outline mb-2">
            Acquisition Confirmation
          </p>
          <h1 className="font-headline text-4xl sm:text-5xl leading-tight">
            Order {order.orderNumber}
          </h1>
          <p className="font-body text-xs text-outline mt-2">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-label text-xs uppercase tracking-widest px-4 py-2 bg-primary text-on-primary">
            Status: {order.status}
          </span>
        </div>
      </header>

      {/* Simulated Notice Banner */}
      <div className="bg-surface-container-low border border-outline-variant/30 p-4 mb-10 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-xs font-body text-on-surface-variant">
          <span className="font-bold text-primary">SIMULATION DEMONSTRATION:</span> This order was
          created inside the local deterministic mock state. It demonstrates responsive state
          persistence and data contract readiness for future Spring Boot REST API services.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Order Items & Delivery Details */}
        <div className="lg:col-span-8 space-y-12">
          {/* Purchased Pieces */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 p-8 sm:p-10 space-y-6">
            <h2 className="font-headline text-2xl border-b border-outline-variant/15 pb-4">
              Acquired Pieces ({order.items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>

            <div className="divide-y divide-outline-variant/15">
              {order.items.map((item) => (
                <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-24 h-32 bg-surface-dim overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]?.url}
                      alt={item.product.title}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between h-full space-y-2">
                    <div>
                      <h3 className="font-headline text-xl">{item.product.title}</h3>
                      <p className="font-label text-xs uppercase tracking-widest text-outline mt-1">
                        {item.product.material}
                      </p>
                      <p className="font-body text-xs text-on-surface-variant mt-1">
                        Size: <span className="font-bold">{item.selectedSize}</span> • Quantity:{' '}
                        <span className="font-bold">{item.quantity}</span>
                      </p>
                    </div>

                    <p className="font-body text-sm font-semibold">
                      Price:{' '}
                      {formatCurrency(
                        currency === 'USD' ? item.product.price : item.product.priceIdr,
                        currency
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Delivery & Tracking */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 p-8 sm:p-10 space-y-6">
            <h2 className="font-headline text-2xl border-b border-outline-variant/15 pb-4">
              Tracking &amp; Courier Logistics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-body">
              <div>
                <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-2">
                  Destination Address
                </p>
                <p className="font-bold">{order.shippingAddress.recipientName}</p>
                <p>{order.shippingAddress.streetAddress}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.stateOrProvince}{' '}
                  {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-2 text-outline">Phone: {order.shippingAddress.phone}</p>
              </div>

              <div>
                <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-2">
                  Dispatch Method
                </p>
                <p className="font-bold">{order.shippingMethod.name}</p>
                <p className="text-outline">{order.shippingMethod.estimatedDelivery}</p>
                <div className="mt-4 pt-4 border-t border-outline-variant/20">
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">
                    Airway Bill / Tracking Number
                  </p>
                  <p className="font-mono text-sm font-bold">{order.trackingNumber}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Financial Summary */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-lowest border border-outline-variant/20 p-8 sticky top-28 space-y-6">
            <h3 className="font-headline text-2xl border-b border-outline-variant/15 pb-4">
              Receipt Summary
            </h3>

            <div className="space-y-3 text-xs font-label uppercase tracking-wider">
              <div className="flex justify-between text-outline">
                <span>Subtotal</span>
                <span className="font-body text-primary font-bold">
                  {formatCurrency(
                    currency === 'USD' ? order.subtotal : order.subtotalIdr,
                    currency
                  )}
                </span>
              </div>

              <div className="flex justify-between text-outline">
                <span>Courier Express</span>
                <span className="font-body text-primary font-bold">
                  {order.shippingFee === 0
                    ? 'Complimentary'
                    : formatCurrency(
                        currency === 'USD' ? order.shippingFee : order.shippingFeeIdr,
                        currency
                      )}
                </span>
              </div>

              <div className="flex justify-between text-outline">
                <span>Payment Method</span>
                <span className="font-body text-primary font-bold">{order.paymentMethod}</span>
              </div>

              <div className="flex justify-between text-base border-t border-outline-variant/20 pt-4">
                <span className="font-headline text-lg">Total</span>
                <span className="font-headline text-2xl text-primary font-bold">
                  {formatCurrency(
                    currency === 'USD' ? order.total : order.totalIdr,
                    currency,
                    { showCents: true }
                  )}
                </span>
              </div>
            </div>

            <Button
              variant="secondary"
              fullWidth
              onClick={() => navigate('/products')}
              className="py-4 text-xs"
            >
              Continue Exploring
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
