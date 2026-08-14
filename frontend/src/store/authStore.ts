import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: unknown | null;
  setAuth: (token: string, user: unknown) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: null,
  
  setAuth: (token, user) => {
    localStorage.setItem('token', token);
    set({ token, user });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));