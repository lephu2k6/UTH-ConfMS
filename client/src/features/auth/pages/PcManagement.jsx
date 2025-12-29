 import { useState } from "react";
import { Trash2, UserX, UserPlus } from "lucide-react";

export default function PCMemberList({
  currentUserRole = "CHAIR",
  conferenceStatus = "OPEN",
}) {
  const isChair = currentUserRole === "CHAIR";
  const isClosed = conferenceStatus === "CLOSED";

  /* ================= DATA (NO API YET) ================= */
  const [pcMembers, setPcMembers] = useState([]);

  const [confirmRemove, setConfirmRemove] = useState(null);

  /* ===== ADD PC MEMBER ===== */
  const [showAddForm, setShowAddForm] = useState(false);
  const [confirmAdd, setConfirmAdd] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    affiliation: "",
  });

  const handleAddAccept = () => {
    setPcMembers([
      ...pcMembers,
      {
        id: Date.now(),
        ...newMember,
        status: "ACTIVE",
      },
    ]);
    setConfirmAdd(false);
    setShowAddForm(false);
    setNewMember({ name: "", email: "", affiliation: "" });
  };

  const toggleStatus = (id) => {
    setPcMembers(
      pcMembers.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : m
      )
    );
  };

  const handleRemove = () => {
    setPcMembers(pcMembers.filter((m) => m.id !== confirmRemove.id));
    setConfirmRemove(null);
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-[#008689]/20">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#008689]">
          Program Committee Members
        </h2>

        {isChair && (
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
        )}
      </div>

      {/* TABLE */}
      <table className="w-full text-sm">
        <thead className="bg-[#008689]/5">
          <tr>
            <th className="px-3 py-3 text-left w-12">STT</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Affiliation</th>
            <th className="px-4 py-3 text-center">Status</th>
            {isChair && <th className="px-4 py-3 text-right">Action</th>}
          </tr>
        </thead>

        <tbody>
          {/* EMPTY STATE */}
          {pcMembers.length === 0 && !showAddForm && (
            <tr>
              <td
                colSpan={isChair ? 7 : 6}
                className="px-4 py-12 text-center text-gray-500 italic"
              >
                Chưa có PC member nào được thêm
              </td>
            </tr>
          )}

          {/* LIST */}
          {pcMembers.map((m, index) => (
            <tr
              key={m.id}
              className="border-t hover:bg-[#008689]/5 transition"
            >
              <td className="px-3 py-3">{index + 1}</td>
              <td className="px-3 py-3 text-gray-500">{m.id}</td>
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
                    onClick={() => toggleStatus(m.id)}
                    className="text-[#008689] hover:bg-[#008689]/10 p-2 rounded disabled:opacity-50"
                  >
                    <UserX size={16} />
                  </button>

                  <button
                    disabled={isClosed}
                    onClick={() => setConfirmRemove(m)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              )}
            </tr>
          ))}

          {/* ADD FORM */}
          {showAddForm && (
            <tr className="bg-[#008689]/5">
              <td colSpan={2} />
              <td className="px-4 py-3">
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Name"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
              </td>
              <td className="px-4 py-3">
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Email"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                />
              </td>
              <td className="px-4 py-3">
                <input
                  className="w-full border rounded px-3 py-2"
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
              <td colSpan={2} className="px-4 py-3 text-right">
                <button
                  onClick={() => setConfirmAdd(true)}
                  className="bg-[#008689] text-white px-4 py-2 rounded hover:bg-[#006f70]"
                >
                  Add
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* CONFIRM ADD */}
      {confirmAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h3 className="text-lg font-semibold text-[#008689] mb-2">
              Confirm Add
            </h3>
            <p className="mb-6">
              Bạn chắc chắn muốn thêm PC member này chứ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmAdd(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
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

      {/* CONFIRM REMOVE */}
      {confirmRemove && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h3 className="text-lg font-semibold text-[#008689] mb-4">
              Confirm Remove
            </h3>
            <p className="mb-6">
              Bạn có chắc muốn xóa <b>{confirmRemove.name}</b>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmRemove(null)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
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
