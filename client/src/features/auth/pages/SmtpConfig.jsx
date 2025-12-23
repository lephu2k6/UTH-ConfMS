import { useEffect, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import api from "../../../lib/axios";

export default function SmtpConfig() {
  const [form, setForm] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    fromEmail: "",
    enabled: false,
  });

  const [loading, setLoading] = useState(false);

  // Load SMTP config (nếu có backend)
  useEffect(() => {
    api.get("/smtp/config")
      .then((res) => {
        if (res.data) setForm(res.data);
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await api.post("/smtp/config", form);
      alert("✅ Lưu cấu hình SMTP thành công");
    } catch {
      alert("❌ Lỗi khi lưu cấu hình");
    } finally {
      setLoading(false);
    }
  };

  const handleTest = async () => {
    try {
      await api.post("/smtp/test");
      alert("📧 Gửi mail test thành công");
    } catch {
      alert("❌ Gửi mail thất bại");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">
        📧 SMTP Configuration
      </h2>

      <div className="space-y-4">
        <Input label="SMTP Host" name="host" value={form.host} onChange={handleChange} />
        <Input label="Port" name="port" value={form.port} onChange={handleChange} />
        <Input label="Username" name="username" value={form.username} onChange={handleChange} />
        <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
        <Input label="From Email" name="fromEmail" value={form.fromEmail} onChange={handleChange} />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="enabled"
            checked={form.enabled}
            onChange={handleChange}
          />
          Enable SMTP
        </label>
      </div>

      <div className="flex gap-3 mt-6">
        <Button onClick={handleSave} loading={loading}>
          💾 Lưu cấu hình
        </Button>

        <Button variant="secondary" onClick={handleTest}>
          ✉️ Test Email
        </Button>
      </div>
    </div>
  );
}
