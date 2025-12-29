import { useEffect, useState } from "react";
import axios from "../../lib/axios";

export default function AuthorPapersTable() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/author/papers")
      .then((res) => {
        setPapers(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-4 text-gray-500">Loading papers...</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h3 className="text-lg font-semibold mb-4">My Papers</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Title</th>
              <th className="px-4 py-2 border text-left">Status</th>
              <th className="px-4 py-2 border text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {papers.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="px-4 py-4 text-center text-gray-500"
                >
                  No papers found
                </td>
              </tr>
            ) : (
              papers.map((paper) => (
                <tr key={paper.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{paper.title}</td>

                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium
                        ${
                          paper.status === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : paper.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {paper.status}
                    </span>
                  </td>

                  <td className="px-4 py-2 border text-center">
                    <button className="text-blue-600 hover:underline">
                      View
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
