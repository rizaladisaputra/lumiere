import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { Button } from '../../components/ui/Button';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('elena.vance@example.com');
  const [password, setPassword] = useState('••••••••');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, email.includes('admin') ? 'ADMIN' : 'CUSTOMER');
    navigate(email.includes('admin') ? '/admin' : '/');
  };

  const handleQuickLogin = (role: 'CUSTOMER' | 'ADMIN') => {
    if (role === 'CUSTOMER') {
      login('elena.vance@example.com', 'CUSTOMER');
      navigate('/');
    } else {
      login('admin@lumiere.com', 'ADMIN');
      navigate('/admin');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="font-label text-[10px] uppercase tracking-[0.25em] text-outline mb-2">
          Private Client Access
        </p>
        <h1 className="font-headline text-3xl">Sign In</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent border-b border-outline-variant py-3 px-1 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-transparent border-b border-outline-variant py-3 px-1 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <Button type="submit" variant="primary" fullWidth className="py-5 text-xs">
          Sign In
        </Button>
      </form>

      {/* Quick Demo Personas */}
      <div className="pt-6 border-t border-outline-variant/20 space-y-3">
        <p className="font-label text-[10px] uppercase tracking-widest text-outline text-center">
          Instant Demo Access
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleQuickLogin('CUSTOMER')}
            className="p-3 border border-outline-variant/30 text-xs font-label uppercase hover:border-primary transition-colors text-center"
          >
            Client (Elena)
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('ADMIN')}
            className="p-3 border border-outline-variant/30 text-xs font-label uppercase hover:border-primary transition-colors text-center"
          >
            Curator (Admin)
          </button>
        </div>
      </div>

      <div className="text-center font-label text-xs text-outline pt-2">
        <span>Don&apos;t have an atelier account? </span>
        <Link to="/register" className="text-primary underline">
          Request Access
        </Link>
      </div>
    </div>
  );
};
