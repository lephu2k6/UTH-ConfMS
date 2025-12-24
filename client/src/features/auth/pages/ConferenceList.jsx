import { useState } from "react";
import { Menu, Bell, UserCircle, Search, Home } from "lucide-react";

export default function ConferenceList() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64
          bg-[#008689] text-white
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-5 text-xl font-bold border-b border-white/30">
          UTH-ConfMS
        </div>

        <nav className="p-4 space-y-3">
          <span className="block px-3 py-2 rounded bg-white/20">
            Conference List
          </span>
        </nav>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* ===== TOPBAR ===== */}
        <header className="h-14 bg-[#008689] text-white flex items-center justify-between px-4 shadow">
          <div className="flex items-center gap-3">
            <Menu
              className="cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />

            <Home className="cursor-pointer hover:opacity-80" />
          </div>

          <div className="flex items-center gap-4">
            <Bell className="cursor-pointer" />
            <UserCircle className="cursor-pointer" />
          </div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <div className="p-6">
          <div className="bg-white rounded-xl shadow p-6">
            {/* TITLE + SEARCH */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-[#008689]">
                Conference List
              </h2>

              {/* SEARCH BAR */}
              <div className="relative w-full md:w-80">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conference..."
                  className="
                    w-full pl-10 pr-4 py-2
                    border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2
                    focus:ring-[#008689]
                  "
                />
              </div>
            </div>

            {/* TABLE */}
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Conference Name</th>
                  <th className="p-3 text-center">Submission</th>
                  <th className="p-3 text-center">Review</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan="6"
                    className="p-6 text-center text-gray-500 italic"
                  >
                    Chưa có dữ liệu conference
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
