import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { Button } from '../../components/ui/Button';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'CUSTOMER');
    navigate('/');
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="font-label text-[10px] uppercase tracking-[0.25em] text-outline mb-2">
          New Private Client
        </p>
        <h1 className="font-headline text-3xl">Request Access</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Julian Ross"
            className="w-full bg-transparent border-b border-outline-variant py-3 px-1 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block font-label text-[10px] uppercase tracking-widest text-outline mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@domain.com"
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
            placeholder="••••••••"
            className="w-full bg-transparent border-b border-outline-variant py-3 px-1 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <Button type="submit" variant="primary" fullWidth className="py-5 text-xs">
          Create Account
        </Button>
      </form>

      <div className="text-center font-label text-xs text-outline pt-2">
        <span>Already an atelier client? </span>
        <Link to="/login" className="text-primary underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};
