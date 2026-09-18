import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      register: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.post('/auth/register', {
            name,
            email,
            password,
          });
          set({ user: data, token: data.token, loading: false });
          return true;
        } catch (err) {
          set({
            error: err.response?.data?.message || 'Registration failed',
            loading: false,
          });
          return false;
        }
      },

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.post('/auth/login', { email, password });
          set({ user: data, token: data.token, loading: false });
          return true;
        } catch (err) {
          set({
            error: err.response?.data?.message || 'Login failed',
            loading: false,
          });
          return false;
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },

      updateUser: (updatedUser) => {
        set({ user: updatedUser });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);

export default useAuthStore;