import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function DashboardLayout() {
    const [open, setOpen] = useState(true);

    return (
        <div className="flex min-h-screen">
            <aside
                className={`
          text-white
          transition-all duration-300
          ${open ? "w-64" : "w-14"}
        `}
                style={{ backgroundColor: "rgb(0, 134, 137)" }}
            >
                <div className="flex items-center gap-3 p-4 border-b border-white/10">
                    <button
                        onClick={() => setOpen(!open)}
                        className="text-xl"
                    >
                        ☰
                    </button>

                    {open && <span className="font-semibold">UTH-ConfMS</span>}
                </div>

                {open && (
                    <div className="p-4 text-sm opacity-80">
                    </div>
                )}
            </aside>

            <main className="flex-1 p-6 bg-gray-50">
                <Outlet />
            </main>
        </div>
    );
}
