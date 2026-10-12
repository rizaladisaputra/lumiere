import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { BottomNav } from '../components/common/BottomNav';
import { CartDrawer } from '../components/common/CartDrawer';

export const StorefrontLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <CartDrawer />
      <BottomNav />
      <Footer />
    </div>
  );
};
