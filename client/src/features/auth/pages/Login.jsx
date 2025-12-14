import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // GIẢ LẬP LOGIN THÀNH CÔNG
    localStorage.setItem("accessToken", "fake-token");

    navigate("/");
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "100px auto",
        padding: 30,
        backgroundColor: "#ffffff",
        borderRadius: 8,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Login</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>Email</label>
          <input
            type="email"
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Password</label>
          <input
            type="password"
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
