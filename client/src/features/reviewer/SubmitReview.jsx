import { useNavigate, useParams } from "react-router-dom";
import axios from "../../lib/axios";

export default function SubmitReview() {
  const { paperId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post(`/reviewer/review/${paperId}`);
      alert("Submit review successfully");
      navigate("/reviewer/assigned-papers");
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Submit Review</h2>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Submit Review
      </button>
    </div>
  );
}
