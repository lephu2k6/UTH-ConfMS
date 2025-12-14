import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: null,
  login: (data) => set({ accessToken: data.accessToken }),
  logout: () => set({ accessToken: null }),
}));

export default useAuthStore;
