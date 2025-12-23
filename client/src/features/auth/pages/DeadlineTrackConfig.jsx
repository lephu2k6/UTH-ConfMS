import { useEffect, useState } from "react";
import { Save, Plus, Trash, Calendar, Clock, AlertCircle, CheckCircle2 } from "lucide-react";

export default function DeadlineTrackConfig() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    submissionDeadline: "",
    reviewDeadline: "",
    cameraReadyDeadline: "",
    tracks: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTrack = () => {
    setForm({
      ...form,
      tracks: [...form.tracks, { id: Date.now(), name: "", description: "" }],
    });
  };

  const updateTrack = (id, field, value) => {
    const newTracks = form.tracks.map(track =>
      track.id === id ? { ...track, [field]: value } : track
    );
    setForm({ ...form, tracks: newTracks });
  };

  const removeTrack = (id) => {
    setForm({
      ...form,
      tracks: form.tracks.filter(track => track.id !== id),
    });
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(false);

    // Validation
    if (!form.submissionDeadline || !form.reviewDeadline || !form.cameraReadyDeadline) {
      setError("Vui lòng điền đầy đủ tất cả các deadline");
      return;
    }

    const emptyTracks = form.tracks.filter(t => !t.name.trim());
    if (emptyTracks.length > 0) {
      setError("Vui lòng điền tên cho tất cả các track hoặc xóa track trống");
      return;
    }

    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // await api.put("/api/deadlines", form);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Save lỗi:", err);
      setError("Có lỗi xảy ra khi lưu cấu hình");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Deadline & Track Configuration
          </h1>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <p className="text-red-800 font-medium">Lỗi</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <p className="text-green-800 font-medium">Thành công</p>
              <p className="text-green-700 text-sm">Cấu hình đã được lưu thành công!</p>
            </div>
          </div>
        )}

        {/* Deadlines Section */}
        <section className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Deadlines</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <DeadlineInput
              label="Submission Deadline"
              name="submissionDeadline"
              value={form.submissionDeadline}
              onChange={handleChange}
            />

            <DeadlineInput
              label="Review Deadline"
              name="reviewDeadline"
              value={form.reviewDeadline}
              onChange={handleChange}
            />

            <DeadlineInput
              label="Camera-ready Deadline"
              name="cameraReadyDeadline"
              value={form.cameraReadyDeadline}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Tracks Section */}
        <section className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Tracks</h2>
            <button
              onClick={addTrack}
              className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              <Plus size={18} /> Add Track
            </button>
          </div>

          {form.tracks.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500">Chưa có track nào</p>
            </div>
          )}

          <div className="space-y-3">
            {form.tracks.map((track, index) => (
              <div
                key={track.id}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-600 rounded flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <input
                      className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Track name"
                      value={track.name}
                      onChange={(e) => updateTrack(track.id, "name", e.target.value)}
                    />

                    <textarea
                      className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      placeholder="Description"
                      rows="2"
                      value={track.description}
                      onChange={(e) => updateTrack(track.id, "description", e.target.value)}
                    />
                  </div>

                  <button
                    onClick={() => removeTrack(track.id)}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Xóa track"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium shadow hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save size={18} />
            {saving ? "Đang lưu..." : "Lưu cấu hình"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Deadline Input Component */
function DeadlineInput({ label, name, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="datetime-local"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      />
    </div>
  );
}