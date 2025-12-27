import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../../lib/axios";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isCheckingAuth: true,
      isLoading: false,

      checkAuth: async () => {
        set({ isCheckingAuth: true });

        const token = localStorage.getItem("access_token");
        if (!token) {
          set({ user: null, isCheckingAuth: false });
          return;
        }

        try {
          const res = await api.get("/users/me");
          set({ user: res.data, isCheckingAuth: false });
        } catch {
          localStorage.removeItem("access_token");
          set({ user: null, isCheckingAuth: false });
        }
      },

      login: async (credentials) => {
        set({ isLoading: true });
        const res = await api.post("/auth/login", credentials);
        localStorage.setItem("access_token", res.data.access_token);

        const userRes = await api.get("/users/me");
        set({ user: userRes.data, isLoading: false });
        return userRes.data;
      },

      signup: async (userData) => {
        set({ isLoading: true });
        const res = await api.post("/auth/register", userData);
        set({ isLoading: false });
        return res.data;
      },

      verifyEmail: async (tokenValue) => {
        set({ isLoading: true });
        const res = await api.post("/auth/verify-email", { token: tokenValue });
        set({ isLoading: false });
        return res.data;
      },

      forgotPassword: async (email) => {
        set({ isLoading: true });
        const res = await api.post("/auth/forgot-password", { email });
        set({ isLoading: false });
        return res.data;
      },

      resetPasswordConfirm: async (token, newPassword) => {
        set({ isLoading: true });
        const res = await api.post("/auth/reset-password-confirm", {
          token,
          new_password: newPassword,
        });
        set({ isLoading: false });
        return res.data;
      },

      logout: () => {
        localStorage.removeItem("access_token");
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
