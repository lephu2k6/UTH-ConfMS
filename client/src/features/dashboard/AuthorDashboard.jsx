import { useEffect, useState } from "react";
import axios from "../../lib/axios";

export default function AuthorDashboard() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    axios
      .get("/author/papers")
      .then((res) => setPapers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Papers</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b">Title</th>
              <th className="px-4 py-2 text-left border-b">Status</th>
            </tr>
          </thead>

          <tbody>
            {papers.length === 0 ? (
              <tr>
                <td
                  colSpan="2"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No papers found
                </td>
              </tr>
            ) : (
              papers.map((paper) => (
                <tr
                  key={paper.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 border-b">
                    {paper.title}
                  </td>
                  <td className="px-4 py-2 border-b">
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

