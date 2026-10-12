import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';
import { CartItem, CartSummary } from '../types/cart';
import { cartService } from '../services/cart.service';

interface CartState {
  items: CartItem[];
  wishlistIds: string[];
  isCartDrawerOpen: boolean;
  currency: 'USD' | 'IDR';
  setCurrency: (currency: 'USD' | 'IDR') => void;
  toggleCurrency: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  addItem: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getSummary: () => CartSummary;

  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product, size?: string) => void;
  removeFromWishlist: (productId: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        // Seed initial cart item for rich demo experience
        {
          id: 'prod-fluid-silk-slip-dress-S-Noir',
          product: {
            id: 'prod-fluid-silk-slip-dress',
            slug: 'fluid-silk-slip-dress',
            title: 'Fluid Silk Slip Dress',
            subtitle: 'Collection № 04',
            collection: "Collection 004 / L'Essence",
            category: 'dresses',
            price: 890,
            priceIdr: 14240000,
            material: '100% Mulberry Silk',
            origin: 'Milan, Italy',
            description: 'A masterclass in minimalist draping.',
            details: { sku: 'LUM-SS24-DR01' },
            sizes: ['XS', 'S', 'M', 'L'],
            colors: [{ name: 'Noir', hex: '#000000' }],
            images: [
              {
                url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPeOLVpYX8AArLWueEhfJVXNpbQaz7kstoCrEOxqvSOtHitciOf7rh0XTkmGBfng81LbBwyNI8nN6Uwjeigmj54y6GXi7lVrideJOLvJooqBZC8YT6oOzO5KfxGa0IlW3mL_sKfrR-lvZwvaiDEJDWDVNxvm-i3u4sTWnARr31MgbskTWV580j6jkuSF4sfoVgHt2w7pyK3gBg5mOwinrDZYriuNtOI3J3N-1_Gnk2qZ3v07OWrSdrGFvceJeL6SPVjAIau24uRzw',
                alt: 'Fluid Silk Slip Dress',
              },
            ],
            inStock: true,
            stockCount: 8,
          },
          selectedSize: 'S',
          selectedColor: 'Noir',
          quantity: 1,
        },
      ],
      wishlistIds: [
        'prod-sculpted-silk-gown',
        'prod-archive-clutch',
        'prod-structured-blazer',
        'prod-lumiere-trench',
      ],
      isCartDrawerOpen: false,
      currency: 'USD',

      setCurrency: (currency) => set({ currency }),
      toggleCurrency: () =>
        set((state) => ({ currency: state.currency === 'USD' ? 'IDR' : 'USD' })),

      openCartDrawer: () => set({ isCartDrawerOpen: true }),
      closeCartDrawer: () => set({ isCartDrawerOpen: false }),
      toggleCartDrawer: () =>
        set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),

      addItem: (product, size, color, quantity = 1) => {
        const selectedSize = size || product.sizes[0] || 'Standard';
        const selectedColor = color || product.colors[0]?.name || 'Noir';
        const itemId = `${product.id}-${selectedSize}-${selectedColor}`;

        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === itemId);
          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            return { items: updated, isCartDrawerOpen: true };
          }
          return {
            items: [
              ...state.items,
              {
                id: itemId,
                product,
                selectedSize,
                selectedColor,
                quantity,
              },
            ],
            isCartDrawerOpen: true,
          };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSummary: () => cartService.calculateSummary(get().items),

      toggleWishlist: (productId) => {
        set((state) => {
          const exists = state.wishlistIds.includes(productId);
          return {
            wishlistIds: exists
              ? state.wishlistIds.filter((id) => id !== productId)
              : [...state.wishlistIds, productId],
          };
        });
      },

      isInWishlist: (productId) => get().wishlistIds.includes(productId),

      moveToCartFromWishlist: (product, size) => {
        get().addItem(product, size);
        get().removeFromWishlist(product.id);
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlistIds: state.wishlistIds.filter((id) => id !== productId),
        }));
      },
    }),
    {
      name: 'lumiere-cart-storage',
      partialize: (state) => ({
        items: state.items,
        wishlistIds: state.wishlistIds,
        currency: state.currency,
      }),
    }
  )
);
