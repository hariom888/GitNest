import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, registerUser, getMe } from '../api/authApi';

const getFriendlyAuthError = (error, fallback) => {
  const payload = error?.response?.data || error;
  const details = Array.isArray(payload?.errors)
    ? payload.errors.map((item) => item.message || item.msg || String(item))
    : [];
  const message = payload?.message || fallback;
  return { message, details };
};

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await loginUser({ email, password });
          set({
            user: { _id: res._id, username: res.username, email: res.email },
            token: res.token,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          set({
            error: getFriendlyAuthError(error, 'Login failed'),
            loading: false,
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const res = await registerUser(userData);
          set({
            user: { _id: res._id, username: res.username, email: res.email },
            token: res.token,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          set({
            error: getFriendlyAuthError(error, 'Registration failed'),
            loading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, error: null });
      },
      clearError: () => {
        set({ error: null });
      },
      checkAuth: async () => {
        set({ loading: true, error: null });
        try {
          const res = await getMe();
          set({
            user: res,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage', // local storage key
    }
  )
);
