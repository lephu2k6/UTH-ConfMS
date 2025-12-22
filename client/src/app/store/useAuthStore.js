import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../../lib/axios";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isCheckingAuth: true,
      isLoading: false, // Quản lý trạng thái loading chung cho Login/Signup

      // KIỂM TRA ĐĂNG NHẬP
      checkAuth: async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
          set({ user: null, isCheckingAuth: false });
          return;
        }

        set({ isCheckingAuth: true });
        try {
          const res = await api.get("/users/me");
          set({ user: res.data, isCheckingAuth: false });
        } catch (err) {
          console.error("Xác thực thất bại:", err);
          localStorage.removeItem("access_token");
          set({ user: null, isCheckingAuth: false });
        }
      },

      // ĐĂNG NHẬP
      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const res = await api.post("/auth/login", credentials);
          localStorage.setItem("access_token", res.data.access_token);
          
          // Lấy profile user ngay sau khi login
          const userRes = await api.get("/users/me");
          set({ user: userRes.data, isLoading: false });
          return userRes.data;
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      // ĐĂNG KÝ 
      signup: async (userData) => {
        set({ isLoading: true });
        try {
          const res = await api.post("/auth/register", userData);
          
          set({ isLoading: false });
          return res.data;
        } catch (err) {
          set({ isLoading: false });
          throw err; 
        }
      },
      verifyEmail: async (tokenValue) => {
        set({ isLoading: true });
        try {
          const res = await api.post("/auth/verify-email", { 
            token: tokenValue 
          });
          
          set({ isLoading: false });
          return res.data;
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },
      //Quên pass
      forgotPassword: async (email) => {
        set({ isLoading: true });
        try {
          const res = await api.post("/auth/forgot-password", { email });
          set({ isLoading: false });
          return res.data;
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },
      
      resetPasswordConfirm: async (token, newPassword) => {
        set({ isLoading: true });
        try {
          const res = await api.post("/auth/reset-password-confirm", { 
            token: token, 
            new_password: newPassword 
          });
          set({ isLoading: false });
          return res.data;
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },
      // ĐĂNG XUẤT (Nên có)
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