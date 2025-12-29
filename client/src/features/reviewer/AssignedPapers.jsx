import { useEffect, useState } from "react";
import axios from "axios";

export default function AssignedPapers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignedPapers = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const res = await axios.get(
          "http://localhost:8000/api/reviewer/assigned-papers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPapers(res.data);
      } catch (err) {
        setError("Failed to load assigned papers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedPapers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading assigned papers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600 bg-red-100 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Assigned Papers
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Title</th>
              <th className="px-4 py-2 border text-left">Author</th>
              <th className="px-4 py-2 border text-left">Status</th>
              <th className="px-4 py-2 border text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {papers.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500"
                >
                  No assigned papers
                </td>
              </tr>
            ) : (
              papers.map((paper) => (
                <tr key={paper.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    {paper.title}
                  </td>

                  <td className="px-4 py-2 border">
                    {paper.author_name || "N/A"}
                  </td>

                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium
                        ${
                          paper.status === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : paper.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {paper.status}
                    </span>
                  </td>

                  <td className="px-4 py-2 border">
                    <button
                      className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() =>
                        alert(`Review paper ID: ${paper.id}`)
                      }
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
