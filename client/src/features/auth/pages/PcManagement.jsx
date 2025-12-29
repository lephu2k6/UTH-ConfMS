import { useState } from "react";
import {
  Trash2,
  UserX,
  UserPlus,
  Send,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";

/* =========================================================
   PC MEMBER LIST
========================================================= */
function PCMemberList({
  currentUserRole = "CHAIR",
  conferenceStatus = "OPEN",
  onSelectAction,
}) {
  const isChair = currentUserRole === "CHAIR";
  const isClosed = conferenceStatus === "CLOSED";

  const [pcMembers, setPcMembers] = useState([]);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [confirmAdd, setConfirmAdd] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    affiliation: "",
  });

  const handleAddAccept = () => {
    setPcMembers([...pcMembers, { ...newMember, status: "ACTIVE" }]);
    setConfirmAdd(false);
    setShowAddForm(false);
    setNewMember({ name: "", email: "", affiliation: "" });
  };

  const toggleStatus = (email) => {
    setPcMembers(
      pcMembers.map((m) =>
        m.email === email
          ? {
              ...m,
              status: m.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
            }
          : m
      )
    );
  };

  const handleRemove = () => {
    setPcMembers(pcMembers.filter((m) => m.email !== confirmRemove.email));
    setConfirmRemove(null);
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-[#008689]/20">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#008689]">
          Program Committee Members
        </h2>

        {isChair && (
          <div className="flex gap-3 relative">
            {/* ACTIONS */}
            <button
              onClick={() => setShowActions(!showActions)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg text-[#008689] hover:bg-[#008689]/10"
            >
              + ACTIONS <ChevronDown size={16} />
            </button>

            {showActions && (
              <div className="absolute right-28 top-12 w-52 bg-white border rounded-lg shadow-lg z-20">
                <button
                  onClick={() => {
                    setShowActions(false);
                    onSelectAction("INVITE");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#008689]/10"
                >
                  Invite Reviewer
                </button>
                <button
                  onClick={() => {
                    setShowActions(false);
                    onSelectAction("STATUS");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#008689]/10"
                >
                  Reviewer Status
                </button>
              </div>
            )}

            {/* ADD MEMBER */}
            <button
              disabled={isClosed}
              onClick={() => setShowAddForm(!showAddForm)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                ${
                  isClosed
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#008689] text-white hover:bg-[#006f70]"
                }`}
            >
              <UserPlus size={16} />
              Add PC Member
            </button>
          </div>
        )}
      </div>

      {/* TABLE */}
      <table className="w-full text-sm">
        <thead className="bg-[#008689]/5">
          <tr>
            <th className="px-3 py-3">No.</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Affiliation</th>
            <th className="px-4 py-3 text-center">Status</th>
            {isChair && <th className="px-4 py-3 text-right">Action</th>}
          </tr>
        </thead>

        <tbody>
          {pcMembers.length === 0 && !showAddForm && (
            <tr>
              <td colSpan={6} className="py-10 text-center italic text-gray-500">
                No PC member has been added
              </td>
            </tr>
          )}

          {pcMembers.map((m, i) => (
            <tr key={m.email} className="border-t">
              <td className="px-3 py-3">{i + 1}</td>
              <td className="px-4 py-3 font-medium">{m.name}</td>
              <td className="px-4 py-3 text-gray-600">{m.email}</td>
              <td className="px-4 py-3">{m.affiliation}</td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                  ${
                    m.status === "ACTIVE"
                      ? "bg-[#008689]/15 text-[#008689]"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {m.status}
                </span>
              </td>

              {isChair && (
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    disabled={isClosed}
                    onClick={() => toggleStatus(m.email)}
                    className="p-2 rounded hover:bg-[#008689]/10"
                  >
                    <UserX size={16} />
                  </button>
                  <button
                    disabled={isClosed}
                    onClick={() => setConfirmRemove(m)}
                    className="p-2 rounded hover:bg-red-50 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              )}
            </tr>
          ))}

          {showAddForm && (
            <tr className="bg-[#008689]/5">
              <td />
              <td>
                <input
                  className="w-full border rounded px-2 py-1"
                  placeholder="Name"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  className="w-full border rounded px-2 py-1"
                  placeholder="Email"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  className="w-full border rounded px-2 py-1"
                  placeholder="Affiliation"
                  value={newMember.affiliation}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      affiliation: e.target.value,
                    })
                  }
                />
              </td>
              <td colSpan={2} className="text-right">
                <button
                  onClick={() => setConfirmAdd(true)}
                  className="bg-[#008689] text-white px-4 py-1 rounded"
                >
                  Add
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* CONFIRM MODALS */}
      {confirmAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <p className="mb-6">Are you sure you want to add this PC member?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmAdd(false)}>Cancel</button>
              <button
                onClick={handleAddAccept}
                className="bg-[#008689] text-white px-4 py-2 rounded"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmRemove && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <p className="mb-6">
              Remove <b>{confirmRemove.name}</b>?
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmRemove(null)}>Cancel</button>
              <button
                onClick={handleRemove}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   INVITE REVIEWER
========================================================= */
function InviteReviewer({ onBack }) {
  const [form, setForm] = useState({
    email: "",
    affiliation: "",
    message: "",
  });
  const [invites, setInvites] = useState([]);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);

  // ===== NEW STATES (FOR INVITE REVIEWER ONLY) =====
  const [confirmResend, setConfirmResend] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email cannot be empty";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Invalid email format";
    else if (invites.some((i) => i.email === form.email))
      e.email = "Email has already been invited";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleInvite = () => {
    if (!validate()) return;
    setSending(true);
    setTimeout(() => {
      setInvites([
        ...invites,
        {
          id: Date.now(),
          email: form.email,
          affiliation: form.affiliation,
          status: "PENDING",
        },
      ]);
      setForm({ email: "", affiliation: "", message: "" });
      setSending(false);
      setToast({ message: "Invitation sent successfully" });
      setTimeout(() => setToast(null), 3000);
    }, 800);
  };

  /* ================= RESEND ================= */
  const handleResend = () => {
    setToast({
      message: `Resent invitation to ${confirmResend.email}`,
    });
    setConfirmResend(null);
    setTimeout(() => setToast(null), 3000);
  };

  /* ================= DELETE ================= */
  const handleDelete = () => {
    setInvites(invites.filter((i) => i.id !== confirmDelete.id));
    setConfirmDelete(null);
    setToast({ message: "Invitation deleted" });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-[#008689]/20">
      {/* HEADER */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#008689] mb-6"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <h2 className="text-xl font-semibold text-[#008689] mb-6">
        Invite Reviewer
      </h2>

      {/* FORM */}
      <div className="max-w-3xl space-y-3">
        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Reviewer email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email}</p>
        )}

        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Affiliation"
          value={form.affiliation}
          onChange={(e) =>
            setForm({ ...form, affiliation: e.target.value })
          }
        />

        <textarea
          className="w-full border px-4 py-2 rounded"
          placeholder="Message"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <button
          onClick={handleInvite}
          disabled={sending}
          className="bg-[#008689] text-white px-6 py-2 rounded flex items-center gap-2 mt-2"
        >
          <Send size={16} />
          {sending ? "Sending..." : "Send Invitation"}
        </button>
      </div>

      {/* TABLE */}
      <div className="mt-10 overflow-x-auto">
        <table className="w-full table-fixed text-sm text-left">
          <thead className="bg-[#008689]/5">
            <tr>
              <th className="w-[60px] px-3 py-3">No.</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Affiliation</th>
              <th className="w-[120px] px-4 py-3 text-center">Status</th>
              <th className="w-[120px] px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {invites.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center italic text-gray-500"
                >
                  No reviewer has been invited
                </td>
              </tr>
            )}

            {invites.map((r, i) => (
              <tr key={r.id} className="border-t">
                <td className="px-3 py-3">{i + 1}</td>
                <td className="px-4 py-3 break-all">{r.email}</td>
                <td className="px-4 py-3">{r.affiliation || "-"}</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    {/* RESEND */}
                    <button
                      disabled={r.status !== "PENDING"}
                      onClick={() => setConfirmResend(r)}
                      className={`p-2 rounded ${
                        r.status !== "PENDING"
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-[#008689] hover:bg-gray-100"
                      }`}
                      title="Resend invitation"
                    >
                      <Send size={16} />
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => setConfirmDelete(r)}
                      className="p-2 rounded hover:bg-red-50 text-red-600"
                      title="Delete invitation"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CONFIRM RESEND */}
      {confirmResend && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h3 className="text-lg font-semibold text-[#008689] mb-3">
              Confirm Resend
            </h3>
            <p className="mb-6">
              Resend invitation to <b>{confirmResend.email}</b>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmResend(null)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleResend}
                className="px-4 py-2 rounded bg-[#008689] text-white"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h3 className="text-lg font-semibold text-red-600 mb-3">
              Confirm Delete
            </h3>
            <p className="mb-6">
              Delete invitation to <b>{confirmDelete.email}</b>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#008689] text-white px-4 py-2 rounded shadow-lg">
          {toast.message}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   REVIEWER STATUS MANAGEMENT
========================================================= */
function ReviewerStatusManagement({ onBack }) {
  const [filter, setFilter] = useState("ALL");
  const [reviewers, setReviewers] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered =
    filter === "ALL"
      ? reviewers
      : reviewers.filter((r) => r.status === filter);

  const handleDelete = () => {
    setReviewers(reviewers.filter((r) => r.id !== confirmDelete.id));
    setConfirmDelete(null);
    setToast({ message: "Reviewer deleted" });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-[#008689]/20">
      {/* HEADER */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#008689] mb-4"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <h2 className="text-xl font-semibold text-[#008689] mb-6">
        Reviewer Status Management
      </h2>

      {/* FILTER */}
      <div className="flex gap-3 mb-6">
        {["ALL", "ACCEPTED", "PENDING", "DECLINED"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === f
                ? "bg-[#008689] text-white"
                : "border text-[#008689] hover:bg-[#008689]/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-sm border-collapse">
          <thead className="bg-[#008689]/5">
            <tr>
              <th className="w-[60px] px-4 py-4 text-center">No.</th>
              <th className="px-20 py-4 text-left">Email</th>
              <th className="px-6 py-3 text-left">Affiliation</th>
              <th className="w-[140px] px-6 py-4 text-center">Status</th>
              <th className="w-[100px] px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-14 text-center italic text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}

            {filtered.map((r, i) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-4 text-center">{i + 1}</td>
                <td className="px-6 py-4 text-left break-all">{r.email}</td>
                <td className="px-6 py-4 text-center">{r.affiliation || "-"}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      r.status === "ACCEPTED"
                        ? "bg-green-100 text-green-700"
                        : r.status === "DECLINED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => setConfirmDelete(r)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                    title="Delete reviewer"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CONFIRM DELETE */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h3 className="text-lg font-semibold text-red-600 mb-3">
              Confirm Delete
            </h3>
            <p className="mb-6">
              Delete reviewer <b>{confirmDelete.email}</b>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#008689] text-white px-4 py-2 rounded shadow-lg">
          {toast.message}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   EXPORT PAGE (CONTROLLER)
========================================================= */
export default function ReviewerManagementPage() {
  const [view, setView] = useState("MAIN");

  return (
    <div className="space-y-10">
      {view === "MAIN" && (
        <PCMemberList onSelectAction={(v) => setView(v)} />
      )}
      {view === "INVITE" && (
        <InviteReviewer onBack={() => setView("MAIN")} />
      )}
      {view === "STATUS" && (
        <ReviewerStatusManagement onBack={() => setView("MAIN")} />
      )}
    </div>
  );
}
