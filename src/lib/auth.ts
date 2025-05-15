import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

export interface AuthError {
  message: string;
}

export interface AuthResponse {
  user: User | null;
  error: AuthError | null;
}

export const signUp = async (
  email: string,
  password: string,
  metadata?: { name: string }
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    if (error) throw error;

    return { user: data.user, error: null };
  } catch (error) {
    return {
      user: null,
      error: {
        message: error instanceof Error ? error.message : 'An error occurred during sign up',
      },
    };
  }
};

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { user: data.user, error: null };
  } catch (error) {
    return {
      user: null,
      error: {
        message: error instanceof Error ? error.message : 'An error occurred during sign in',
      },
    };
  }
};

export const signOut = async (): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return {
      error: {
        message: error instanceof Error ? error.message : 'An error occurred during sign out',
      },
    };
  }
};

export const resetPassword = async (email: string): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return {
      error: {
        message: error instanceof Error ? error.message : 'An error occurred during password reset',
      },
    };
  }
};

export const updatePassword = async (newPassword: string): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return {
      error: {
        message: error instanceof Error ? error.message : 'An error occurred while updating password',
      },
    };
  }
};