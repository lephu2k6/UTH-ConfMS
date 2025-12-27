import { useState, useEffect } from "react";
import api from "../../lib/axios";

export default function useSubmission() {
  const [submission, setSubmission] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===== LOAD SUBMISSION + DEADLINE ===== */
  const loadSubmission = async () => {
    try {
      setLoading(true);
      const res = await api.get("/submissions/me");
      setSubmission(res.data.submission);
      setDeadline(res.data.deadline);
    } catch (err) {
      console.error("Load submission error", err);
    } finally {
      setLoading(false);
    }
  };

  /* ===== SAVE METADATA ===== */
  const saveMetadata = async (data) => {
    return api.post("/submissions", data);
  };

  /* ===== UPLOAD FILE ===== */
  const uploadFiles = async (formData) => {
    return api.post("/submissions/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  /* ===== SUBMIT / UPDATE ===== */
  const submitPaper = async () => {
    return api.post("/submissions/submit");
  };

  useEffect(() => {
    loadSubmission();
  }, []);

  return {
    submission,
    deadline,
    loading,
    saveMetadata,
    uploadFiles,
    submitPaper,
  };
}
