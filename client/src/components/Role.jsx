import { useAuthStore } from "../app/store/useAuthStore";

export default function Role({ roles, children }) {
    const { user } = useAuthStore();
    if (!roles.includes(user?.role)) return null;
    return <>{children}</>;
}