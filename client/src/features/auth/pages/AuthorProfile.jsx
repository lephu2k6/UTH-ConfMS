import { useState } from "react";
import { useAuthStore } from "../../../app/store/useAuthStore";

export default function AuthorProfile() {
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  if (!user) return <p>Vui lòng đăng nhập</p>;

  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleSave = () => {
    updateProfile({ fullName, avatar });
    setEditMode(false);
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 10px 25px rgba(0,0,0,.1)"
        }}
      >
        <h2 style={{ marginBottom: 20 }}>👤 Profile</h2> 

        {/* Avatar */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img
            src={
              avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.fullName
              )}`
            }
            alt="avatar"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
        </div>

        {!editMode ? (
          <>
            <p><b>Họ tên:</b> {user.fullName}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Role:</b> {user.role}</p>

            <button onClick={() => setEditMode(true)}>
              ✏️ Chỉnh sửa
            </button>
          </>
        ) : (
          <>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Họ tên"
              style={{ width: "100%", marginBottom: 10 }}
            />

            <input
              value={avatar || ""}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="Avatar URL"
              style={{ width: "100%", marginBottom: 10 }}
            />

            <button onClick={handleSave}>💾 Lưu</button>
            <button
              onClick={() => setEditMode(false)}
              style={{ marginLeft: 10 }}
            >
              ❌ Hủy
            </button>
          </>
        )}
      </div>
    </div>
  );
}
