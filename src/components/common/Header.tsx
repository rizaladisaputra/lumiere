import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cart.store';
import { useAuthStore } from '../../stores/auth.store';
import { NavigationDrawer } from './NavigationDrawer';

export const Header: React.FC = () => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const { items, wishlistIds, toggleCartDrawer, currency, toggleCurrency } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav h-16 flex items-center justify-between px-6 transition-all duration-300">
        {/* Left: Menu trigger */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsNavDrawerOpen(true)}
            className="p-2 -ml-2 text-on-surface hover:text-primary transition-colors focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl" data-icon="menu">
              menu
            </span>
          </button>

          {/* Desktop Quick Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-label uppercase tracking-widest text-outline">
            <Link to="/products" className="hover:text-primary transition-colors">
              Collections
            </Link>
            <Link to="/products?category=dresses" className="hover:text-primary transition-colors">
              Dresses
            </Link>
            <Link to="/products?category=outerwear" className="hover:text-primary transition-colors">
              Outerwear
            </Link>
            <Link to="/products?category=tailoring" className="hover:text-primary transition-colors">
              Tailoring
            </Link>
          </nav>
        </div>

        {/* Center: Brand Name */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <Link
            to="/"
            className="font-headline text-xl sm:text-2xl tracking-[0.3em] font-bold text-primary block"
          >
            LUMIERE
          </Link>
        </div>

        {/* Right: Currency Toggle + Wishlist + Cart Trigger */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Currency Toggle */}
          <button
            onClick={toggleCurrency}
            className="text-[10px] font-label uppercase tracking-widest px-2 py-1 border border-outline-variant/30 hover:border-primary transition-colors text-on-surface"
            title="Toggle Currency (USD / IDR)"
          >
            {currency}
          </button>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="relative p-2 text-on-surface hover:text-primary transition-colors"
            aria-label="View Wishlist"
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: wishlistIds.length > 0 ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
            {wishlistIds.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
            )}
          </Link>

          {/* Shopping Bag / Cart */}
          <button
            onClick={toggleCartDrawer}
            className="relative p-2 text-on-surface hover:text-primary transition-colors focus:outline-none"
            aria-label="Shopping Bag"
          >
            <span className="material-symbols-outlined text-xl" data-icon="shopping_bag">
              shopping_bag
            </span>
            {totalItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-on-primary text-[9px] font-label font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Admin badge if logged in as Admin */}
          {user?.role === 'ADMIN' && (
            <button
              onClick={() => navigate('/admin')}
              className="hidden sm:inline-block font-label text-[9px] tracking-widest uppercase bg-primary text-on-primary px-2 py-1"
            >
              Curator View
            </button>
          )}
        </div>
      </header>

      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={isNavDrawerOpen}
        onClose={() => setIsNavDrawerOpen(false)}
      />
    </>
  );
};
