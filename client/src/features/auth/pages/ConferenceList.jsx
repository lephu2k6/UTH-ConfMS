import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  ArrowLeft,
  Lock,
  Unlock,
} from "lucide-react";

/* ===== MOCK ROLE ===== */
const USER_ROLE = "ADMIN"; // ADMIN | ORGANIZER | REVIEWER

export default function ConferenceMain() {
  const [page, setPage] = useState("list");
  // list | create | edit | openclose | validate

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ======================================================
     =============== CREATE / EDIT FORM ===================
     ====================================================== */
  const [form, setForm] = useState({
    name: "",
    description: "",
    submissionDeadline: "",
    reviewDeadline: "",
    status: "OPEN",
  });

  const [errors, setErrors] = useState({});

  const validateCreateEdit = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Conference name is required";
    if (!form.submissionDeadline)
      newErrors.submissionDeadline = "Submission deadline is required";
    if (!form.reviewDeadline)
      newErrors.reviewDeadline = "Review deadline is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateEditSubmit = (e) => {
    e.preventDefault();
    if (!validateCreateEdit()) return;

    alert(
      page === "create"
        ? "Create conference (UI only)"
        : "Edit conference (UI only)"
    );
  };

  /* ======================================================
     =============== OPEN / CLOSE ==========================
     ====================================================== */
  const [conferenceStatus, setConferenceStatus] =
    useState("OPEN");
  const [showConfirm, setShowConfirm] = useState(false);
  const isOpen = conferenceStatus === "OPEN";

  const handleToggleConference = () => {
    setShowConfirm(true);
  };

  const confirmToggleConference = () => {
    setConferenceStatus(isOpen ? "CLOSED" : "OPEN");
    setShowConfirm(false);
  };

  /* ======================================================
     =============== VALIDATE & PERMISSION ================
     ====================================================== */
  const [validateForm, setValidateForm] = useState({
    name: "",
    submissionDeadline: "",
    reviewDeadline: "",
  });
  const [validateErrors, setValidateErrors] = useState({});

  const hasPermission =
    USER_ROLE === "ADMIN" || USER_ROLE === "ORGANIZER";

  const validatePermissionForm = () => {
    const newErrors = {};
    if (!validateForm.name.trim())
      newErrors.name = "Tên hội nghị không được để trống";
    if (!validateForm.submissionDeadline)
      newErrors.submissionDeadline = "Cần chọn hạn nộp bài";
    if (!validateForm.reviewDeadline)
      newErrors.reviewDeadline = "Cần chọn hạn phản biện";
    setValidateErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleValidateSubmit = (e) => {
    e.preventDefault();
    if (!hasPermission) return;
    if (!validatePermissionForm()) return;
    alert("✔️ Form hợp lệ & có quyền (UI demo)");
  };

  /* ======================================================
     ================= RENDER PAGE ========================
     ====================================================== */
  const renderContent = () => {
    /* ================= LIST ================= */
    if (page === "list") {
      return (
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold text-[#008689]">
              Conference List
            </h2>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 bg-[#008689] text-white px-4 py-2 rounded-lg"
              >
                <Plus size={18} />
                Action
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow border z-50">
                  <button
                    onClick={() => {
                      setPage("create");
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Create Conference
                  </button>

                  <button
                    onClick={() => {
                      setPage("edit");
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Edit Conference
                  </button>

                  <button
                    onClick={() => {
                      setPage("openclose");
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Open / Close Conference
                  </button>

                  <button
                    onClick={() => {
                      setPage("validate");
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Validate Form & Permission
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="border rounded-lg p-6 text-center text-gray-500 italic">
            Conference data is not available.
          </div>
        </div>
      );
    }

    /* ================= OPEN / CLOSE ================= */
    if (page === "openclose") {
      return (
        <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
          <button
            onClick={() => setPage("list")}
            className="text-[#008689] mb-4 hover:underline"
          >
            ← Back to Conference
          </button>

          <h2 className="text-xl font-bold text-[#008689] mb-6">
            Open / Close Conference
          </h2>

          <div className="border rounded-lg p-6 text-center text-gray-500 italic mb-6">
            No data available
          </div>

          <div className="flex justify-between border p-4 rounded-lg">
            <span>
              Status:{" "}
              <b
                className={
                  isOpen ? "text-green-600" : "text-red-500"
                }
              >
                {conferenceStatus}
              </b>
            </span>

            <button
              disabled={USER_ROLE !== "ADMIN"}
              onClick={handleToggleConference}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
                isOpen ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {isOpen ? (
                <>
                  <Lock size={16} /> Close
                </>
              ) : (
                <>
                  <Unlock size={16} /> Open
                </>
              )}
            </button>
          </div>

          {showConfirm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl w-96">
                <h3 className="font-bold mb-4">Confirm</h3>
                <p className="mb-6">
                  Do you want{" "}
                  <b>{isOpen ? "đóng" : "mở"}</b> this conference
no?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="border px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmToggleConference}
                    className="bg-[#008689] text-white px-4 py-2 rounded-lg"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    /* ================= VALIDATE ================= */
    if (page === "validate") {
      return (
        <div className="bg-white rounded-xl shadow p-6 max-w-3xl mx-auto">
          <button
            onClick={() => setPage("list")}
            className="text-[#008689] mb-4 hover:underline"
          >
            ← Back to Conference
          </button>

          <h2 className="text-xl font-bold text-[#008689] mb-6">
            Validate Form & Permission
          </h2>

          <p className="mb-4">
            <b>User Role:</b>{" "}
            <span className="text-blue-600">{USER_ROLE}</span>
          </p>

          <form
            onSubmit={handleValidateSubmit}
            className="space-y-4"
          >
            <input
              placeholder="Conference name"
              disabled={!hasPermission}
              value={validateForm.name}
              onChange={(e) =>
                setValidateForm({
                  ...validateForm,
                  name: e.target.value,
                })
              }
              className="w-full border px-3 py-2 rounded-lg"
            />
            {validateErrors.name && (
              <p className="text-red-500 text-sm">
                {validateErrors.name}
              </p>
            )}

            <input
              type="date"
              disabled={!hasPermission}
              value={validateForm.submissionDeadline}
              onChange={(e) =>
                setValidateForm({
                  ...validateForm,
                  submissionDeadline: e.target.value,
                })
              }
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              type="date"
              disabled={!hasPermission}
              value={validateForm.reviewDeadline}
              onChange={(e) =>
                setValidateForm({
                  ...validateForm,
                  reviewDeadline: e.target.value,
                })
              }
              className="w-full border px-3 py-2 rounded-lg"
            />

            <button
              disabled={!hasPermission}
              className="bg-[#008689] text-white px-6 py-2 rounded-lg"
            >
              Save Conference
            </button>
          </form>
        </div>
      );
    }

    /* ================= CREATE / EDIT ================= */
    return (
      <div className="bg-white rounded-xl shadow p-6 max-w-3xl mx-auto">
        <button
          onClick={() => setPage("list")}
          className="text-[#008689] mb-4 hover:underline"
        >
          ← Back to Conference
        </button>

        <h2 className="text-xl font-bold text-[#008689] mb-6">
          {page === "create"
            ? "Create Conference"
            : "Edit Conference"}
        </h2>

        <form
          onSubmit={handleCreateEditSubmit}
          className="space-y-4"
        >
          <input
            placeholder="Conference name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-lg"
          />

          <textarea
            rows="3"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full border px-3 py-2 rounded-lg"
          />

          <input
            type="date"
            value={form.submissionDeadline}
            onChange={(e) =>
              setForm({
                ...form,
                submissionDeadline: e.target.value,
              })
            }
            className="w-full border px-3 py-2 rounded-lg"
          />

          <input
            type="date"
            value={form.reviewDeadline}
            onChange={(e) =>
              setForm({
                ...form,
                reviewDeadline: e.target.value,
              })
            }
            className="w-full border px-3 py-2 rounded-lg"
          />

          <button className="bg-[#008689] text-white px-6 py-2 rounded-lg">
            {page === "create" ? "Create" : "Update"}
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {renderContent()}
    </div>
  );
}
