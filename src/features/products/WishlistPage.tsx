import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsService } from '../../services/products.service';
import { Product } from '../../types/product';
import { useCartStore } from '../../stores/cart.store';
import { formatCurrency } from '../../lib/format-currency';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/utils';

export const WishlistPage: React.FC = () => {
  const { wishlistIds, removeFromWishlist, moveToCartFromWishlist, currency } = useCartStore();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const all = await productsService.getProducts();
        const saved = all.filter((p) => wishlistIds.includes(p.id));
        setWishlistProducts(saved);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [wishlistIds]);

  return (
    <div className="pt-24 pb-36 px-6 max-w-screen-xl mx-auto">
      {/* Header Section */}
      <header className="mb-16">
        <p className="font-label text-[0.6875rem] uppercase tracking-[0.2em] text-outline mb-4">
          Curated Selection
        </p>
        <h1 className="font-headline text-5xl md:text-6xl italic leading-tight">Wishlist</h1>
      </header>

      {loading ? (
        <div className="py-24 text-center">
          <p className="font-label text-xs uppercase tracking-widest text-outline animate-pulse">
            Loading your curated selections...
          </p>
        </div>
      ) : wishlistProducts.length === 0 ? (
        <div className="py-24 text-center border-t border-outline-variant/15">
          <span className="material-symbols-outlined text-6xl text-outline mb-4">favorite</span>
          <h2 className="font-headline text-3xl mb-4">Your Wishlist is Empty</h2>
          <p className="font-body text-sm text-outline mb-8 max-w-md mx-auto leading-relaxed">
            You haven&apos;t saved any atelier pieces yet. Browse our collections and save pieces to curate your private lookbook.
          </p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Explore Collections
          </Button>
        </div>
      ) : (
        <>
          {/* Wishlist Grid: Asymmetric Layout from Stitch */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12">
            {wishlistProducts.map((product, idx) => {
              // Asymmetric grid layout mapping
              let layoutCol = 'md:col-span-6';
              let extraClasses = '';
              let aspectClass = 'aspect-square';

              if (idx === 0) {
                layoutCol = 'md:col-span-7';
                aspectClass = 'aspect-square';
              } else if (idx === 1) {
                layoutCol = 'md:col-start-9 md:col-span-4 mt-8 md:mt-12';
                aspectClass = 'aspect-square';
              } else if (idx === 2) {
                layoutCol = 'md:col-span-5 md:mt-[-4rem]';
                aspectClass = 'aspect-[4/5]';
              } else if (idx === 3) {
                layoutCol = 'md:col-start-7 md:col-span-6';
                aspectClass = 'aspect-square';
              }

              return (
                <div key={product.id} className={cn('group', layoutCol, extraClasses)}>
                  {/* Image Card */}
                  <div className={cn('relative overflow-hidden bg-surface-dim mb-8', aspectClass)}>
                    <img
                      src={product.images[0]?.url}
                      alt={product.title}
                      className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                      onClick={() => navigate(`/products/${product.slug}`)}
                    />
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 bg-surface-container-lowest/80 backdrop-blur-sm hover:bg-surface-container-lowest transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <span className="material-symbols-outlined text-lg leading-none">close</span>
                    </button>
                  </div>

                  {/* Info & Actions */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="space-y-1">
                      <h3
                        className="font-headline text-2xl cursor-pointer hover:underline"
                        onClick={() => navigate(`/products/${product.slug}`)}
                      >
                        {product.title}
                      </h3>
                      <p className="font-label text-sm uppercase tracking-widest text-on-surface-variant">
                        {product.subtitle || product.collection}
                      </p>
                      <p className="text-lg mt-3 font-light">
                        {formatCurrency(
                          currency === 'USD' ? product.price : product.priceIdr,
                          currency
                        )}
                      </p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-4 w-full sm:w-auto">
                      <button
                        onClick={() => moveToCartFromWishlist(product)}
                        className="w-full sm:w-auto bg-primary text-on-primary px-8 py-4 font-label text-xs uppercase tracking-widest transition-colors hover:bg-primary-container text-center"
                      >
                        Move to Bag
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="editorial-underline font-label text-[0.6875rem] uppercase tracking-widest text-outline hover:text-primary transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Context from Stitch */}
          <div className="mt-32 border-t border-outline-variant/15 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="font-label text-xs uppercase tracking-[0.3em] text-outline">
              Viewing {wishlistProducts.length} of {wishlistProducts.length} items
            </p>
            <button
              onClick={() => navigate('/products')}
              className="editorial-underline font-label text-sm uppercase tracking-widest py-2"
            >
              Explore More Pieces
            </button>
          </div>
        </>
      )}
    </div>
  );
};
