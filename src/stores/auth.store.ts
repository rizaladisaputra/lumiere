import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/user';
import { MOCK_USERS } from '../mocks/users.mock';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: 'CUSTOMER' | 'ADMIN') => boolean;
  logout: () => void;
  switchRole: (role: 'CUSTOMER' | 'ADMIN') => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: MOCK_USERS[0], // Seed Elena Vance logged in by default for seamless browsing
      isAuthenticated: true,

      login: (email: string, role = 'CUSTOMER') => {
        const found = MOCK_USERS.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() || u.role === role
        );
        if (found) {
          set({ user: found, isAuthenticated: true });
          return true;
        }
        // Fallback create mock customer
        const newUser: User = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0],
          email,
          role,
          addresses: [],
        };
        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      switchRole: (role) => {
        const target = MOCK_USERS.find((u) => u.role === role);
        if (target) {
          set({ user: target, isAuthenticated: true });
        }
      },
    }),
    {
      name: 'lumiere-auth-storage',
    }
  )
);
