import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import { ArrowLeft } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, switchRole } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-container-low text-on-surface flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-surface border-b border-outline-variant/20 h-16 px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-label uppercase tracking-widest text-outline hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Storefront</span>
          </Link>
          <div className="h-4 w-px bg-outline-variant/40" />
          <h1 className="font-headline text-lg tracking-[0.2em] font-bold">
            LUMIERE <span className="text-xs font-label font-normal text-outline">/ CURATOR DESK</span>
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-label">
            <span className="text-outline">Signed in as:</span>
            <span className="font-bold">{user?.name || 'Administrator'}</span>
            <span className="bg-primary text-on-primary text-[9px] px-1.5 py-0.5">ADMIN</span>
          </div>

          <button
            onClick={() => {
              switchRole('CUSTOMER');
              navigate('/');
            }}
            className="font-label text-xs uppercase tracking-wider px-3 py-1.5 border border-outline-variant/40 hover:border-primary transition-colors"
          >
            Switch to Customer
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-10">
        <Outlet />
      </div>
    </div>
  );
};
