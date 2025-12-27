import { useEffect, useState } from "react";
import api from "../../../lib/axios";
import { Plus, Trash, Link2 } from "lucide-react";

export default function TrackTopicManagement() {
  const [tracks, setTracks] = useState([]);
  const [topics, setTopics] = useState([]);
  const [trackName, setTrackName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [selectedTrackMap, setSelectedTrackMap] = useState({});

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    loadTracks();
    loadTopics();
  }, []);

  const loadTracks = async () => {
    try {
      const res = await api.get("/tracks");
      setTracks(res.data);
    } catch (err) {
      console.error("Load tracks error:", err);
    }
  };

  const loadTopics = async () => {
    try {
      const res = await api.get("/topics");
      setTopics(res.data);
    } catch (err) {
      console.error("Load topics error:", err);
    }
  };

  /* ================= TRACK ================= */
  const addTrack = async () => {
    if (!trackName.trim()) return;
    await api.post("/tracks", { name: trackName });
    setTrackName("");
    loadTracks();
  };

  const deleteTrack = async (id) => {
    await api.delete(`/tracks/${id}`);
    loadTracks();
    loadTopics();
  };

  /* ================= TOPIC ================= */
  const addTopic = async () => {
    if (!topicName.trim()) return;
    await api.post("/topics", { name: topicName });
    setTopicName("");
    loadTopics();
  };

  const deleteTopic = async (id) => {
    await api.delete(`/topics/${id}`);
    loadTopics();
  };

  const assignTopic = async (topicId) => {
    const trackId = selectedTrackMap[topicId];
    if (!trackId) return;

    await api.post(`/topics/${topicId}/assign-track`, { trackId });
    loadTopics();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">

      {/* ================= TRACK ================= */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Track Management</h2>

        <div className="flex gap-3 mb-4">
          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="New track name"
            value={trackName}
            onChange={(e) => setTrackName(e.target.value)}
          />

          <button
            type="button"
            onClick={addTrack}
            className="bg-teal-600 text-white px-4 rounded flex items-center gap-2"
          >
            <Plus size={16} /> Add
          </button>
        </div>

        {tracks.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center border px-4 py-2 rounded"
          >
            <span>{t.name}</span>

            <button
              type="button"
              onClick={() => deleteTrack(t.id)}
              className="text-red-600"
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
      </section>

      {/* ================= TOPIC ================= */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Topic Management</h2>

        <div className="flex gap-3 mb-4">
          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="New topic name"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          />

          <button
            type="button"
            onClick={addTopic}
            className="bg-blue-600 text-white px-4 rounded flex items-center gap-2"
          >
            <Plus size={16} /> Add
          </button>
        </div>

        {topics.map((topic) => (
          <div
            key={topic.id}
            className="grid grid-cols-12 gap-2 items-center border p-3 rounded"
          >
            <div className="col-span-4">{topic.name}</div>

            <div className="col-span-4 text-sm text-gray-600">
              {tracks.find((t) => t.id === topic.trackId)?.name || "No track"}
            </div>

            <div className="col-span-3">
              <select
                className="border px-2 py-1 rounded w-full"
                value={selectedTrackMap[topic.id] || ""}
                onChange={(e) =>
                  setSelectedTrackMap({
                    ...selectedTrackMap,
                    [topic.id]: e.target.value,
                  })
                }
              >
                <option value="">Assign track</option>
                {tracks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1 flex gap-2">
              <button
                type="button"
                onClick={() => assignTopic(topic.id)}
              >
                <Link2 size={16} />
              </button>

              <button
                type="button"
                onClick={() => deleteTopic(topic.id)}
              >
                <Trash size={16} className="text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
