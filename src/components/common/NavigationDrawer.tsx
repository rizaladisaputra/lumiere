import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, ShoppingBag, Heart, Shield } from 'lucide-react';
import { useAuthStore } from '../../stores/auth.store';
import { useCartStore } from '../../stores/cart.store';

export interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isOpen, onClose }) => {
  const { user, switchRole } = useAuthStore();
  const { currency, setCurrency } = useCartStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-surface h-full shadow-2xl flex flex-col justify-between p-8 sm:p-12 z-10 overflow-y-auto">
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-8 border-b border-outline-variant/20">
            <h2 className="font-headline text-2xl tracking-[0.2em] font-bold">LUMIERE</h2>
            <button
              onClick={onClose}
              className="p-2 text-outline hover:text-primary transition-colors"
              aria-label="Close Navigation"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Issue Tag */}
          <div className="py-6">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-outline">
              Issue No. 04 — Essentialism
            </p>
          </div>

          {/* Primary Navigation Links */}
          <nav className="flex flex-col space-y-6 pt-2">
            <button
              onClick={() => handleNav('/')}
              className="flex items-center justify-between font-headline text-3xl sm:text-4xl text-left hover:translate-x-2 transition-transform duration-200"
            >
              <span>Lookbook</span>
              <ChevronRight className="w-5 h-5 text-outline" />
            </button>

            <button
              onClick={() => handleNav('/products')}
              className="flex items-center justify-between font-headline text-3xl sm:text-4xl text-left hover:translate-x-2 transition-transform duration-200"
            >
              <span>All Collections</span>
              <ChevronRight className="w-5 h-5 text-outline" />
            </button>

            <div className="pl-4 flex flex-col space-y-3 pt-2 pb-4 border-l border-outline-variant/30">
              <button
                onClick={() => handleNav('/products?category=dresses')}
                className="font-label text-xs uppercase tracking-widest text-outline hover:text-primary text-left"
              >
                Dresses
              </button>
              <button
                onClick={() => handleNav('/products?category=outerwear')}
                className="font-label text-xs uppercase tracking-widest text-outline hover:text-primary text-left"
              >
                Outerwear
              </button>
              <button
                onClick={() => handleNav('/products?category=tailoring')}
                className="font-label text-xs uppercase tracking-widest text-outline hover:text-primary text-left"
              >
                Tailoring
              </button>
              <button
                onClick={() => handleNav('/products?category=accessories')}
                className="font-label text-xs uppercase tracking-widest text-outline hover:text-primary text-left"
              >
                Accessories
              </button>
              <button
                onClick={() => handleNav('/products?category=footwear')}
                className="font-label text-xs uppercase tracking-widest text-outline hover:text-primary text-left"
              >
                Footwear
              </button>
            </div>

            <button
              onClick={() => handleNav('/wishlist')}
              className="flex items-center justify-between font-headline text-2xl text-left hover:translate-x-2 transition-transform duration-200"
            >
              <span className="flex items-center gap-3">
                <Heart className="w-4 h-4 stroke-[1.5]" />
                Wishlist
              </span>
            </button>

            <button
              onClick={() => handleNav('/orders')}
              className="flex items-center justify-between font-headline text-2xl text-left hover:translate-x-2 transition-transform duration-200"
            >
              <span className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                Order History
              </span>
            </button>

            <button
              onClick={() => handleNav('/admin')}
              className="flex items-center justify-between font-headline text-2xl text-left hover:translate-x-2 transition-transform duration-200"
            >
              <span className="flex items-center gap-3 text-secondary">
                <Shield className="w-4 h-4 stroke-[1.5]" />
                Curator Admin
              </span>
            </button>
          </nav>
        </div>

        {/* Footer info & Account controls */}
        <div className="pt-8 border-t border-outline-variant/20 space-y-6">
          {/* Currency Switcher */}
          <div className="flex items-center justify-between font-label text-xs">
            <span className="uppercase tracking-widest text-outline">Currency</span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 uppercase tracking-wider ${
                  currency === 'USD' ? 'bg-primary text-on-primary' : 'border border-outline-variant/40'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('IDR')}
                className={`px-3 py-1 uppercase tracking-wider ${
                  currency === 'IDR' ? 'bg-primary text-on-primary' : 'border border-outline-variant/40'
                }`}
              >
                IDR (Rp)
              </button>
            </div>
          </div>

          {/* User profile toggle */}
          <div className="bg-surface-container-low p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label text-xs font-bold">
                {user ? user.name[0] : 'G'}
              </div>
              <div>
                <p className="font-label text-xs font-bold">{user ? user.name : 'Guest'}</p>
                <p className="font-label text-[10px] text-outline uppercase tracking-wider">
                  {user ? user.role : 'Guest'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => switchRole(user?.role === 'ADMIN' ? 'CUSTOMER' : 'ADMIN')}
                className="font-label text-[9px] uppercase tracking-wider underline text-outline hover:text-primary"
                title="Switch demo persona"
              >
                {user?.role === 'ADMIN' ? 'Be Customer' : 'Be Admin'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
