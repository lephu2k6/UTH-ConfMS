import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex" }}>
      <aside
        style={{
          width: 200,
          border: "3px solid red",
          padding: 20
        }}
      >
        Sidebar
      </aside>

      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}
