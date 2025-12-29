import { useEffect, useState } from "react";
import api from "../../lib/axios";

export default function useAssignment() {
  const [papers, setPapers] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUnassignedPapers();
  }, []);

  const loadUnassignedPapers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/assignments/papers?assigned=false");
      setPapers(res.data);
    } catch (err) {
      console.error("Load papers error", err);
    } finally {
      setLoading(false);
    }
  };

  const loadSuggestedReviewers = async (paperId) => {
    const res = await api.get(`/assignments/${paperId}/suggest-reviewers`);
    setReviewers(res.data);
  };

  const assignReviewer = async ({ paperId, reviewerId }) => {
    await api.post("/assignments", { paperId, reviewerId });
    await loadUnassignedPapers();
  };

  return {
    papers,
    reviewers,
    loading,
    loadSuggestedReviewers,
    assignReviewer,
  };
}
