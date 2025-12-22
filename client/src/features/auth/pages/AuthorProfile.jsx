import { useEffect, useState } from "react";
import { User, Mail, Shield, Edit2, Save, X } from "lucide-react";
import axios from "../../../lib/axios";

export default function AuthorProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [saving, setSaving] = useState(false);

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/profile");
        setUser(res.data);
        setFullName(res.data.fullName || "");
        setAvatar(res.data.avatar || "");
      } catch (err) {
        console.error("Lỗi load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Đang tải dữ liệu...</div>;
  }

  if (!user) {
    return <div className="p-6 text-center">Vui lòng đăng nhập</div>;
  }

  /* ================= SAVE PROFILE ================= */
  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await axios.put("/profile", {
        fullName,
        avatar,
      });
      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      console.error("Lỗi cập nhật profile:", err);
    } finally {
      setSaving(false);
    }
  };

  const avatarUrl =
    avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.fullName
    )}&background=0D9488&color=fff&size=200`;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
      <div className="text-center">
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-28 h-28 rounded-full mx-auto"
        />
        <h2 className="mt-4 text-xl font-bold">{user.fullName}</h2>
        <p className="text-teal-600">{user.role}</p>
      </div>

      <div className="mt-6 space-y-4">
        {!editMode ? (
          <>
            <Info icon={User} label="Họ tên" value={user.fullName} />
            <Info icon={Mail} label="Email" value={user.email} />
            <Info icon={Shield} label="Vai trò" value={user.role} />

            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-teal-600 text-white py-2 rounded"
            >
              <Edit2 size={16} /> Chỉnh sửa
            </button>
          </>
        ) : (
          <>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Họ tên"
            />
            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Avatar URL"
            />

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-green-600 text-white py-2 rounded"
              >
                <Save size={16} /> {saving ? "Đang lưu..." : "Lưu"}
              </button>

              <button
                onClick={() => {
                  setEditMode(false);
                  setFullName(user.fullName);
                  setAvatar(user.avatar || "");
                }}
                className="flex-1 bg-gray-200 py-2 rounded"
              >
                <X size={16} /> Hủy
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= INFO ITEM ================= */
function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-3 bg-gray-50 p-3 rounded">
      <Icon className="text-teal-600" size={18} />
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
