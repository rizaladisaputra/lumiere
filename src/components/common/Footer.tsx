import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-surface text-on-surface border-t border-outline-variant/15 pt-20 pb-28 sm:pb-20">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          {/* Brand Manifesto */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="font-headline text-3xl tracking-[0.2em] font-bold">LUMIERE</h2>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed max-w-sm">
              The Digital Curator. Rejecting cluttered e-commerce in favor of high-end editorial clarity, intentional asymmetry, and timeless monochromatic craftsmanship.
            </p>
            <div className="font-label text-[10px] tracking-widest text-outline uppercase">
              Paris • Milan • Tokyo • Jakarta
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary">
              Curation
            </h3>
            <ul className="space-y-3 font-label text-xs text-outline uppercase tracking-widest">
              <li>
                <Link to="/products" className="hover:text-primary transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/products?category=dresses" className="hover:text-primary transition-colors">
                  Silk &amp; Dresses
                </Link>
              </li>
              <li>
                <Link to="/products?category=outerwear" className="hover:text-primary transition-colors">
                  Outerwear &amp; Wool
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-primary transition-colors">
                  Saved Lookbook
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-primary transition-colors">
                  Order Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Editorial Dispatch */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary">
              The Gazette
            </h3>
            <p className="font-body text-xs text-on-surface-variant">
              Receive limited private invitations to seasonal anthology releases and bespoke atelier previews.
            </p>
            {subscribed ? (
              <p className="font-label text-xs text-primary uppercase tracking-widest py-3 border-b border-primary">
                ✓ You have been subscribed to the private anthology.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex border-b border-primary pt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="bg-transparent text-xs font-body py-3 flex-1 focus:outline-none placeholder:text-outline"
                  required
                />
                <button
                  type="submit"
                  className="font-label text-[10px] uppercase tracking-[0.2em] px-4 hover:opacity-70 transition-opacity"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 border-t border-outline-variant/15 flex flex-col sm:flex-row justify-between items-center text-outline font-label text-[10px] uppercase tracking-widest gap-4">
          <p>© {new Date().getFullYear()} LUMIERE ATELIER. ALL RIGHTS RESERVED.</p>
          <p className="text-center sm:text-right">
            Functional E-Commerce Frontend • Spring Boot REST Ready (Java 21)
          </p>
        </div>
      </div>
    </footer>
  );
};
