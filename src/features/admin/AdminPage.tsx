import React, { useState, useEffect } from 'react';
import { productsService } from '../../services/products.service';
import { ordersService } from '../../services/orders.service';
import { Product } from '../../types/product';
import { Order } from '../../types/order';
import { formatCurrency } from '../../lib/format-currency';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Package, TrendingUp, ShoppingBag, Plus } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [_loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('750');
  const [newCategory, setNewCategory] = useState<'dresses' | 'outerwear' | 'tailoring' | 'accessories' | 'footwear'>('dresses');
  const [newMaterial, setNewMaterial] = useState('100% Raw Mulberry Silk');
  const [newOrigin, setNewOrigin] = useState('Como, Italy');
  const [newDescription, setNewDescription] = useState('An architectural expression of fluid tailoring.');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [prodData, ordData] = await Promise.all([
          productsService.getProducts(),
          ordersService.getOrders(),
        ]);
        setProducts(prodData);
        setOrders(ordData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleToggleStock = async (product: Product) => {
    const updated = await productsService.updateProduct(product.id, {
      inStock: !product.inStock,
    });
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(newPrice) || 500;
    const created = await productsService.addProduct({
      slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newTitle,
      subtitle: 'Atelier Edition',
      collection: "Collection 004 / L'Essence",
      category: newCategory,
      price: priceNum,
      priceIdr: priceNum * 16000,
      material: newMaterial,
      origin: newOrigin,
      description: newDescription,
      details: {
        sustainability: 'OEKO-TEX Certified raw material.',
        care: 'Specialist dry clean only.',
        sku: `LUM-ATELIER-${Math.floor(100 + Math.random() * 900)}`,
      },
      sizes: ['XS', 'S', 'M', 'L'],
      colors: [{ name: 'Noir', hex: '#000000' }],
      images: [
        {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPeOLVpYX8AArLWueEhfJVXNpbQaz7kstoCrEOxqvSOtHitciOf7rh0XTkmGBfng81LbBwyNI8nN6Uwjeigmj54y6GXi7lVrideJOLvJooqBZC8YT6oOzO5KfxGa0IlW3mL_sKfrR-lvZwvaiDEJDWDVNxvm-i3u4sTWnARr31MgbskTWV580j6jkuSF4sfoVgHt2w7pyK3gBg5mOwinrDZYriuNtOI3J3N-1_Gnk2qZ3v07OWrSdrGFvceJeL6SPVjAIau24uRzw',
          alt: newTitle,
        },
      ],
      inStock: true,
      stockCount: 10,
    });

    setProducts((prev) => [created, ...prev]);
    setIsAddModalOpen(false);
    setNewTitle('');
  };

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="space-y-12 pb-24">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <p className="font-label text-[10px] uppercase tracking-[0.25em] text-outline mb-2">
            Curator Console
          </p>
          <h1 className="font-headline text-4xl sm:text-5xl">Inventory &amp; Operations</h1>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 py-4"
        >
          <Plus className="w-4 h-4" />
          <span>Curate New Piece</span>
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-surface p-6 border border-outline-variant/20">
          <div className="flex items-center justify-between text-outline mb-3">
            <span className="font-label text-[10px] uppercase tracking-widest">Catalogued Pieces</span>
            <Package className="w-4 h-4" />
          </div>
          <p className="font-headline text-3xl font-bold">{products.length}</p>
          <p className="font-label text-[10px] text-outline mt-2 uppercase">Active in lookbook</p>
        </div>

        <div className="bg-surface p-6 border border-outline-variant/20">
          <div className="flex items-center justify-between text-outline mb-3">
            <span className="font-label text-[10px] uppercase tracking-widest">Total Orders</span>
            <ShoppingBag className="w-4 h-4" />
          </div>
          <p className="font-headline text-3xl font-bold">{orders.length}</p>
          <p className="font-label text-[10px] text-outline mt-2 uppercase">Simulated transactions</p>
        </div>

        <div className="bg-surface p-6 border border-outline-variant/20">
          <div className="flex items-center justify-between text-outline mb-3">
            <span className="font-label text-[10px] uppercase tracking-widest">Total GMV</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <p className="font-headline text-3xl font-bold">{formatCurrency(totalRevenue, 'USD')}</p>
          <p className="font-label text-[10px] text-outline mt-2 uppercase">Simulated sales value</p>
        </div>
      </div>

      {/* Product Management Table */}
      <div className="bg-surface border border-outline-variant/20 p-6 sm:p-10 space-y-6">
        <div className="flex justify-between items-center border-b border-outline-variant/15 pb-4">
          <h2 className="font-headline text-2xl">Garments &amp; Inventory</h2>
          <span className="font-label text-xs uppercase tracking-wider text-outline">
            {products.length} Items Listed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs font-body">
            <thead>
              <tr className="border-b border-outline-variant/20 text-left font-label text-[10px] uppercase tracking-widest text-outline">
                <th className="py-4 pr-4">Piece</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Material</th>
                <th className="py-4 px-4">Retail Price</th>
                <th className="py-4 px-4">Stock Status</th>
                <th className="py-4 pl-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-surface-dim overflow-hidden flex-shrink-0">
                        <img
                          src={p.images[0]?.url}
                          alt={p.title}
                          className="w-full h-full object-cover grayscale"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{p.title}</p>
                        <p className="font-label text-[9px] uppercase tracking-wider text-outline">
                          {p.origin}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-label uppercase text-[10px] tracking-wider">
                    {p.category}
                  </td>
                  <td className="py-4 px-4 italic text-outline">{p.material}</td>
                  <td className="py-4 px-4 font-semibold">{formatCurrency(p.price, 'USD')}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`font-label text-[9px] uppercase tracking-widest px-2 py-0.5 ${
                        p.inStock
                          ? 'bg-surface-container-highest text-primary font-bold'
                          : 'bg-error-container text-error'
                      }`}
                    >
                      {p.inStock ? 'In Stock' : 'Archived / Out'}
                    </span>
                  </td>
                  <td className="py-4 pl-4 text-right">
                    <button
                      onClick={() => handleToggleStock(p)}
                      className="font-label text-[10px] uppercase tracking-wider border border-outline-variant/40 px-3 py-1 hover:border-primary transition-colors"
                    >
                      {p.inStock ? 'Mark Out of Stock' : 'Replenish'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Curate New Atelier Garment"
        subtitle="Catalog Insertion"
      >
        <form onSubmit={handleAddProduct} className="space-y-4 text-xs font-body">
          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-1">
              Garment Title
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              placeholder="e.g. Asymmetric Wool Cape"
              className="w-full bg-surface-container-lowest border-b border-outline-variant py-2 px-1 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-1">
                Price (USD)
              </label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                required
                className="w-full bg-surface-container-lowest border-b border-outline-variant py-2 px-1 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full bg-surface-container-lowest border-b border-outline-variant py-2 px-1 focus:outline-none focus:border-primary uppercase font-label"
              >
                <option value="dresses">Dresses</option>
                <option value="outerwear">Outerwear</option>
                <option value="tailoring">Tailoring</option>
                <option value="accessories">Accessories</option>
                <option value="footwear">Footwear</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-1">
              Material Specification
            </label>
            <input
              type="text"
              value={newMaterial}
              onChange={(e) => setNewMaterial(e.target.value)}
              required
              className="w-full bg-surface-container-lowest border-b border-outline-variant py-2 px-1 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-1">
              Provenance / Origin
            </label>
            <input
              type="text"
              value={newOrigin}
              onChange={(e) => setNewOrigin(e.target.value)}
              required
              className="w-full bg-surface-container-lowest border-b border-outline-variant py-2 px-1 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-1">
              Curator Description
            </label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={3}
              required
              className="w-full bg-surface-container-lowest border-b border-outline-variant py-2 px-1 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsAddModalOpen(false)}
              className="py-3 px-6 text-xs"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="py-3 px-6 text-xs">
              Publish to Lookbook
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
