import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../../lib/axios";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isCheckingAuth: true,


      checkAuth: async () => {
        try {
          const res = await api.get("/auth/me");
          set({ user: res.data });
        } catch (err) {
          set({ user: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      login: async ({ email, password }) => {
        set({ isLoading: true });
        try {
          const res = await api.post("/auth/login", {
            email,
            password,
          });
          set({ user: res.data });
        } catch (err) {
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      /* ================= LOGOUT ================= */
      logout: async () => {
        await api.post("/auth/logout");
        set({ user: null });
      },
    }),
    {
      name: "auth-storage", 
    }
  )
);
