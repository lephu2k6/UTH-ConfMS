import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      <Outlet />
    </div>
  );
}
