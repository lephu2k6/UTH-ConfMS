import { useEffect, useState } from "react";
import axios from "../../lib/axios";

export default function AuthorResult() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get("/author/result")
      .then(res => setResult(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!result) {
    return <p className="p-6">Loading result...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Paper Result</h2>

      <div className="bg-white shadow rounded-lg p-4 space-y-3">
        <p><b>Title:</b> {result.title}</p>

        <p>
          <b>Status:</b>{" "}
          <span className={
            result.status === "Accepted"
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }>
            {result.status}
          </span>
        </p>

        <p><b>Decision:</b> {result.decision}</p>
        <p><b>Final Score:</b> {result.score ?? "N/A"}</p>
      </div>
    </div>
  );
}
