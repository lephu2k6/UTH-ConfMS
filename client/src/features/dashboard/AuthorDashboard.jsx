import { useEffect, useState, useMemo } from "react";
import axios from "../../lib/axios";
import { useAuthStore } from "../../app/store/useAuthStore";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthorDashboard() {
  const [myPapers, setMyPapers] = useState([]);
  const [allPapers, setAllPapers] = useState([]);
  const [conferences, setConferences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const [meRes, allRes, confRes] = await Promise.all([
        axios.get("/submissions/me"),
        axios.get("/submissions"),
        axios.get("/conferences"),
      ]);

      setMyPapers(meRes.data || []);
      setAllPapers(allRes.data || []);
      setConferences((confRes.data?.conferences || []).filter(c => c.is_open));
    } catch (err) {
      console.error("Failed to load dashboard data:", err?.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Scroll to section when URL hash changes (or initial load with hash)
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  const counts = useMemo(() => {
    const total = allPapers.filter(p => !p.is_withdrawn).length;
    const accepted = allPapers.filter(p => p.status === "Accepted").length;
    const rejected = allPapers.filter(p => p.status === "Rejected").length;
    const underReview = total - accepted - rejected;
    return { total, accepted, rejected, underReview };
  }, [allPapers]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-6">


        {/* Main */}
        <main className="col-span-12 lg:col-span-9">
          <div id="overview" className="bg-white rounded shadow p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">Overview submissions</h2>
                <p className="text-sm text-gray-500">General summary of all submissions across conferences.</p>
              </div>
              <div>
                <button onClick={fetchAll} className="px-4 py-2 bg-teal-500 text-white rounded">{isLoading ? 'Refreshing...' : 'Refresh'}</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 rounded p-4">
                <div className="text-sm text-gray-500">Total submissions</div>
                <div className="text-2xl font-bold">{counts.total}</div>
              </div>

              <div className="bg-gray-50 rounded p-4">
                <div className="text-sm text-gray-500">Accepted</div>
                <div className="text-xl font-semibold text-green-600">{counts.accepted}</div>
              </div>

              <div className="bg-gray-50 rounded p-4">
                <div className="text-sm text-gray-500">Under review</div>
                <div className="text-xl font-semibold text-yellow-600">{counts.underReview}</div>
              </div>

              <div className="bg-gray-50 rounded p-4">
                <div className="text-sm text-gray-500">Rejected</div>
                <div className="text-xl font-semibold text-red-600">{counts.rejected}</div>
              </div>
            </div>

            <div className="bg-white rounded shadow p-3">
              <h4 className="font-semibold mb-2">Open Conferences</h4>
              <ul className="text-sm space-y-2 text-gray-700">
                {conferences.length === 0 ? (
                  <li className="text-gray-500">No open conferences</li>
                ) : (
                  conferences.map((c) => (
                    <li key={c.id} className="flex items-center justify-between">
                      <span className="truncate">{c.name}</span>
                      <span className="text-xs text-gray-400">{new Date(c.start_date).getFullYear()}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded shadow p-4 mb-6">
            <h3 className="font-semibold mb-3">My Submissions</h3>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left border-b">Title</th>
                    <th className="px-4 py-2 text-left border-b">Status</th>
                    <th className="px-4 py-2 text-left border-b">Conference</th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="3" className="px-4 py-6 text-center text-gray-500">Loading...</td>
                    </tr>
                  ) : myPapers.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-4 py-6 text-center text-gray-500">You have not submitted any papers yet.</td>
                    </tr>
                  ) : (
                    myPapers.map((paper) => (
                      <tr key={paper.id} className="hover:bg-gray-50 transition cursor-pointer" onClick={() => navigate(`/submissions/${paper.id}`)}>
                        <td className="px-4 py-2 border-b">{paper.title}</td>
                        <td className="px-4 py-2 border-b">
                          <span className={`px-2 py-1 rounded text-sm font-medium
                            ${paper.status === "Accepted" ? "bg-green-100 text-green-700" : paper.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {paper.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 border-b">{paper.conference?.name || '—'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

