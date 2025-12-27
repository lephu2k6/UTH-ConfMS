import { useState } from "react";
import useSubmission from "./useSubmission";

import SubmissionInfo from "./SubmissionInfo";
import SubmissionForm from "./SubmissionForm";
import FileUploadArea from "./FileUploadArea";


export default function PaperSubmissionPage() {
  const {
    deadline,
    submission,
    expired,
    loading,
    submitPaper,
    updatePaper,
  } = useSubmission(); // ✅ DESTRUCTURE

  const [form, setForm] = useState({
    title: submission?.title || "",
    abstract: submission?.abstract || "",
  });

  const [files, setFiles] = useState([]);

  const handleSubmit = async () => {
    const payload = { ...form, files };
    submission
      ? await updatePaper(payload)
      : await submitPaper(payload);
  };

  if (loading) {
    return <p className="text-center py-10">Đang tải...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">

      {/* ✅ CHỈ TRUYỀN PROPS CẦN */}
      <SubmissionInfo
        deadline={deadline}
        submission={submission}
      />

      <SubmissionForm
        data={form}
        setData={setForm}
        disabled={expired}
      />

      <FileUploadArea
        files={files}
        setFiles={setFiles}
        disabled={expired}
      />

      <button
        disabled={expired}
        onClick={handleSubmit}
        className={`px-6 py-3 rounded font-semibold text-white ${
          expired
            ? "bg-gray-400"
            : "bg-teal-600 hover:bg-teal-700"
        }`}
      >
        {submission ? "Cập nhật bài nộp" : "Nộp bài"}
      </button>
    </div>
  );
}
