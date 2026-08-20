import { create } from 'zustand';

interface AuthState {
  user: { email: string; rol: string } | null;
  setAuth: (user: { email: string; rol: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setAuth: (user) => {
    set({ user });
  },

  logout: () => {
    // Clear HttpOnly cookie by calling logout endpoint or just clear state
    document.cookie = 'access_token=; path=/; max-age=0';
    set({ user: null });
  },
}));
