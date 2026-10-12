import { createBrowserRouter, Navigate } from 'react-router-dom';
import { StorefrontLayout } from '../layouts/StorefrontLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { HomePage } from '../features/home/HomePage';
import { ProductsPage } from '../features/products/ProductsPage';
import { ProductDetailPage } from '../features/products/ProductDetailPage';
import { WishlistPage } from '../features/products/WishlistPage';
import { CheckoutPage } from '../features/checkout/CheckoutPage';
import { OrdersPage } from '../features/orders/OrdersPage';
import { OrderDetailPage } from '../features/orders/OrderDetailPage';
import { AdminPage } from '../features/admin/AdminPage';
import { LoginPage } from '../features/auth/LoginPage';
import { RegisterPage } from '../features/auth/RegisterPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StorefrontLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/:id',
        element: <ProductDetailPage />,
      },
      {
        path: 'wishlist',
        element: <WishlistPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'orders/:id',
        element: <OrderDetailPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
