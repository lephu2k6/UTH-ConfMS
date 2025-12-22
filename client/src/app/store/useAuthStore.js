import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../../lib/axios";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isCheckingAuth: true,

      checkAuth: async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
          set({ user: null, isCheckingAuth: false });
          return;
        }

        set({ isCheckingAuth: true });
        try {
          // Gửi request lấy thông tin "Lê Phú"
          const res = await api.get("/users/me"); 
          // Cập nhật dữ liệu vào Store
          set({ user: res.data, isCheckingAuth: false });
        } catch (err) {
          console.error("Xác thực thất bại:", err);
          localStorage.removeItem("access_token");
          set({ user: null, isCheckingAuth: false });
        }
      },

      login: async (credentials) => {
        try {
          const res = await api.post("/auth/login", credentials);
          localStorage.setItem("access_token", res.data.access_token);
          // Sau khi login, gọi luôn checkAuth để lấy profile chuẩn "Lê Phú"
          const userRes = await api.get("/users/me");
          set({ user: userRes.data });
          return userRes.data;
        } catch (err) {
          throw err;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);