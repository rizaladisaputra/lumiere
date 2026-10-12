import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCartStore } from '../../stores/cart.store';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { wishlistIds } = useCartStore();

  const isHome = location.pathname === '/';
  const isShop = location.pathname.startsWith('/products');
  const isWishlist = location.pathname === '/wishlist';
  const isProfile = location.pathname === '/orders' || location.pathname === '/admin';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-nav h-20 border-t border-outline-variant/10 px-6 sm:hidden">
      <div className="grid grid-cols-4 h-full max-w-md mx-auto">
        <NavLink
          to="/"
          className={`flex flex-col items-center justify-center transition-colors ${
            isHome ? 'text-primary' : 'text-outline hover:text-primary'
          }`}
        >
          <span
            className="material-symbols-outlined text-2xl"
            data-icon="home"
            style={{ fontVariationSettings: isHome ? "'FILL' 1" : "'FILL' 0" }}
          >
            home
          </span>
          <span className="font-label text-[9px] mt-1 tracking-wider uppercase">Home</span>
        </NavLink>

        <NavLink
          to="/products"
          className={`flex flex-col items-center justify-center transition-colors ${
            isShop ? 'text-primary' : 'text-outline hover:text-primary'
          }`}
        >
          <span
            className="material-symbols-outlined text-2xl"
            data-icon="storefront"
            style={{ fontVariationSettings: isShop ? "'FILL' 1" : "'FILL' 0" }}
          >
            storefront
          </span>
          <span className="font-label text-[9px] mt-1 tracking-wider uppercase">Shop</span>
        </NavLink>

        <NavLink
          to="/wishlist"
          className={`relative flex flex-col items-center justify-center transition-colors ${
            isWishlist ? 'text-primary' : 'text-outline hover:text-primary'
          }`}
        >
          <span
            className="material-symbols-outlined text-2xl"
            data-icon="favorite"
            style={{ fontVariationSettings: isWishlist ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
          <span className="font-label text-[9px] mt-1 tracking-wider uppercase">Wishlist</span>
          {wishlistIds.length > 0 && (
            <span className="absolute top-2 right-5 w-1.5 h-1.5 rounded-full bg-primary" />
          )}
        </NavLink>

        <NavLink
          to="/orders"
          className={`flex flex-col items-center justify-center transition-colors ${
            isProfile ? 'text-primary' : 'text-outline hover:text-primary'
          }`}
        >
          <span
            className="material-symbols-outlined text-2xl"
            data-icon="person"
            style={{ fontVariationSettings: isProfile ? "'FILL' 1" : "'FILL' 0" }}
          >
            person
          </span>
          <span className="font-label text-[9px] mt-1 tracking-wider uppercase">Orders</span>
        </NavLink>
      </div>
    </nav>
  );
};
