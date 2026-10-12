import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between p-6 sm:p-12">
      <header className="flex justify-between items-center">
        <Link to="/" className="font-headline text-2xl tracking-[0.3em] font-bold">
          LUMIERE
        </Link>
        <Link
          to="/"
          className="font-label text-xs uppercase tracking-widest text-outline hover:text-primary transition-colors"
        >
          Return to Lookbook
        </Link>
      </header>

      <main className="my-auto py-12 flex justify-center items-center">
        <div className="w-full max-w-md bg-surface-container-lowest p-8 sm:p-12 border border-outline-variant/20 shadow-sm">
          <Outlet />
        </div>
      </main>

      <footer className="text-center font-label text-[10px] uppercase tracking-widest text-outline">
        © {new Date().getFullYear()} LUMIERE ATELIER. STRICTLY CONFIDENTIAL.
      </footer>
    </div>
  );
};
