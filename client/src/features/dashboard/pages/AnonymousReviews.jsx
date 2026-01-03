import { useEffect, useState } from "react";
import axios from "../../../lib/axios";

export default function AnonymousReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("/author/reviews")
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Anonymous Reviews</h2>

      {reviews.length === 0 && (
        <p className="text-gray-500">No reviews yet</p>
      )}

      <div className="space-y-4">
        {reviews.map((r, idx) => (
          <div key={idx} className="border rounded-lg p-4 bg-gray-50">
            <p className="font-semibold">Score: {r.score}</p>
            <p className="text-gray-700 mt-2">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
