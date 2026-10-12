import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsService } from '../../services/products.service';
import { Product } from '../../types/product';
import { useCartStore } from '../../stores/cart.store';
import { formatCurrency } from '../../lib/format-currency';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('S');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const { addItem, wishlistIds, toggleWishlist, currency } = useCartStore();

  useEffect(() => {
    async function fetchDetail() {
      if (!id) return;
      setLoading(true);
      try {
        const found = await productsService.getProductById(id);
        setProduct(found);
        if (found) {
          if (found.sizes.length > 0) {
            setSelectedSize(found.sizes[0]);
          }
          // Load related products
          const all = await productsService.getProducts();
          const related = all.filter((p) => p.id !== found.id).slice(0, 3);
          setRelatedProducts(related);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-48 text-center">
        <p className="font-label text-xs uppercase tracking-widest text-outline animate-pulse">
          Loading atelier piece...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-48 text-center px-6">
        <h2 className="font-headline text-3xl mb-4">Piece Not Found</h2>
        <p className="font-body text-sm text-outline mb-8">
          The requested garment is currently unavailable in the digital collection.
        </p>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Return to Collections
        </Button>
      </div>
    );
  }

  const isWish = wishlistIds.includes(product.id);

  const handleAddToBag = () => {
    addItem(product, selectedSize);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="pt-20 pb-32 max-w-7xl mx-auto px-6">
      {/* Editorial Layout: Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16">
        {/* Product Gallery: Asymmetric Grid */}
        <div className="lg:col-span-7 space-y-12">
          {/* Main Hero Shot */}
          <div className="relative aspect-[3/4] overflow-hidden bg-surface-dim">
            <img
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
              alt={product.images[0]?.alt || product.title}
              src={product.images[0]?.url}
            />
          </div>

          {/* Secondary 2-Column Detail Shots */}
          {product.images.length > 2 && (
            <div className="grid grid-cols-2 gap-8">
              <div className="aspect-[4/5] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover"
                  alt={product.images[1]?.alt || 'Detail view'}
                  src={product.images[1]?.url}
                />
              </div>
              <div className="aspect-[4/5] overflow-hidden bg-surface-dim mt-12">
                <img
                  className="w-full h-full object-cover"
                  alt={product.images[2]?.alt || 'Back view'}
                  src={product.images[2]?.url}
                />
              </div>
            </div>
          )}

          {/* Wide Lifestyle Image */}
          {product.images.length > 3 && (
            <div className="aspect-[16/9] overflow-hidden bg-surface-dim">
              <img
                className="w-full h-full object-cover"
                alt={product.images[3]?.alt || 'Lifestyle editorial'}
                src={product.images[3]?.url}
              />
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start flex flex-col space-y-10">
          <div>
            <div className="flex justify-between items-start mb-4">
              <p className="font-label text-xs tracking-[0.2em] text-outline uppercase">
                {product.collection || 'Collection № 04'}
              </p>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="text-on-surface hover:text-error transition-colors p-1"
                aria-label="Save to Wishlist"
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{ fontVariationSettings: isWish ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
              </button>
            </div>

            <h1 className="font-headline text-4xl sm:text-5xl mb-6 leading-tight">
              {product.title}
            </h1>

            <p className="font-label text-2xl tracking-tight text-on-surface">
              {formatCurrency(
                currency === 'USD' ? product.price : product.priceIdr,
                currency,
                { showCents: true }
              )}
            </p>
          </div>

          {/* Description & Technical Specs */}
          <div className="space-y-4">
            <p className="font-body text-sm leading-relaxed text-on-surface-variant max-w-md">
              {product.description}
            </p>

            <div className="pt-4 flex flex-col space-y-2">
              <div className="flex justify-between items-center py-4 border-b border-outline-variant/20">
                <span className="font-label text-[10px] uppercase tracking-[0.15em] text-outline">
                  Material
                </span>
                <span className="font-body text-sm italic">{product.material}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-outline-variant/20">
                <span className="font-label text-[10px] uppercase tracking-[0.15em] text-outline">
                  Origin
                </span>
                <span className="font-body text-sm">{product.origin}</span>
              </div>
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="font-label text-[10px] uppercase tracking-[0.15em] text-outline">
                Select Size
              </label>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="font-label text-[10px] underline underline-offset-4 uppercase tracking-[0.1em] text-outline hover:text-primary transition-colors cursor-pointer"
              >
                Size Guide
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'py-4 text-xs font-label uppercase transition-all border',
                    selectedSize === size
                      ? 'bg-primary text-on-primary border-primary font-bold'
                      : 'bg-surface-container-lowest text-primary border-primary/10 hover:border-primary'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Bag CTA */}
          <div className="flex flex-col space-y-4 pt-2">
            <Button
              variant="primary"
              fullWidth
              onClick={handleAddToBag}
              className="py-6 px-8 text-xs font-label uppercase tracking-[0.2em]"
            >
              Add to Bag
            </Button>

            {addedNotice && (
              <p className="text-center font-label text-xs text-primary flex items-center justify-center gap-1.5 animate-fadeIn">
                <Check className="w-3.5 h-3.5" /> Added to your selection
              </p>
            )}

            <p className="text-center font-label text-[10px] text-outline tracking-wider pt-2">
              Free express shipping on all curated orders.
            </p>
          </div>

          {/* Secondary Info Accents / Accordions */}
          <div className="pt-6 space-y-4">
            <details className="group cursor-pointer">
              <summary className="list-none flex justify-between items-center py-4 border-t border-outline-variant/20">
                <span className="font-label text-[10px] uppercase tracking-[0.15em]">
                  Sustainability
                </span>
                <span className="material-symbols-outlined text-sm transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="pb-6 font-body text-xs text-on-surface-variant leading-relaxed">
                {product.details?.sustainability ||
                  'Our fabrics are OEKO-TEX® certified, ensuring minimal ecological impact and partnering with legacy artisanal mills.'}
              </div>
            </details>

            <details className="group cursor-pointer">
              <summary className="list-none flex justify-between items-center py-4 border-t border-outline-variant/20">
                <span className="font-label text-[10px] uppercase tracking-[0.15em]">
                  Care Instructions
                </span>
                <span className="material-symbols-outlined text-sm transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="pb-6 font-body text-xs text-on-surface-variant leading-relaxed">
                {product.details?.care ||
                  'Dry clean only. Store on a wide padded hanger to maintain the bias structure. Do not steam at high temperature.'}
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Editorial Section: Related Items (Complete the Look) */}
      {relatedProducts.length > 0 && (
        <section className="mt-40 border-t border-outline-variant/15 pt-20">
          <h3 className="font-headline text-3xl mb-16 text-center">Complete the Look</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {relatedProducts.map((rel, index) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/products/${rel.slug}`)}
                className={cn('space-y-4 group cursor-pointer', index === 1 && 'mt-8 md:mt-0')}
              >
                <div className="aspect-[3/4] overflow-hidden bg-surface-container">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                    alt={rel.title}
                    src={rel.images[0]?.url}
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-label text-[11px] uppercase tracking-wider group-hover:underline">
                    {rel.title}
                  </h4>
                  <p className="font-body text-sm text-outline">
                    {formatCurrency(
                      currency === 'USD' ? rel.price : rel.priceIdr,
                      currency
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      <Modal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        title="Atelier Sizing Guide"
        subtitle="Measurements in Centimeters (cm)"
      >
        <div className="overflow-x-auto text-xs font-body">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-primary/20 text-left font-label text-[10px] uppercase tracking-widest text-outline">
                <th className="py-3 pr-4">Size</th>
                <th className="py-3 px-4">Bust (cm)</th>
                <th className="py-3 px-4">Waist (cm)</th>
                <th className="py-3 pl-4">Hips (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              <tr>
                <td className="py-3 pr-4 font-bold">XS (34)</td>
                <td className="py-3 px-4">80-84</td>
                <td className="py-3 px-4">60-64</td>
                <td className="py-3 pl-4">86-90</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold">S (36)</td>
                <td className="py-3 px-4">84-88</td>
                <td className="py-3 px-4">64-68</td>
                <td className="py-3 pl-4">90-94</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold">M (38)</td>
                <td className="py-3 px-4">88-92</td>
                <td className="py-3 px-4">68-72</td>
                <td className="py-3 pl-4">94-98</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold">L (40)</td>
                <td className="py-3 px-4">92-96</td>
                <td className="py-3 px-4">72-76</td>
                <td className="py-3 pl-4">98-102</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-6 text-[11px] text-outline leading-relaxed">
            All garments are cut true to European haute couture standards. For loose draping, we recommend ordering your true size.
          </p>
        </div>
      </Modal>
    </div>
  );
};
