import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { productsService } from '../../services/products.service';
import { Product } from '../../types/product';
import { useCartStore } from '../../stores/cart.store';
import { formatCurrency } from '../../lib/format-currency';
import { cn } from '../../lib/utils';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { wishlistIds, toggleWishlist, currency } = useCartStore();

  const activeCategory = searchParams.get('category') || 'all';
  const activeSize = searchParams.get('size') || 'ALL';
  const activeFabric = searchParams.get('fabric') || 'ALL';

  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await productsService.getProducts({
          category: activeCategory !== 'all' ? activeCategory : undefined,
          size: activeSize !== 'ALL' ? activeSize : undefined,
        });

        let filtered = data;
        if (activeFabric !== 'ALL') {
          filtered = data.filter((p) =>
            p.material.toLowerCase().includes(activeFabric.toLowerCase())
          );
        }

        setProducts(filtered);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [activeCategory, activeSize, activeFabric]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all' || value === 'ALL') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  return (
    <div className="pt-24 pb-36 max-w-screen-xl mx-auto px-6">
      {/* Editorial Header */}
      <section className="mb-16">
        <p className="font-label text-[0.6875rem] uppercase tracking-[0.2rem] text-outline mb-4">
          Collection 004 / L&apos;Essence
        </p>
        <h2 className="font-headline text-5xl md:text-7xl max-w-3xl leading-tight">
          Quiet Elegance in Monochrome.
        </h2>
      </section>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar pb-6 mb-12 border-b border-outline-variant/15 text-xs font-label uppercase tracking-widest">
        <button
          onClick={() => updateParam('category', 'all')}
          className={cn(
            'pb-2 transition-colors cursor-pointer',
            activeCategory === 'all' ? 'text-primary border-b-2 border-primary font-bold' : 'text-outline hover:text-primary'
          )}
        >
          All Items ({products.length})
        </button>
        <button
          onClick={() => updateParam('category', 'dresses')}
          className={cn(
            'pb-2 transition-colors cursor-pointer',
            activeCategory === 'dresses' ? 'text-primary border-b-2 border-primary font-bold' : 'text-outline hover:text-primary'
          )}
        >
          Dresses
        </button>
        <button
          onClick={() => updateParam('category', 'outerwear')}
          className={cn(
            'pb-2 transition-colors cursor-pointer',
            activeCategory === 'outerwear' ? 'text-primary border-b-2 border-primary font-bold' : 'text-outline hover:text-primary'
          )}
        >
          Outerwear
        </button>
        <button
          onClick={() => updateParam('category', 'tailoring')}
          className={cn(
            'pb-2 transition-colors cursor-pointer',
            activeCategory === 'tailoring' ? 'text-primary border-b-2 border-primary font-bold' : 'text-outline hover:text-primary'
          )}
        >
          Tailoring
        </button>
        <button
          onClick={() => updateParam('category', 'accessories')}
          className={cn(
            'pb-2 transition-colors cursor-pointer',
            activeCategory === 'accessories' ? 'text-primary border-b-2 border-primary font-bold' : 'text-outline hover:text-primary'
          )}
        >
          Accessories
        </button>
        <button
          onClick={() => updateParam('category', 'footwear')}
          className={cn(
            'pb-2 transition-colors cursor-pointer',
            activeCategory === 'footwear' ? 'text-primary border-b-2 border-primary font-bold' : 'text-outline hover:text-primary'
          )}
        >
          Footwear
        </button>
      </div>

      {/* Asymmetrical Product Grid */}
      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <p className="font-label text-xs uppercase tracking-widest text-outline animate-pulse">
            Curating collection...
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="py-24 text-center">
          <h3 className="font-headline text-3xl mb-4">No Pieces Found</h3>
          <p className="font-body text-sm text-outline mb-8">
            Try adjusting your size or fabric filters.
          </p>
          <button
            onClick={() => setSearchParams({})}
            className="font-label text-xs uppercase tracking-widest border-b border-primary pb-1"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12">
          {products.map((product, idx) => {
            const isWish = wishlistIds.includes(product.id);
            // Replicate the exact asymmetric layout weights from Stitch
            let colSpan = 'md:col-span-6';
            let aspectClass = 'aspect-[4/5]';
            let extraSpacing = '';

            if (idx === 0) {
              colSpan = 'md:col-span-7';
              aspectClass = 'aspect-[4/5]';
            } else if (idx === 1) {
              colSpan = 'md:col-span-5';
              aspectClass = 'aspect-square';
              extraSpacing = 'md:mt-32';
            } else if (idx === 2) {
              colSpan = 'md:col-span-4';
              aspectClass = 'aspect-[2/3]';
            } else if (idx === 3) {
              colSpan = 'md:col-span-8';
              aspectClass = 'aspect-[16/9]';
              extraSpacing = 'md:mt-16';
            } else if (idx === 4) {
              colSpan = 'md:col-span-5';
              aspectClass = 'aspect-square';
            } else if (idx === 5) {
              colSpan = 'md:col-span-7';
              aspectClass = 'aspect-[4/3]';
            }

            return (
              <div
                key={product.id}
                className={cn('group cursor-pointer', colSpan, extraSpacing)}
                onClick={() => navigate(`/products/${product.slug}`)}
              >
                {/* Image Container */}
                <div className="relative bg-surface-container-lowest overflow-hidden">
                  <div className={cn('w-full overflow-hidden bg-surface-dim', aspectClass)}>
                    <img
                      alt={product.title}
                      className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                      src={product.images[0]?.url}
                    />
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-surface-container-lowest/80 glass-nav transition-transform active:scale-90"
                    aria-label="Toggle Wishlist"
                  >
                    <span
                      className="material-symbols-outlined text-primary text-xl"
                      style={{ fontVariationSettings: isWish ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                {/* Information */}
                <div className="mt-8 flex justify-between items-start">
                  <div>
                    <h3 className="font-headline text-2xl group-hover:underline underline-offset-4 decoration-1">
                      {product.title}
                    </h3>
                    <p className="font-label text-xs uppercase tracking-widest text-outline mt-1">
                      {product.material}
                    </p>
                  </div>
                  <span className="font-body text-lg font-medium">
                    {formatCurrency(
                      currency === 'USD' ? product.price : product.priceIdr,
                      currency
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination / Load More */}
      <div className="mt-48 mb-24 flex flex-col items-center">
        <button
          onClick={() => {
            // Simulated discover more
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-12 py-5 bg-primary text-on-primary font-label text-xs uppercase tracking-[0.3em] transition-all hover:bg-primary-container"
        >
          Discover More
        </button>
      </div>

      {/* FAB: Filter Trigger */}
      <div className="fixed bottom-24 right-6 z-30">
        <button
          onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
          className="w-14 h-14 bg-primary text-on-primary flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
          aria-label="Filter Collection"
        >
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </div>

      {/* Sticky Sleek Filter Menu from Stitch */}
      <div className="fixed bottom-16 left-0 w-full z-30 bg-surface-container-lowest glass-nav border-t border-outline-variant/15 px-6 py-4 flex items-center justify-between overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-8">
          {/* Size Filter */}
          <div className="flex items-center space-x-2">
            <span className="font-label text-[0.6rem] uppercase tracking-widest text-outline">
              Size:
            </span>
            <select
              value={activeSize}
              onChange={(e) => updateParam('size', e.target.value)}
              className="bg-transparent font-label text-xs font-bold focus:outline-none cursor-pointer uppercase"
            >
              <option value="ALL">ALL</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>

          {/* Color Filter */}
          <div className="flex items-center space-x-2">
            <span className="font-label text-[0.6rem] uppercase tracking-widest text-outline">
              Color:
            </span>
            <span className="w-3 h-3 bg-black inline-block"></span>
            <span className="font-label text-xs font-bold">MONO</span>
          </div>

          {/* Fabric Filter */}
          <div className="flex items-center space-x-2">
            <span className="font-label text-[0.6rem] uppercase tracking-widest text-outline">
              Fabric:
            </span>
            <select
              value={activeFabric}
              onChange={(e) => updateParam('fabric', e.target.value)}
              className="bg-transparent font-label text-xs font-bold focus:outline-none cursor-pointer uppercase"
            >
              <option value="ALL">ALL FABRICS</option>
              <option value="WOOL">WOOL</option>
              <option value="SILK">SILK</option>
              <option value="COTTON">COTTON</option>
              <option value="CALFSKIN">CALFSKIN</option>
            </select>
          </div>
        </div>

        <div className="hidden md:block">
          <p className="font-label text-[0.6875rem] uppercase tracking-[0.2rem] text-primary">
            {products.length} Items Found
          </p>
        </div>
      </div>
    </div>
  );
};
