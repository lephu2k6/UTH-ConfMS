import { create } from "zustand";
import api from "../../lib/axios";

export const useAuditStore = create((set) => ({
    logs: [],
    isLoading: false,
    fetchLogs: async () => {
        set({ isLoading: true });
        try {
            const res = await api.get("/audit-logs");
            set({ logs: res.data.audit_logs || [] });
        } catch (err) {
            console.error(err);
            set({ logs: [] });
        } finally {
            set({ isLoading: false });
        }
    },
}));