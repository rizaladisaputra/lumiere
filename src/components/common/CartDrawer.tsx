import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../stores/cart.store';
import { formatCurrency } from '../../lib/format-currency';
import { Button } from '../ui/Button';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    removeItem,
    updateQuantity,
    currency,
    getSummary,
  } = useCartStore();
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const summary = getSummary();

  const handleCheckout = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCartDrawer}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-surface h-full shadow-2xl flex flex-col justify-between p-6 sm:p-8 z-10">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-outline-variant/20">
          <div>
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">
              Curated Bag
            </p>
            <h2 className="font-headline text-2xl">
              Selection ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={closeCartDrawer}
            className="p-2 text-outline hover:text-primary transition-colors"
            aria-label="Close Shopping Bag"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto py-6 divide-y divide-outline-variant/15 hide-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
              <span className="material-symbols-outlined text-5xl text-outline mb-4">
                shopping_bag
              </span>
              <h3 className="font-headline text-xl mb-2">Your Bag is Empty</h3>
              <p className="font-body text-xs text-outline mb-8 max-w-xs leading-relaxed">
                Explore our editorial pieces and discover modern monochromatic silhouettes.
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  closeCartDrawer();
                  navigate('/products');
                }}
              >
                Discover Collection
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-6 flex gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-24 bg-surface-dim overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.title}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline text-base leading-snug">{item.product.title}</h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-outline hover:text-error transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="font-label text-[10px] uppercase tracking-widest text-outline mt-1">
                      Size: {item.selectedSize} {item.selectedColor && `• ${item.selectedColor}`}
                    </p>
                    <p className="font-body text-sm font-medium mt-2">
                      {formatCurrency(
                        currency === 'USD' ? item.product.price : item.product.priceIdr,
                        currency
                      )}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-outline-variant/30">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-surface-container-low transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-label text-xs px-3">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-surface-container-low transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-label text-xs text-outline">
                      Subtotal:{' '}
                      {formatCurrency(
                        currency === 'USD'
                          ? item.product.price * item.quantity
                          : item.product.priceIdr * item.quantity,
                        currency
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="pt-6 border-t border-outline-variant/20 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-label text-outline uppercase tracking-wider">
                <span>Shipping</span>
                <span>Complimentary Express</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-label text-xs uppercase tracking-[0.2em]">Estimated Total</span>
                <span className="font-headline text-2xl">
                  {formatCurrency(currency === 'USD' ? summary.total : summary.totalIdr, currency)}
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              fullWidth
              onClick={handleCheckout}
              className="py-5 flex items-center justify-center gap-3"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <p className="text-center font-label text-[9px] text-outline uppercase tracking-widest">
              White-glove packaging • Complimentary returns
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
