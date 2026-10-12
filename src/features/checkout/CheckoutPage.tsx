import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../../stores/cart.store';
import { useAuthStore } from '../../stores/auth.store';
import {
  checkoutService,
  AVAILABLE_SHIPPING_METHODS,
} from '../../services/checkout.service';
import { ordersService } from '../../services/orders.service';
import { formatCurrency } from '../../lib/format-currency';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { items, clearCart, currency, getSummary } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const summary = getSummary();

  const [formData, setFormData] = useState({
    recipientName: user?.addresses[0]?.recipientName || user?.name || 'Elena Vance',
    email: user?.email || 'elena.vance@example.com',
    streetAddress: user?.addresses[0]?.streetAddress || 'Jl. Senopati No. 42',
    city: user?.addresses[0]?.city || 'Jakarta Selatan',
    stateOrProvince: user?.addresses[0]?.stateOrProvince || 'DKI Jakarta',
    postalCode: user?.addresses[0]?.postalCode || '12190',
    country: user?.addresses[0]?.country || 'Indonesia',
    phone: user?.addresses[0]?.phone || '+62 812-9988-7766',
  });

  const [selectedShipping, setSelectedShipping] = useState(AVAILABLE_SHIPPING_METHODS[0]);
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'VA_BCA' | 'QRIS'>('CARD');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-48 text-center px-6">
        <h2 className="font-headline text-3xl mb-4">Your Bag is Empty</h2>
        <p className="font-body text-sm text-outline mb-8">
          Add items to your selection before proceeding to checkout.
        </p>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Explore Collections
        </Button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const order = await checkoutService.processSimulatedCheckout({
        customerName: formData.recipientName,
        customerEmail: formData.email,
        shippingAddress: {
          id: `addr-${Date.now()}`,
          recipientName: formData.recipientName,
          streetAddress: formData.streetAddress,
          city: formData.city,
          stateOrProvince: formData.stateOrProvince,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        shippingMethod: selectedShipping,
        items,
        paymentMethod:
          paymentMethod === 'CARD'
            ? 'Test Credit Card (Simulated)'
            : paymentMethod === 'VA_BCA'
            ? 'BCA Virtual Account (Simulated)'
            : 'QRIS Luxury Direct (Simulated)',
        currency,
      });

      await ordersService.createOrder(order);
      clearCart();
      navigate(`/orders/${order.id}`);
    } catch {
      setError('An error occurred during checkout simulation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const finalTotal =
    currency === 'USD'
      ? summary.subtotal + selectedShipping.price
      : summary.subtotalIdr + selectedShipping.priceIdr;

  return (
    <div className="pt-24 pb-36 px-6 max-w-screen-xl mx-auto">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-outline hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </Link>
      </div>

      <header className="mb-12">
        <p className="font-label text-[0.6875rem] uppercase tracking-[0.2em] text-outline mb-2">
          Private Acquisition
        </p>
        <h1 className="font-headline text-4xl sm:text-5xl leading-tight">Checkout</h1>
      </header>

      {/* Test Mode Banner */}
      <div className="bg-surface-container-low border border-outline-variant/30 p-4 mb-10 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-xs font-body text-on-surface-variant">
          <span className="font-bold text-primary">SIMULATION MODE:</span> This checkout simulates
          a complete order transaction for testing and UI demonstration. No real financial charges
          will be incurred.
        </div>
      </div>

      {error && (
        <div className="bg-error-container text-error p-4 mb-6 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 space-y-12">
          {/* Section 1: Customer Contact & Shipping */}
          <section className="space-y-6">
            <h2 className="font-headline text-2xl border-b border-outline-variant/20 pb-3">
              1. Delivery Destination
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-2">
                  Recipient Full Name
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-surface-container-lowest border-b border-outline-variant py-3 px-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-surface-container-lowest border-b border-outline-variant py-3 px-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-surface-container-lowest border-b border-outline-variant py-3 px-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-2">
                  Street Address &amp; Suite
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-surface-container-lowest border-b border-outline-variant py-3 px-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-surface-container-lowest border-b border-outline-variant py-3 px-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-2">
                  State / Province
                </label>
                <input
                  type="text"
                  name="stateOrProvince"
                  value={formData.stateOrProvince}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-surface-container-lowest border-b border-outline-variant py-3 px-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-surface-container-lowest border-b border-outline-variant py-3 px-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-surface-container-lowest border-b border-outline-variant py-3 px-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Delivery Method */}
          <section className="space-y-6">
            <h2 className="font-headline text-2xl border-b border-outline-variant/20 pb-3">
              2. Curated Delivery
            </h2>

            <div className="space-y-3">
              {AVAILABLE_SHIPPING_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                    selectedShipping.id === method.id
                      ? 'border-primary bg-surface-container-lowest'
                      : 'border-outline-variant/30 hover:border-outline-variant'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={selectedShipping.id === method.id}
                      onChange={() => setSelectedShipping(method)}
                      className="accent-primary"
                    />
                    <div>
                      <p className="font-label text-xs font-bold uppercase">{method.name}</p>
                      <p className="font-body text-xs text-outline">{method.estimatedDelivery}</p>
                    </div>
                  </div>
                  <span className="font-label text-xs font-bold">
                    {method.price === 0
                      ? 'COMPLIMENTARY'
                      : formatCurrency(currency === 'USD' ? method.price : method.priceIdr, currency)}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Section 3: Payment Method (Simulation) */}
          <section className="space-y-6">
            <h2 className="font-headline text-2xl border-b border-outline-variant/20 pb-3">
              3. Payment Simulation
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                className={`p-4 border text-left font-label text-xs uppercase tracking-wider transition-all ${
                  paymentMethod === 'CARD'
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-outline-variant/30 bg-surface-container-lowest'
                }`}
              >
                Credit Card (Test)
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('VA_BCA')}
                className={`p-4 border text-left font-label text-xs uppercase tracking-wider transition-all ${
                  paymentMethod === 'VA_BCA'
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-outline-variant/30 bg-surface-container-lowest'
                }`}
              >
                BCA VA (Test)
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('QRIS')}
                className={`p-4 border text-left font-label text-xs uppercase tracking-wider transition-all ${
                  paymentMethod === 'QRIS'
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-outline-variant/30 bg-surface-container-lowest'
                }`}
              >
                QRIS Direct (Test)
              </button>
            </div>

            <div className="p-4 bg-surface-container-low text-xs text-on-surface-variant font-body">
              {paymentMethod === 'CARD' && (
                <p>Card Number: •••• •••• •••• 4242 (Simulated 3D-Secure Test Card)</p>
              )}
              {paymentMethod === 'VA_BCA' && (
                <p>Virtual Account: 8274 0918 2741 (Simulated Indonesian Bank Transfer)</p>
              )}
              {paymentMethod === 'QRIS' && (
                <p>QRIS Digital Payment Simulation: Auto-confirms upon submission.</p>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-surface-container-lowest p-8 border border-outline-variant/20 sticky top-28 space-y-6">
            <h3 className="font-headline text-2xl border-b border-outline-variant/20 pb-4">
              Order Summary
            </h3>

            {/* Line Items */}
            <div className="divide-y divide-outline-variant/15 max-h-80 overflow-y-auto hide-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <div className="w-16 h-20 bg-surface-dim overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]?.url}
                      alt={item.product.title}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-headline text-sm">{item.product.title}</h4>
                      <p className="font-label text-[10px] uppercase text-outline mt-0.5">
                        Size: {item.selectedSize} • Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-body text-xs font-semibold">
                      {formatCurrency(
                        currency === 'USD'
                          ? item.product.price * item.quantity
                          : item.product.priceIdr * item.quantity,
                        currency
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal Calculations */}
            <div className="space-y-3 pt-4 border-t border-outline-variant/20 text-xs font-label uppercase tracking-wider">
              <div className="flex justify-between text-outline">
                <span>Subtotal</span>
                <span className="font-body text-primary font-bold">
                  {formatCurrency(
                    currency === 'USD' ? summary.subtotal : summary.subtotalIdr,
                    currency
                  )}
                </span>
              </div>
              <div className="flex justify-between text-outline">
                <span>Delivery</span>
                <span className="font-body text-primary font-bold">
                  {selectedShipping.price === 0
                    ? 'Complimentary'
                    : formatCurrency(
                        currency === 'USD' ? selectedShipping.price : selectedShipping.priceIdr,
                        currency
                      )}
                </span>
              </div>
              <div className="flex justify-between text-base border-t border-outline-variant/20 pt-4">
                <span className="font-headline text-lg">Total</span>
                <span className="font-headline text-2xl text-primary">
                  {formatCurrency(finalTotal, currency, { showCents: true })}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting}
              className="py-6 text-xs uppercase tracking-[0.2em]"
            >
              {isSubmitting ? 'Simulating Acquisition...' : 'Confirm Order (Test Mode)'}
            </Button>

            <p className="text-center font-label text-[9px] uppercase tracking-widest text-outline">
              🔒 Authenticated SSL • Curated White-Glove Packaging
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
