import { useState } from "react";
import useAssignment from "./useAssignment";
import AssignmentTable from "./AssignmentTable";
import AssignReviewerModal from "./AssignReviewerModal";
import { useAuthStore } from "../../app/store/useAuthStore";

export default function AssignmentPage() {
  const { user } = useAuthStore();
  const role = user?.role;

  const {
    papers,
    reviewers,
    loading,
    loadSuggestedReviewers,
    assignReviewer,
  } = useAssignment();

  const [selectedPaper, setSelectedPaper] = useState(null);

  /* ================= PERMISSION ================= */
  if (role !== "ADMIN" && role !== "CHAIR") {
    return (
      <p className="text-center py-10 text-red-600">
         Bạn không có quyền truy cập trang này
      </p>
    );
  }

  const handleOpenAssign = async (paper) => {
    setSelectedPaper(paper);
    await loadSuggestedReviewers(paper.id);
  };

  const handleAssign = async (reviewer) => {
    await assignReviewer({
      paperId: selectedPaper.id,
      reviewerId: reviewer.id,
    });
    setSelectedPaper(null);
  };

  if (loading) {
    return <p className="text-center py-10">Đang tải...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-xl font-semibold">
        Assignment – Assign Reviewer
      </h2>

      <AssignmentTable
        papers={papers}
        onAssign={handleOpenAssign}
      />

      <AssignReviewerModal
        paper={selectedPaper}
        reviewers={reviewers}
        onSelect={handleAssign}
        onClose={() => setSelectedPaper(null)}
      />
    </div>
  );
}
