export default function AssignReviewerModal({
  paper,
  reviewers,
  onSelect,
  onClose,
}) {
  if (!paper) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[500px] space-y-4">
        <h3 className="font-semibold text-lg">
          Assign reviewer cho:
        </h3>

        <p className="font-medium">{paper.title}</p>

        <ul className="space-y-2 max-h-60 overflow-auto">
          {reviewers.map((r) => (
            <li
              key={r.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{r.name}</span>
              <button
                onClick={() => onSelect(r)}
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded"
              >
                Chọn
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="text-sm text-gray-500 underline"
        >
          Đóng
        </button>
      </div> 
    </div>
  );
}
