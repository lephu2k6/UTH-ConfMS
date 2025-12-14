import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (form.password.length < 6) {
      setError("Mật khẩu phải ≥ 6 ký tự");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    // GIẢ LẬP REGISTER THÀNH CÔNG
    navigate("/login");
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "100px auto",
        padding: 30,
        background: "#fff",
        borderRadius: 8
      }}
    >
      <h2>Register</h2>

      {error && (
        <p style={{ color: "red", marginBottom: 10 }}>{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 20, padding: 8 }}
        />

        <button
          style={{
            width: "100%",
            padding: 10,
            background: "#16a34a",
            color: "#fff",
            border: "none"
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}
