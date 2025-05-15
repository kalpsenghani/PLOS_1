import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { signIn, signUp, signOut, AuthError } from '../lib/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { user, error } = await signIn(email, password);
      if (error) throw error;
      set({ user, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to sign in',
        loading: false,
      });
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    set({ loading: true, error: null });
    try {
      const { user, error } = await signUp(email, password, { name });
      if (error) throw error;
      set({ user, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to sign up',
        loading: false,
      });
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    try {
      const { error } = await signOut();
      if (error) throw error;
      set({ user: null, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to sign out',
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;