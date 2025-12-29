import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ReviewForm = () => {
  const { paperId } = useParams(); // lấy paperId từ URL
  const navigate = useNavigate();

  const [score, setScore] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");

      await axios.post(
        `http://localhost:8000/api/reviewer/review/${paperId}`,
        { score, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Submit review successfully!");
      navigate("/reviewer/assigned-papers");
    } catch (err) {
      console.error(err);
      setError("Submit review failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Review Paper
      </h2>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* SCORE */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Score (1 - 5)
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        {/* COMMENT */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        {/* BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white font-medium
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
