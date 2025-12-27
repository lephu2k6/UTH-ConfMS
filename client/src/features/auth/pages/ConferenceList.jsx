import { useState, useRef, useEffect } from "react";
import { Search, Plus, ArrowLeft } from "lucide-react";

export default function Conference() {
  const [page, setPage] = useState("list"); // list | create | edit
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= FORM STATE ================= */
  const [form, setForm] = useState({
    name: "",
    description: "",
    submissionDeadline: "",
    reviewDeadline: "",
    status: "OPEN",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Conference name is required";
    if (!form.submissionDeadline)
      newErrors.submissionDeadline = "Submission deadline is required";
    if (!form.reviewDeadline)
      newErrors.reviewDeadline = "Review deadline is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    alert(
      page === "create"
        ? "Create conference (UI only)"
        : "Edit conference (UI only)"
    );
  };

  /* ================= PAGE CONTENT ================= */
  const renderContent = () => {
    /* ===== LIST ===== */
    if (page === "list") {
      return (
        <div className="bg-white rounded-xl shadow p-6">
          {/* TITLE + ACTION */}
          <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-[#008689]">
              Conference List
            </h2>

            <div className="flex items-center gap-3">
              {/* SEARCH */}
              <div className="relative w-full md:w-80">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conference..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#008689]"
                />
              </div>

              {/* ACTION MENU */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 bg-[#008689] text-white px-4 py-2 rounded-lg hover:opacity-90"
                >
                  <Plus size={18} />
                  Action
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow border z-50">
                    <button
                      onClick={() => {
                        setForm({
                          name: "",
                          description: "",
                          submissionDeadline: "",
                          reviewDeadline: "",
                          status: "OPEN",
                        });
                        setPage("create");
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      ConferenceCreate
                    </button>

                    <button
                      onClick={() => {
                        setPage("edit");
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      ConferenceEdit
                    </button>
                  </div>
                )}
              </div>
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
                <td colSpan="6" className="p-6 text-center text-gray-500 italic">
                  Chưa có dữ liệu conference
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    /* ===== CREATE / EDIT ===== */
    return (
      <div className="flex justify-center">
        <div className="bg-white rounded-xl shadow p-6 w-full max-w-3xl">
          <button
            onClick={() => setPage("list")}
            className="flex items-center gap-2 mb-4 text-[#008689] hover:underline"
          >
            <ArrowLeft size={18} />
            Quay về Conference
          </button>

          <h2 className="text-xl font-bold text-[#008689] mb-6">
            {page === "create" ? "Create Conference" : "Edit Conference"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-medium mb-1">
                Conference Name
              </label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">
                Description
              </label>
              <textarea
                rows="4"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">
                  Submission Deadline
                </label>
                <input
                  type="date"
                  value={form.submissionDeadline}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      submissionDeadline: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Review Deadline
                </label>
                <input
                  type="date"
                  value={form.reviewDeadline}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      reviewDeadline: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#008689] text-white px-6 py-2 rounded-lg"
              >
                {page === "create" ? "Create" : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return <div className="min-h-screen bg-gray-100 p-6">{renderContent()}</div>;
}
